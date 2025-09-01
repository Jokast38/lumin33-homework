'use client';
import React, { useEffect, useMemo } from 'react';
import Timer from '@/components/timers';
import { useCart } from '@/components/cart/CartProvider';
import { trackPixel } from '@/lib/meta';
import ProductBundle from './ProductBundle';
import './ProductBundle.css';
import './ProductPage.css';

type Offer = {
  code: 'solo' | 'bundle';
  title: string;
  same_price: boolean;
  limited_time: boolean;
  gifts: { name: string; img: string }[];
};

export default function ProductPageClient({
  name,
  price,
  images,
  flashEndsAt,
  offers,
  options,
  description,
  rating,
  reviews
}: {
  name: string;
  price: number;
  images: string[];
  flashEndsAt?: string | null;
  offers: Offer[];
  options?: Record<string, string[]>;
  description?: string;
  rating?: number;
  reviews?: { author: string; rating: number; comment: string }[];
}) {
  const { addItem, items, removeItem } = useCart();
  const [activeImg, setActiveImg] = React.useState(0);
  const [showReviews, setShowReviews] = React.useState(false);

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
    <main className="product-detail-grid">
      <section className="product-detail-images">
        {flashEndsAt && (
          <div className="product-timer-banner">
            <span className="product-timer-label">Offre limitée :</span> <Timer endsAt={flashEndsAt} />
          </div>
        )}
        <img
          src={images[activeImg]}
          alt={name}
          className="rounded-2xl border mb-4 object-cover product-main-img"
        />
        {images.length > 1 && (
          <div className="option-image">
            {images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={name + ' ' + idx}
                style={{ width: '64px', height: '64px', borderRadius: '0.5rem', borderColor: activeImg === idx ? 'black' : 'gray', borderWidth: activeImg === idx ? '2px' : '1px', borderStyle: 'solid' }}
                className={`rounded-lg border object-cover w-[64px] h-[64px] cursor-pointer transition-all duration-150 ${activeImg === idx ? 'border-black scale-105' : 'border-gray-300 opacity-80'}`}
                onClick={() => setActiveImg(idx)}
              />
            ))}
          </div>
        )}
      </section>
      <section className="product-detail-info">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl font-semibold">{price} €</span>
          {/* Notes dynamiques */}
          {typeof rating === 'number' && (
            <span className="text-yellow-500 font-bold text-lg">★ {rating.toFixed(1)}</span>
          )}
          {Array.isArray(reviews) && (
            <span
              className="text-gray-500 text-sm cursor-pointer underline"
              onClick={() => setShowReviews((v) => !v)}
            >
              ({reviews.length} avis)
            </span>
          )}
          {/* Dropdown avis */}
          {showReviews && Array.isArray(reviews) && (
            <div className="product-reviews-dropdown mb-4">
              <h4 className="product-reviews-title">Avis du produit</h4>
              <ul className="product-reviews-list">
                {reviews.map((r, idx) => (
                  <li key={idx} className="product-reviews-item">
                    <div className="product-reviews-header">
                      <span className="product-card-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < r.rating ? 'star-filled' : 'star-empty'}>★</span>
                        ))}
                      </span>
                      <span className="product-reviews-author">{r.author}</span>
                    </div>
                    <div className="product-reviews-comment">{r.comment}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Options produit dynamiques */}
        <div className="option-product flex gap-2 mb-4">
          {options && Object.entries(options).map(([key, values]) => (
            <div key={key} className="option-category mb-2">
              <div className="font-semibold mb-1 text-gray-700 text-sm">
                {key === 'bandColor' ? 'Couleur' : key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
              <div className="flex gap-2 flex-wrap">
                {key === 'bandColor'
                  ? values.map((color, idx) => {
                    const colorMap: Record<string, string> = {
                      noir: '#222', black: '#222', blanc: '#fff', white: '#fff', gris: '#ccc', grey: '#ccc', argent: '#e5e5e5', sable: '#f5e9d5', bleu: '#3b82f6', rose: '#fbb6ce', jaune: '#facc15', gold: '#ffd700', rouge: '#ef4444', red: '#ef4444', vert: '#22c55e', green: '#22c55e',
                    };
                    const bg = colorMap[color.toLowerCase()] || color;
                    const textColor = ['blanc', 'white', 'argent', 'gris', 'grey', 'jaune', 'sable'].includes(color.toLowerCase()) ? '#222' : '#fff';
                    return (
                      <button
                        key={color}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:scale-105 transition"
                        style={{ background: bg, color: textColor, borderColor: '#ccc' }}
                      >
                        {color}
                      </button>
                    );
                  })
                  : values.map((val, idx) => (
                    <button
                      key={val}
                      className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
                    >
                      {val}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
        {/* Description dynamique */}

        <div className="mb-4 text-gray-700">
          {description || 'Produit premium, conçu pour le sport et l’aventure. GPS, autonomie, robustesse.'}
        </div>

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
                        addItem({ id: 'apple-watch-ultra-2', name, price, qty: 1, images });
                        trackPixel('AddToCart', { value: price, currency: 'EUR' }, event_id);
                        fetch('/api/meta/track', {
                          method: 'POST',
                          headers: { 'content-type': 'application/json' },
                          body: JSON.stringify({
                            event: 'AddToCart', event_id, value: price, currency: 'EUR',
                            contents: [{ id: 'apple-watch-ultra-2', quantity: 1, item_price: price, images }]
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
          <div className="product-cart-summary">
            <span className="product-cart-total font-bold text-xl">
              Total : {items.reduce((sum, i) => sum + i.price * i.qty, 0)} €
            </span>
            <span className="product-cart-count text-gray-700 ml-4">
              ({items.reduce((count, i) => count + i.qty, 0)} article{items.reduce((count, i) => count + i.qty, 0) > 1 ? 's' : ''})
            </span>
          </div>
        </div>

        {/* Infos service client en dropdowns */}
        <div className="product-service-dropdowns mt-8">
          <ServiceDropdown
            icon="🚚"
            title="Livraison Gratuite"
            content={<>
              Toutes les commandes bénéficient de la <b>livraison gratuite dans toute l’Europe.</b><br /><br />
              Le traitement prend 1 à 3 jours ouvrables, et la livraison s’effectue sous <b>6 à 8 jours ouvrables</b> selon votre pays.<br /><br />
              Un <b>numéro de suivi</b> vous sera envoyé dès l’expédition.
            </>}
          />
          <ServiceDropdown
            icon="↩️"
            title="Retour & Échange"
            content={<>
              Vous disposez de <b>14 jours</b> après réception pour demander un retour ou un échange.<br /><br />
              L’article doit être <b>neuf, non porté, non lavé</b>, et dans son <b>emballage d’origine</b>.<br /><br />
              Les frais de retour sont à la charge du client, sauf en cas d’erreur de notre part.
            </>}
          />
          <ServiceDropdown
            icon="🔒"
            title="Paiement Sécurisé"
            content={<>
              Toutes les transactions sur notre site sont <b>100 % sécurisées</b> grâce à un cryptage SSL.<br /><br />
              Vos informations bancaires ne sont <b>jamais enregistrées</b> et restent totalement confidentielles.<br /><br />
              Vous pouvez commander en toute confiance.
            </>}
          />
        </div>

      </section>
    </main>
  );
}

// Dropdown réutilisable pour infos service client
function ServiceDropdown({icon, title, content}: {icon: string, title: string, content: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="service-dropdown">
      <button className="service-dropdown-header" onClick={() => setOpen(o => !o)}>
        <span className="service-dropdown-icon" style={{ fontSize: 22 }}>{icon}</span>
        <span className="service-dropdown-title">{title}</span>
        <span className="service-dropdown-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="service-dropdown-content">{content}</div>}
    </div>
  );
}
