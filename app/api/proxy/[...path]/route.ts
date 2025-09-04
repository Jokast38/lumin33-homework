import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/proxy\//, '');
  if (path === 'ping') return Response.json({ ok: true });
  return new Response('Not implemented', { status: 501 });
}