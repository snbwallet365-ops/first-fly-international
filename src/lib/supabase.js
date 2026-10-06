import { createClient } from '@supabase/supabase-js';

// Capture the Auth link type before Supabase consumes and cleans the callback URL.
const authCallbackHash = typeof window !== 'undefined' ? new URLSearchParams(window.location.hash.replace(/^#/, '')) : new URLSearchParams();
const authCallbackQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
export const authLinkType = authCallbackHash.get('type') || authCallbackQuery.get('type') || null;

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
export const isSupabaseConfigured = Boolean(url && anonKey);
export const missingPublicConfig = [
  !url && 'VITE_SUPABASE_URL',
  !anonKey && 'VITE_SUPABASE_ANON_KEY'
].filter(Boolean);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'firstfly.auth.session'
      },
      realtime: { params: { eventsPerSecond: 8 } },
      global: { headers: { 'x-application-name': 'first-fly-international' } }
    })
  : null;

export async function invokeFunction(name, body = {}) {
  if (!supabase) throw new Error('Supabase configuration is missing.');
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    let message = error.message || 'The server function could not be reached.';
    try {
      const response = error.context;
      const detail = response && typeof response.json === 'function' ? await response.json() : null;
      if (detail?.error) message = detail.error;
    } catch { /* keep the SDK error */ }
    throw new Error(message);
  }
  return data;
}
