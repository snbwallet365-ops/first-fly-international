import { adminContext, serviceClient } from '../_shared/auth.ts';
import { decryptSecret } from '../_shared/crypto.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { profile } = await adminContext(req);
    const service = serviceClient();
    const { data: connection, error } = await service.from('google_connections').select('id,refresh_token_ciphertext,refresh_token_iv')
      .eq('workspace_id', profile.workspace_id).eq('provider', 'google_workspace').maybeSingle();
    if (error) throw new Error(`Google connection could not be read: ${error.message}`);
    if (!connection) return json(req, { status: 'disconnected' });
    if (connection.refresh_token_ciphertext && connection.refresh_token_iv) {
      try {
        const refreshToken = await decryptSecret(connection.refresh_token_ciphertext, connection.refresh_token_iv);
        await fetch('https://oauth2.googleapis.com/revoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ token: refreshToken }),
          signal: AbortSignal.timeout(15_000),
        });
      } catch { /* local token deletion must still complete */ }
    }
    const { error: updateError } = await service.from('google_connections').update({
      status: 'disconnected',
      access_token_ciphertext: null,
      access_token_iv: null,
      refresh_token_ciphertext: null,
      refresh_token_iv: null,
      expires_at: null,
      updated_at: new Date().toISOString(),
    }).eq('id', connection.id);
    if (updateError) throw new Error(`Google tokens could not be removed: ${updateError.message}`);
    return json(req, { status: 'disconnected' });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 403);
  }
});
