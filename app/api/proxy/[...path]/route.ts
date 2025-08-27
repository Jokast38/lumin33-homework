import { NextRequest } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { path?: string[] } }) {
  const path = (params.path ?? []).join('/');
  if (path === 'ping') return Response.json({ ok: true });
  return new Response('Not implemented', { status: 501 });
}