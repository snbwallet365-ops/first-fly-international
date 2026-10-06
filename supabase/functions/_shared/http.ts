export function corsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const localOrigins = [
    'http://localhost:4173', 'http://127.0.0.1:4173',
    'http://localhost:5173', 'http://127.0.0.1:5173',
  ];
  const rawAllowedOrigins = Deno.env.get('APP_ALLOWED_ORIGINS');
  const configured = rawAllowedOrigins === undefined
    ? localOrigins
    : rawAllowedOrigins.split(',').map((item) => item.trim()).filter(Boolean);
  // Do not allow `*`: authenticated workspace endpoints need an explicit origin allow-list.
  const allowed = Boolean(origin) && configured.includes(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'null',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export function preflight(req: Request) {
  if (req.method !== 'OPTIONS') return null;
  return new Response('ok', { status: 200, headers: corsHeaders(req) });
}

export function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unexpected server error.';
}

export function redirect(url: string, status = 302) {
  return new Response(null, { status, headers: { Location: url, 'Cache-Control': 'no-store' } });
}
