import { createClient } from 'npm:@supabase/supabase-js@2';

export type WorkspaceProfile = {
  id: string;
  workspace_id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'agent';
  active: boolean;
};

export function serviceClient() {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('Server Supabase service configuration is missing.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function userContext(req: Request) {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_PUBLISHABLE_KEY');
  const authorization = req.headers.get('Authorization');
  if (!url || !key) throw new Error('Supabase URL or anon/publishable key is missing from function runtime.');
  if (!authorization?.startsWith('Bearer ')) throw new Error('A valid Supabase sign-in is required.');
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authorization } },
  });
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError || !authData.user) throw new Error('Your Supabase session is invalid or expired.');
  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('id,workspace_id,full_name,email,role,active')
    .eq('id', authData.user.id)
    .maybeSingle();
  if (profileError) throw new Error(`Workspace profile could not be verified: ${profileError.message}`);
  if (!profile || !profile.active) throw new Error('Active workspace membership is required.');
  return { client, user: authData.user, profile: profile as WorkspaceProfile };
}

export async function adminContext(req: Request) {
  const context = await userContext(req);
  if (context.profile.role !== 'admin') throw new Error('Administrator access is required.');
  return context;
}
