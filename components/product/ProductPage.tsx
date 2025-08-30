'use client';
import React, { useEffect, useMemo } from 'react';
import Timer from '@/components/timers';
import { useCart } from '@/components/cart/CartProvider';
import { trackPixel } from '@/lib/meta';
import ProductBundle from './ProductBundle';
import './ProductBundle.css';
import './ProductPage.css';

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
  const { addItem, items, removeItem } = useCart();

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

  // Carousel state
  const [activeImg, setActiveImg] = React.useState(0);

  return (
    <main className="section-general">
      {/* Partie gauche : images produit + timer */}
      <section className="flex flex-col items-center sticky top-0 h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-md p-4">
        <img
          src={images[activeImg]}
          alt={name}
          className="rounded-2xl border mb-4 object-cover w-[340px] h-[340px] transition-all duration-200"
        />
        {images.length > 1 && (
          <div className="option-image">
            {images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={name + ' ' + idx}
                style={{ width: '64px', height: '64px' , borderRadius: '0.5rem', borderColor: activeImg === idx ? 'black' : 'gray', borderWidth: activeImg === idx ? '2px' : '1px', borderStyle: 'solid' }}
                className={`rounded-lg border object-cover w-[64px] h-[64px] cursor-pointer transition-all duration-150 ${activeImg === idx ? 'border-black scale-105' : 'border-gray-300 opacity-80'}`}
                onClick={() => setActiveImg(idx)}
              />
            ))}
          </div>
        )}
        {flashEndsAt && (
          <div className="timer" style={{ marginTop: '1rem'}}>
            Offre limitée : <Timer endsAt={flashEndsAt} />
          </div>
        )}
      </section>

      {/* Partie droite : infos produit, options, notes, bundles */}
      <section className="section-option-produit">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl font-semibold">{price} €</span>
          {/* Notes */}
          <span className="text-yellow-500 font-bold text-lg">★ 4.7</span>
          <span className="text-gray-500 text-sm">(123 avis)</span>
        </div>
        {/* Options produit (exemple) */}
        <div className="option-product">
          <button className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200">Noir</button>
          <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200" style={{ background: '#8a7c4fff' }}>Sable</button>
        </div>
        {/* Description */}
        <div className="mb-4 text-gray-700">La montre ultime pour le sport et l’aventure. GPS, autonomie, robustesse.</div>

        {/* Bundles et offres */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Bundles & Offres</h2>
          {offers.map((o, idx) => (
            o.code === 'bundle'
              ? <ProductBundle key={o.code} offer={o as Extract<Offer, { code: 'bundle' }>} price={price} name={name} addItem={addItem} />
              : (
                <div className="product-offer" key={o.code + '-' + idx}>
                  <div className="flex items-center">
                    <img src={images[0]} alt={name} className="product-offer-img w-[60px] h-[60px] object-cover rounded-lg border mr-2" />
                    <div className="product-offer-info">
                      <div className="product-offer-title font-bold">{o.title}</div>
                      <div className="product-offer-desc text-sm text-gray-500">Ab Machine</div>
                    </div>
                  </div>
                  <div className="product-offer-actions mt-2 flex gap-2 items-center">
                    <span className="product-offer-price font-bold text-lg">{price} €</span>
                    <button
                      className="product-offer-btn px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                      onClick={() => {
                        const event_id = crypto.randomUUID();
                        addItem({ id: 'apple-watch-ultra-2', name, price, qty: 1 });
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
                      Ajouter
                    </button>
                  </div>
                </div>
              )
          ))}
        </div>

        {/* Panier actuel */}
        <div className="product-cart mt-6">
          <h3 className="font-semibold text-lg mb-2">Panier actuel :</h3>
          <ul className="product-cart-list">
            {items.map(i => (
              <li key={i.id} className="product-cart-item flex gap-2 items-center mb-2">
                <span className="font-semibold">{i.name}</span>
                <button className="product-cart-qty-btn px-2" onClick={() => addItem({ ...i, qty: 1 })}>+</button>
                <span>{i.qty}</span>
                <button className="product-cart-qty-btn px-2" onClick={() => addItem({ ...i, qty: -1 })} disabled={i.qty <= 1}>-</button>
                <span className="font-bold">{i.price} €</span>
                <button className="product-cart-remove px-2 text-red-600" onClick={() => removeItem(i.id)}>Retirer</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}