import { userContext } from '../_shared/auth.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { client, profile } = await userContext(req);
    if (profile.role !== 'admin') return json(req, { error: 'Administrator access is required.' }, 403);
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) return json(req, { error: 'GEMINI_API_KEY is not configured on Supabase.' }, 503);
    const body = await req.json().catch(() => null);
    const question = typeof body?.question === 'string' ? body.question.trim().slice(0, 1500) : '';
    if (!question) return json(req, { error: 'Write a question before sending.' }, 400);

    const [casesResult, approvalsResult, countriesResult, categoriesResult] = await Promise.all([
      client.from('applicants').select('id,reference,passport_expiry,stage,country_id,visa_category_id,created_at').eq('workspace_id', profile.workspace_id).is('archived_at', null).order('created_at', { ascending: false }).limit(200),
      client.from('approval_requests').select('applicant_id,status,requested_at,reviewed_at').eq('workspace_id', profile.workspace_id).order('requested_at', { ascending: false }).limit(200),
      client.from('countries').select('id,name,name_bn,official_url').eq('workspace_id', profile.workspace_id).eq('is_active', true).limit(100),
      client.from('visa_categories').select('id,name,name_bn').eq('workspace_id', profile.workspace_id).limit(100),
    ]);
    const queryError = casesResult.error || approvalsResult.error || countriesResult.error || categoriesResult.error;
    if (queryError) return json(req, { error: `Workspace case context could not be read: ${queryError.message}` }, 500);
    const countries = countriesResult.data || [];
    const categories = categoriesResult.data || [];
    const approvalByApplicant = new Map<string, string>();
    for (const approval of approvalsResult.data || []) {
      if (!approvalByApplicant.has(approval.applicant_id)) approvalByApplicant.set(approval.applicant_id, approval.status);
    }
    const context = (casesResult.data || []).map((item: any) => ({
      case_reference: item.reference,
      stage: item.stage,
      approval_status: approvalByApplicant.get(item.id) || 'not_submitted',
      passport_expiry: item.passport_expiry,
      destination: countries.find((country: any) => country.id === item.country_id)?.name_bn || countries.find((country: any) => country.id === item.country_id)?.name || 'not specified',
      visa_category: categories.find((category: any) => category.id === item.visa_category_id)?.name_bn || categories.find((category: any) => category.id === item.visa_category_id)?.name || 'not specified',
      created_at: item.created_at,
    }));
    const officialSources = countries.filter((country: any) => country.official_url).map((country: any) => ({
      title: country.name_bn || country.name,
      url: country.official_url,
    })).slice(0, 8);
    const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal: AbortSignal.timeout(45_000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are an internal visa operations assistant for an administrator. The only live case context is the JSON included in the user message. Do not claim to have searched the web or read other records. Do not reveal full passport numbers, phone numbers, email addresses, or invent applicant details; case references are acceptable. Clearly separate database facts from general guidance. Visa policy changes frequently: never state an unverified current rule, fee, or processing time as fact; instead direct staff to the matching official government source. Do not decide visa eligibility or promise an outcome. Answer in professional Bangla unless the user clearly asks otherwise. If context is insufficient, say so plainly.' }] },
        contents: [{ role: 'user', parts: [{ text: `Workspace case context (real database rows, personal names/contact/passport numbers deliberately omitted):\n${JSON.stringify(context)}\n\nAvailable official authority links (not a live web search):\n${JSON.stringify(officialSources)}\n\nAdmin question:\n${question}` }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1200 },
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return json(req, { error: result?.error?.message || `Gemini request failed (${response.status}).` }, 502);
    const answer = result?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('').trim();
    if (!answer) return json(req, { error: 'Gemini returned no assistant answer.' }, 502);
    return json(req, { answer: answer.slice(0, 8000), sources: officialSources, context_case_count: context.length });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 400);
  }
});
