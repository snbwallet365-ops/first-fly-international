import { adminContext, serviceClient } from '../_shared/auth.ts';
import { errorMessage, json, preflight } from '../_shared/http.ts';

Deno.serve(async (req) => {
  const options = preflight(req);
  if (options) return options;
  if (req.method !== 'POST') return json(req, { error: 'Use POST.' }, 405);
  try {
    const { profile } = await adminContext(req);
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const fullName = typeof body?.full_name === 'string' ? body.full_name.trim().slice(0, 120) : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !fullName) return json(req, { error: 'Provide a valid email address and full name.' }, 400);
    const service = serviceClient();
    const redirectTo = Deno.env.get('INVITE_REDIRECT_URL') || Deno.env.get('APP_FRONTEND_URL');
    if (!redirectTo) return json(req, { error: 'INVITE_REDIRECT_URL must be configured.' }, 503);
    const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName, invited_by: profile.id },
      redirectTo,
    });
    if (error) return json(req, { error: error.message }, 400);
    return json(req, { invited: true, user_id: data.user?.id, email: data.user?.email || email });
  } catch (error) {
    return json(req, { error: errorMessage(error) }, 403);
  }
});
