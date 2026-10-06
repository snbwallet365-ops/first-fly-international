import { serviceClient } from '../_shared/auth.ts';
import { decryptSecret, encryptSecret, sha256Hex } from '../_shared/crypto.ts';
import { redirect } from '../_shared/http.ts';

function returnUrl(state: 'connected' | 'error') {
  const configured = Deno.env.get('APP_FRONTEND_URL');
  if (!configured) throw new Error('APP_FRONTEND_URL is not configured.');
  const url = new URL(configured);
  url.searchParams.set('google', state);
  return url.toString();
}

Deno.serve(async (req) => {
  if (req.method !== 'GET') return new Response('Use GET.', { status: 405 });
  const params = new URL(req.url).searchParams;
  const code = params.get('code');
  const state = params.get('state');
  if (params.get('error') || !code || !state || !/^[a-f0-9]{64}$/i.test(state)) return redirect(returnUrl('error'));
  try {
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const redirectUri = Deno.env.get('GOOGLE_REDIRECT_URI');
    if (!clientId || !clientSecret || !redirectUri) throw new Error('Google OAuth configuration is incomplete.');
    const service = serviceClient();
    const now = new Date().toISOString();
    const { data: flow, error: flowError } = await service.from('google_oauth_states')
      .update({ used_at: now })
      .eq('state_hash', await sha256Hex(state))
      .is('used_at', null)
      .gt('expires_at', now)
      .select('*')
      .maybeSingle();
    if (flowError || !flow) throw new Error('OAuth state is invalid, expired, or already used.');
    const verifier = await decryptSecret(flow.code_verifier_ciphertext, flow.code_verifier_iv);
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(30_000),
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code_verifier: verifier,
      }),
    });
    const tokens = await tokenResponse.json().catch(() => ({}));
    if (!tokenResponse.ok || !tokens.access_token) throw new Error(tokens.error_description || tokens.error || 'Google authorization code exchange failed.');
    const identityResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      signal: AbortSignal.timeout(15_000),
    });
    const identity = await identityResponse.json().catch(() => ({}));
    if (!identityResponse.ok || typeof identity.email !== 'string') throw new Error('Google account email could not be verified.');

    const { data: prior } = await service.from('google_connections').select('google_email,refresh_token_ciphertext,refresh_token_iv')
      .eq('workspace_id', flow.workspace_id).eq('provider', 'google_workspace').maybeSingle();
    const access = await encryptSecret(tokens.access_token);
    const sameGoogleAccount = prior?.google_email?.toLowerCase() === identity.email.toLowerCase();
    let refreshCiphertext = sameGoogleAccount ? prior?.refresh_token_ciphertext || null : null;
    let refreshIv = sameGoogleAccount ? prior?.refresh_token_iv || null : null;
    if (tokens.refresh_token) {
      const refresh = await encryptSecret(tokens.refresh_token);
      refreshCiphertext = refresh.ciphertext;
      refreshIv = refresh.iv;
    }
    if (!refreshCiphertext || !refreshIv) throw new Error('Google did not issue an offline refresh token. Revoke the app grant in Google Account and connect again.');
    const scopes = String(tokens.scope || '').split(' ').filter(Boolean);
    const { error: saveError } = await service.from('google_connections').upsert({
      workspace_id: flow.workspace_id,
      connected_by: flow.user_id,
      provider: 'google_workspace',
      google_email: identity.email.toLowerCase(),
      scopes,
      access_token_ciphertext: access.ciphertext,
      access_token_iv: access.iv,
      refresh_token_ciphertext: refreshCiphertext,
      refresh_token_iv: refreshIv,
      expires_at: new Date(Date.now() + Math.max(60, Number(tokens.expires_in || 3600)) * 1000).toISOString(),
      status: 'connected',
      connected_at: now,
      updated_at: now,
    }, { onConflict: 'workspace_id,provider' });
    if (saveError) throw new Error(`Google connection could not be saved: ${saveError.message}`);
    return redirect(returnUrl('connected'));
  } catch (error) {
    // OAuth provider errors can contain authorization metadata; keep logs content-free.
    console.error('Google OAuth callback failed.');
    return redirect(returnUrl('error'));
  }
});
