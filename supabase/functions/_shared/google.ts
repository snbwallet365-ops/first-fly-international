import { decryptSecret, encryptSecret } from './crypto.ts';

export async function getWorkspaceGoogleAccessToken(service: any, workspaceId: string) {
  const { data: connection, error } = await service
    .from('google_connections')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('provider', 'google_workspace')
    .eq('status', 'connected')
    .maybeSingle();
  if (error) throw new Error(`Google connection could not be read: ${error.message}`);
  if (!connection) throw new Error('Google Workspace is not connected for this workspace.');
  const expires = connection.expires_at ? Date.parse(connection.expires_at) : 0;
  if (connection.access_token_ciphertext && connection.access_token_iv && expires > Date.now() + 60_000) {
    return { accessToken: await decryptSecret(connection.access_token_ciphertext, connection.access_token_iv), connection };
  }
  if (!connection.refresh_token_ciphertext || !connection.refresh_token_iv) {
    throw new Error('Google refresh token is unavailable. Disconnect and reconnect the Google account with offline access.');
  }
  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
  if (!clientId || !clientSecret) throw new Error('Google OAuth client credentials are not configured.');
  const refreshToken = await decryptSecret(connection.refresh_token_ciphertext, connection.refresh_token_iv);
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    await service.from('google_connections').update({ status: 'error', updated_at: new Date().toISOString() }).eq('id', connection.id);
    throw new Error(payload.error_description || payload.error || 'Google access token refresh failed. Reconnect the account.');
  }
  const access = await encryptSecret(payload.access_token);
  const update: Record<string, unknown> = {
    access_token_ciphertext: access.ciphertext,
    access_token_iv: access.iv,
    expires_at: new Date(Date.now() + Math.max(60, Number(payload.expires_in || 3600)) * 1000).toISOString(),
    status: 'connected',
    updated_at: new Date().toISOString(),
  };
  if (payload.refresh_token) {
    const refresh = await encryptSecret(payload.refresh_token);
    update.refresh_token_ciphertext = refresh.ciphertext;
    update.refresh_token_iv = refresh.iv;
  }
  const { error: updateError } = await service.from('google_connections').update(update).eq('id', connection.id);
  if (updateError) throw new Error(`Refreshed token could not be saved: ${updateError.message}`);
  return { accessToken: payload.access_token as string, connection: { ...connection, ...update } };
}

export async function googleApiFetch(accessToken: string, url: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`);
  return await fetch(url, { ...init, headers, signal: init.signal || AbortSignal.timeout(30_000) });
}
