import { adminContext, serviceClient } from '../_shared/auth.ts';
import { encryptSecret, randomHex, sha256Hex, toBase64Url } from '../_shared/crypto.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';

const GOOGLE_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/gmail.send',
];

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { profile } = await adminContext(req);
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const redirectUri = Deno.env.get('GOOGLE_REDIRECT_URI');
    if (!clientId || !redirectUri) return json(req, { error: 'GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI must be configured.' }, 503);
    const state = randomHex(32);
    const verifier = toBase64Url(crypto.getRandomValues(new Uint8Array(48)));
    const challenge = toBase64Url(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
    const encryptedVerifier = await encryptSecret(verifier);
    const service = serviceClient();
    // State rows are one-use and short-lived; remove old rows opportunistically.
    await service.from('google_oauth_states').delete().lt('expires_at', new Date(Date.now() - 24 * 60 * 60_000).toISOString());
    const { error: insertError } = await service.from('google_oauth_states').insert({
      state_hash: await sha256Hex(state),
      workspace_id: profile.workspace_id,
      user_id: profile.id,
      code_verifier_ciphertext: encryptedVerifier.ciphertext,
      code_verifier_iv: encryptedVerifier.iv,
      expires_at: new Date(Date.now() + 10 * 60_000).toISOString(),
    });
    if (insertError) throw new Error(`OAuth state could not be stored: ${insertError.message}`);
    const authorization = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authorization.search = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: GOOGLE_SCOPES.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true',
      state,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    }).toString();
    return json(req, { authorization_url: authorization.toString() });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 403);
  }
});
