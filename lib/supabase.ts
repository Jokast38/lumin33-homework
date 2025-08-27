// lib/supabase.ts

// ---------- Tracking (server-side) ----------
export type TrackingEvent = {
  event: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase';
  event_id: string;
  payload?: any;
};

export async function saveTrackingEvent(ev: TrackingEvent) {
  // TODO: remplace par un insert Supabase si nécessaire
  console.log('[saveTrackingEvent] mock insert', ev);
}

/**
 * Marque une commande comme payée (idempotent côté DB en vrai).
 * Ici mock: simple log.
 */
export async function markOrderPaid(orderId: string) {
  // TODO: remplace par un update Supabase si nécessaire (unique on order_id)
  console.log('[markOrderPaid] mock update', { orderId, status: 'paid' });
}

// ---------- DATA MOCKS POUR HOME / FICHE ----------
type Image = string;

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  price_flash?: number | null;
  flash_ends_at?: string | null;
  images: Image[];
  options?: Record<string, string[]>;
};

export type Offer = {
  code: 'solo' | 'bundle';
  title: string;
  same_price: boolean;
  limited_time: boolean;
  gifts: { name: string; img: string }[];
};

export type Review = { author: string; rating: number; comment: string };

const MOCK_PRODUCT: Product = {
  id: 'p1',
  slug: 'apple-watch-ultra-2',
  name: 'Apple Watch Ultra 2',
  price: 899,
  price_flash: 899,
  flash_ends_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
  images: [
    'https://via.placeholder.com/1200x800?text=AW+Ultra+2',
    'https://via.placeholder.com/1200x800?text=Detail1',
  ],
  options: { bandColor: ['noir', 'sable'] },
};

const MOCK_OFFERS: Offer[] = [
  { code: 'solo', title: 'Apple Watch Ultra 2', same_price: true, limited_time: false, gifts: [] },
  {
    code: 'bundle',
    title: 'Bundle Ultra 2 — 3 cadeaux offerts',
    same_price: true,
    limited_time: true,
    gifts: [
      { name: 'Dumbbells 5lbs', img: 'https://via.placeholder.com/100?text=Dumbbells' },
      { name: 'Yoga Mat', img: 'https://via.placeholder.com/100?text=Yoga+Mat' },
      { name: 'Jump Rope', img: 'https://via.placeholder.com/100?text=Jump+Rope' },
    ],
  },
];

const MOCK_REVIEWS: Review[] = [
  { author: 'Léa', rating: 5, comment: 'Autonomie et GPS au top.' },
  { author: 'Max', rating: 4, comment: 'Très robuste, un peu chère.' },
  { author: 'Nina', rating: 5, comment: 'Parfaite pour le trail.' },
];

// Home sections mock (goose style)
export async function getHomeSections() {
  return [
    { kind: 'strip', payload: { text: '⚡ Déstockage jusqu’à -70% | -30% sur le 2e' } },
    { kind: 'hero', payload: { title: 'Le luxe accessible à tous', subtitle: 'Icons last forever', img: MOCK_PRODUCT.images[0], cta: { label: 'Voir la Watch', href: '/fr/product' } } },
    { kind: 'grid', payload: { title: 'POUR ELLE', products: [MOCK_PRODUCT, { ...MOCK_PRODUCT, id: 'p2', slug: 'alt-1', name: 'Ball Star LTD', price: 105 }] } },
    { kind: 'grid', payload: { title: 'POUR LUI', products: [{ ...MOCK_PRODUCT, id: 'p3', slug: 'alt-2', name: 'Ball Star noir', price: 95 }] } },
  ];
}

export async function getProductBySlug(_slug: string) {
  return MOCK_PRODUCT;
}
export async function getOffersByProduct(_productId: string) {
  return MOCK_OFFERS;
}
export async function getReviews(_productId: string) {
  return MOCK_REVIEWS;
}