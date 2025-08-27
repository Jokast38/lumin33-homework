'use client';

import Timer from '@/components/timers';
import { useEffect, useMemo } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { trackPixel } from '@/lib/meta';

type Offer = {
  code: 'solo'|'bundle';
  title: string;
  same_price: boolean;
  limited_time: boolean;
  gifts: { name: string; img: string }[];
};

export default function ProductPageClient({
  name, price, images, flashEndsAt, offers
}: {
  name: string;
  price: number;
  images: string[];
  flashEndsAt?: string | null;
  offers: Offer[];
}) {
  const { addItem, items } = useCart();

  useEffect(() => {
    const event_id = crypto.randomUUID();
    trackPixel('ViewContent', { value: price, currency: 'EUR' }, event_id);
    fetch('/api/meta/track', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'ViewContent', event_id, value: price, currency: 'EUR', contents: [{ id: 'apple-watch-ultra-2', quantity: 1, item_price: price }] })
    });
  }, [price]);

  const bundle = useMemo(() => offers.find(o => o.code === 'bundle'), [offers]);

  return (
    <main className="mx-auto max-w-5xl p-6 grid md:grid-cols-2 gap-8">
      <section>
        <img src={images[0]} alt={name} className="rounded-2xl border mb-2" />
        {/* TODO: carousel sans doublon */}
      </section>
      <section>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="text-2xl font-semibold mt-2">{price} €</div>
        {flashEndsAt && <div className="text-sm text-red-600 mt-1">Limited time: <Timer endsAt={flashEndsAt} /></div>}

        <div className="mt-6 grid gap-3">
          {offers.map(o => (
            <button
              key={o.code}
              className="rounded-xl border px-4 py-3 text-left hover:shadow"
              onClick={() => {
                const event_id = crypto.randomUUID();
                addItem({ id: 'apple-watch-ultra-2' + (o.code === 'bundle' ? '-bundle' : ''), name: `${name} ${o.code === 'bundle' ? '(Bundle)' : ''}`, price, qty: 1 });
                trackPixel('AddToCart', { value: price, currency: 'EUR' }, event_id);
                fetch('/api/meta/track', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({
                    event: 'AddToCart', event_id, value: price, currency: 'EUR',
                    contents: [{ id: 'apple-watch-ultra-2', quantity: 1, item_price: price }]
                  })
                });
              }}
            >
              <div className="font-semibold flex items-center gap-2">
                {o.title} {o.limited_time && <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">Limited</span>}
                {o.same_price && <span className="text-xs border px-2 py-0.5 rounded-full">Même prix</span>}
              </div>
              {o.gifts.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  {o.gifts.map(g => (
                    <span key={g.name} className="inline-flex items-center gap-1 text-xs border rounded-full px-2 py-0.5">
                      🎁 {g.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Panier actuel :</h3>
          <ul className="list-disc ml-6 text-sm">
            {items.map(i => <li key={i.id}>{i.name} x{i.qty} – {i.price} €</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}