import { adminContext, serviceClient } from '../_shared/auth.ts';
import { bytesToBase64, toBase64Url } from '../_shared/crypto.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';
import { getWorkspaceGoogleAccessToken, googleApiFetch } from '../_shared/google.ts';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const utf8 = new TextEncoder();

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { client, profile } = await adminContext(req);
    const body = await req.json().catch(() => null);
    const action = body?.action;
    if (!['docs_create', 'gmail_send', 'drive_upload'].includes(action)) return json(req, { error: 'Supported actions: docs_create, gmail_send, drive_upload.' }, 400);
    const service = serviceClient();
    const { accessToken } = await getWorkspaceGoogleAccessToken(service, profile.workspace_id);

    if (action === 'docs_create') {
      const title = typeof body?.title === 'string' ? body.title.trim().slice(0, 180) : '';
      const content = typeof body?.body === 'string' ? body.body.slice(0, 20_000) : '';
      if (!title || !content.trim()) return json(req, { error: 'A document title and non-empty body are required.' }, 400);
      const createdResponse = await googleApiFetch(accessToken, 'https://docs.googleapis.com/v1/documents', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }),
      });
      const created = await createdResponse.json().catch(() => ({}));
      if (!createdResponse.ok || !created.documentId) return json(req, { error: created?.error?.message || 'Google Docs document could not be created.' }, 502);
      const updateResponse = await googleApiFetch(accessToken, `https://docs.googleapis.com/v1/documents/${encodeURIComponent(created.documentId)}:batchUpdate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requests: [{ insertText: { location: { index: 1 }, text: content } }] }),
      });
      if (!updateResponse.ok) {
        await googleApiFetch(accessToken, `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(created.documentId)}`, { method: 'DELETE' }).catch(() => null);
        const detail = await updateResponse.json().catch(() => ({}));
        return json(req, { error: detail?.error?.message || 'Google Doc was created but content could not be inserted.' }, 502);
      }
      return json(req, { document_id: created.documentId, document_url: `https://docs.google.com/document/d/${created.documentId}/edit` });
    }

    if (action === 'gmail_send') {
      const to = typeof body?.to === 'string' ? body.to.trim() : '';
      const subject = typeof body?.subject === 'string' ? body.subject.trim().slice(0, 200) : '';
      const text = typeof body?.text === 'string' ? body.text.slice(0, 12_000) : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || /[\r\n]/.test(to) || !subject || /[\r\n]/.test(subject) || !text.trim()) {
        return json(req, { error: 'Provide a valid recipient, a single-line subject, and a message.' }, 400);
      }
      const encodedSubject = bytesToBase64(utf8.encode(subject));
      const encodedBody = bytesToBase64(utf8.encode(text));
      const mime = `To: ${to}\r\nSubject: =?UTF-8?B?${encodedSubject}?=\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset="UTF-8"\r\nContent-Transfer-Encoding: base64\r\n\r\n${encodedBody}`;
      const sendResponse = await googleApiFetch(accessToken, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ raw: toBase64Url(utf8.encode(mime)) }),
      });
      const sent = await sendResponse.json().catch(() => ({}));
      if (!sendResponse.ok || !sent.id) return json(req, { error: sent?.error?.message || 'Gmail could not send this message.' }, 502);
      return json(req, { message_id: sent.id, thread_id: sent.threadId });
    }

    const documentId = body?.document_id;
    if (typeof documentId !== 'string' || !UUID.test(documentId)) return json(req, { error: 'A valid document_id is required.' }, 400);
    const { data: document, error: documentError } = await client.from('applicant_documents')
      .select('id,workspace_id,applicant_id,storage_path,file_name,mime_type,byte_size')
      .eq('id', documentId).maybeSingle();
    if (documentError || !document || document.workspace_id !== profile.workspace_id) return json(req, { error: 'Document not found or access denied.' }, 404);
    const { data: applicant, error: applicantError } = await client.from('applicants')
      .select('id,consent_recorded_at,consent_recorded_by').eq('id', document.applicant_id).maybeSingle();
    if (applicantError || !applicant) return json(req, { error: 'Applicant access could not be verified.' }, 403);
    if (!applicant.consent_recorded_at || !applicant.consent_recorded_by) return json(req, { error: 'Recorded client consent is required before transferring a document to Google Drive.' }, 403);
    if (document.byte_size > 25 * 1024 * 1024) return json(req, { error: 'Google Drive transfer is limited to 25 MB per file.' }, 413);
    const { data: file, error: downloadError } = await client.storage.from('applicant-documents').download(document.storage_path);
    if (downloadError || !file) return json(req, { error: 'Private document could not be downloaded.' }, 400);
    const metadata = { name: document.file_name, mimeType: document.mime_type, description: `First Fly workspace document · ${document.id}` };
    const multipart = new FormData();
    multipart.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' }));
    multipart.append('file', new Blob([new Uint8Array(await file.arrayBuffer())], { type: document.mime_type || 'application/octet-stream' }), document.file_name);
    const driveResponse = await googleApiFetch(accessToken, 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink', { method: 'POST', body: multipart });
    const driveFile = await driveResponse.json().catch(() => ({}));
    if (!driveResponse.ok || !driveFile.id) return json(req, { error: driveFile?.error?.message || 'Google Drive upload failed.' }, 502);
    return json(req, { file_id: driveFile.id, file_name: driveFile.name, file_url: driveFile.webViewLink || `https://drive.google.com/file/d/${driveFile.id}/view` });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 403);
  }
});
