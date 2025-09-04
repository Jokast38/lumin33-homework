import { NextRequest } from 'next/server';

const PIXEL = process.env.META_PIXEL_ID ?? '';
const TOKEN = process.env.META_ACCESS_TOKEN ?? '';
const TEST_CODE = process.env.META_TEST_EVENT_CODE ?? '';

export async function POST(req: NextRequest) {
  if (!PIXEL || !TOKEN) {
    return new Response('Meta env missing', { status: 500 });
  }
  const body = await req.json().catch(() => ({}));
  console.log('Meta API - Body reçu:', JSON.stringify(body, null, 2));

  const payload = {
    data: [
      {
        event_name: body.event ?? 'CustomEvent',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id, // IMPORTANT pour dédup
        action_source: 'website',
        event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
        custom_data: {
          currency: body.currency ?? 'EUR',
          value: body.value ?? 0,
          contents: body.contents ?? [],
        },
        user_data: {
          // hash SHA-256 côté serveur (CAPI)
          em: body.email ? [await sha256(body.email.trim().toLowerCase())] : undefined,
          client_user_agent: req.headers.get('user-agent') ?? undefined,
          fbp: body.fbp,
          fbc: body.fbc,
        },
      },
    ],
    test_event_code: TEST_CODE || undefined,
  };

  const url = `https://graph.facebook.com/v20.0/${PIXEL}/events?access_token=${TOKEN}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  console.log('Meta API - Réponse Facebook:', text);
  return new Response(text, { status: res.status });
}

async function sha256(text: string) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}