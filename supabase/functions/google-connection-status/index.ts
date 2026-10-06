import { adminContext, serviceClient } from '../_shared/auth.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { profile } = await adminContext(req);
    const service = serviceClient();
    const { data, error } = await service.from('google_connection_status')
      .select('google_email,scopes,expires_at,status,connected_at,updated_at')
      .eq('workspace_id', profile.workspace_id)
      .eq('provider', 'google_workspace')
      .maybeSingle();
    if (error) throw new Error(`Google status lookup failed: ${error.message}`);
    if (!data) return json(req, { status: 'not_connected' });
    return json(req, { ...data, status: data.status === 'connected' ? 'connected' : data.status });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 403);
  }
});
