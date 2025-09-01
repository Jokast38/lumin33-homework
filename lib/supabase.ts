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
  brand: string;
  logo?: string;
  price: number;
  oldPrice?: number;
  price_flash?: number | null;
  flash_ends_at?: string | null;
  images: Image[];
  rating?: number;
  reviews?: Review[];
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


export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'aw-ultra-2',
    slug: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    price: 899,
    oldPrice: 999,
    price_flash: 899,
    flash_ends_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    images: [
      'https://m.media-amazon.com/images/I/61HebwRVKVL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51MtHu5q4TL._AC_SL1000_.jpg',
    ],
    rating: 4.7,
    reviews: [
      { author: 'Léa', rating: 5, comment: 'Autonomie et GPS au top.' },
      { author: 'Max', rating: 4, comment: 'Très robuste, un peu chère.' },
      { author: 'Nina', rating: 5, comment: 'Parfaite pour le trail.' },
    ],
  options: { bandColor: ['noir', 'sable'] },
  },
  {
    id: 'aw-series-9',
    slug: 'apple-watch-series-9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    price: 499,
    oldPrice: 599,
    price_flash: 479,
    flash_ends_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    images: [
      'https://m.media-amazon.com/images/I/61rWIP5cTiL._AC_UL320_.jpg',
      'https://m.media-amazon.com/images/I/71R+4kswv5L._AC_SL1500_.jpg',
    ],
    rating: 4.6,
    reviews: [
      { author: 'Paul', rating: 5, comment: 'Super écran et santé.' },
      { author: 'Sophie', rating: 4, comment: 'Design élégant.' },
    ],
  options: { bandColor: ['rose', 'argent', 'noir'] },
  },
  {
    id: 'aw-se',
    slug: 'apple-watch-se',
    name: 'Apple Watch SE',
    brand: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    price: 299,
    oldPrice: 349,
    price_flash: null,
    flash_ends_at: null,
    images: [
      'https://m.media-amazon.com/images/I/71YdE55GwjL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61IYXIbHsSL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71C0FcngDTL._AC_SL1500_.jpg'
    ],
    rating: 4.5,
    reviews: [
      { author: 'Julie', rating: 5, comment: 'Excellent rapport qualité prix.' },
    ],
    options: { bandColor: ['bleu', 'argent', 'noir'] },
  },
  {
    id: 'aw-band-milanese',
    slug: 'apple-watch-band-milanese',
    name: 'Bracelet Milanais Apple Watch',
    brand: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    price: 99,
    oldPrice: 129,
    price_flash: 89,
    flash_ends_at: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    images: [
      'https://m.media-amazon.com/images/I/818W32LDJyL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/514CXZZP9BL._AC_.jpg'
    ],
    rating: 4.8,
    reviews: [
      { author: 'Lucas', rating: 5, comment: 'Très confortable.' },
    ],
      options: {
        bandColor: ['Argent', 'Noir', 'Bleu', 'Gris'],
        taille: ['42mm (Series 10/41/40/38mm)', '44mm (Series 3 2 1)']
      },
  },
  {
    id: 'aw-charger',
    slug: 'apple-watch-charger',
    name: 'Chargeur magnétique Apple Watch',
    brand: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    price: 39,
    oldPrice: 49,
    price_flash: null,
    flash_ends_at: null,
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MR2A2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1505844983702',
      'https://m.media-amazon.com/images/I/51Ocx3HOCQL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61iURPiXWjL._AC_SL1500_.jpg'
      
    ],
    rating: 4.9,
    reviews: [
      { author: 'Emma', rating: 5, comment: 'Indispensable et rapide.' },
    ],
    options: {},
  },
];

const MOCK_OFFERS: Offer[] = [
  { code: 'solo', title: 'Apple Watch Ultra 2', same_price: true, limited_time: false, gifts: [] },
  {
    code: 'bundle',
    title: 'Bundle Ultra 2 — 3 cadeaux offerts',
    same_price: true,
    limited_time: true,
    gifts: [
      { name: 'Dumbbells 5lbs', img: 'https://i.pinimg.com/1200x/21/26/84/212684bd65a8ae44ed529cb12535a66f.jpg' },
      { name: 'Yoga Mat', img: 'https://i.pinimg.com/1200x/8f/22/07/8f22077cdf063678bf9350e6a13ef427.jpg' },
      { name: 'Jump Rope', img: 'https://images-na.ssl-images-amazon.com/images/I/61hh8MLDiRL._AC_SY450_.jpg' },
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
    {
      kind: 'hero', payload: {
        title: 'Le luxe accessible à tous',
        subtitle: 'Icons last forever',
  img: (MOCK_PRODUCTS[0]?.images?.[0]) ?? '',
        cta: { label: 'Voir la Watch', href: '/fr/product' },
        colors: ['#e5e5e5', '#000', '#c2b280'],
        variants: [
          { label: 'Unique', price: 29.90, oldPrice: 69.90 },
          { label: 'Achetez 2', price: 49.90, oldPrice: 119.80, badge: '50% OFF' }
        ]
      }
    },
    { kind: 'grid', payload: { title: 'POUR LES SPORTIFS', products: MOCK_PRODUCTS.slice(0, 3), background:'https://i.pinimg.com/1200x/0f/e0/2b/0fe02b4cb7f1bbc24e96ea1cf5dbf7c9.jpg' } },
    { kind: 'grid', payload: { title: 'ACCESSOIRES', products: MOCK_PRODUCTS.slice(3), background:'https://i.pinimg.com/1200x/9b/13/8d/9b138dbe7dbc9c039dce3af56aaf6b82.jpg' } },
  ];
}

export async function getProductBySlug(_slug: string) {
  return MOCK_PRODUCTS.find(p => p.slug === _slug) ?? MOCK_PRODUCTS[0];
}
export async function getOffersByProduct(_productId: string) {
  return MOCK_OFFERS;
}
export async function getReviews(_productId: string) {
  return MOCK_REVIEWS;
}