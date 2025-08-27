//app/api/notify/route.ts
import { NextRequest } from 'next/server';
import { canonicalJoin, hmacSha256Hex } from '@/lib/hmac';
import { markOrderPaid } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { order_id, amount, signature } = await req.json().catch(() => ({} as any));

  if (!order_id) return new Response('order_id required', { status: 400 });

  const secret = process.env.HMAC_SECRET ?? '';
  const base = canonicalJoin([amount, order_id]);
  const expected = hmacSha256Hex(base, secret);

  if (String(signature) !== expected) {
    return new Response('invalid signature', { status: 401 });
  }

  // Idempotence côté DB (unique sur order_id) — mock ici
  await markOrderPaid(order_id);

  return Response.json({ ok: true });
}