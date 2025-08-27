# Take-Home Test — Mini-Template

👋 Bienvenue !  
Merci de cloner ce repo via **Use this template** et de travailler dans ton propre repo.

## Objectif
Construire un micro-parcours produit avec Next.js (front + back léger)...

## Quick start
1. `npm install`
2. `npm run dev`
3. Ouvre http://localhost:3000/fr/home

# Lumin33 – Mini‑Boutique (Home + Fiche Produit + Bundle + Tracking Meta)

> **Niveau visé** : fin 1ère année / début 2ème année d’école d’ingé (alternance cible). 4-5 jours de travail.
> **Stack imposée** : Next.js (App Router) + TypeScript + Supabase + Vercel (bonus), Tracking Meta (Pixel + CAPI), Proxy, Webhook HMAC, Cart rehydrate‑safe.

---

## 0) Contexte & objectif

Tu construis un **mini site e‑commerce** avec :

* Une **Home** dynamique (sections, bannières, listes produits) gérée en base.
* Une **Fiche Produit** premium pour **Apple Watch Ultra 2** (exemple) avec **bundle** :

  * **Offre 1** : Apple Watch Ultra 2 — prix X.
  * **Offre 2 (Limited time)** : *même prix* + **3 cadeaux** (ex: Dumbbells 5lbs, Yoga Mat, Jump Rope) + timer.
* Un **Panier** persistant, **rehydration‑safe**.
* Un **tracking** propre : **Pixel** (client) + **CAPI** (serveur) avec **dedup** via `event_id`.
* **Proxy** interne pour tous appels externes ; **Webhook HMAC** idempotent (mock paiement) ; **Cron** d’expiration promo.
* **Générateur de template (bonus)** : 2 thèmes style **MyGoose** et **Apple** sélectionnables par config.

Référence d’inspiration (à reproduire « esprit/structure », pas design 1:1) : *lien partagées* du site MyGoose. => https://mygoosefrance.fr

Lien exemple « bundle limited time + freebies » (à étudier) :

```
https://x.com/bambino_moon/status/1956638039687500066?s=46
```

Documentation Meta Business SDK / CAPI :

```
https://developers.facebook.com/docs/business-sdk/getting-started/
```

---

## 1) Contraintes techniques

* **Next.js App Router** + **TypeScript** obligatoire.
* Tout secret **server‑side** uniquement. Jamais dans le client.
* **Supabase** pour la data (tables ci‑dessous) + (optionnel) Storage pour images.
* **Proxy**: toutes requêtes externes passent par `/api/proxy/*`.
* **Tracking**:

  * Client (Pixel) émet `event_id`.
  * Serveur (`/api/meta/track`) relaie vers CAPI avec le **même `event_id`** + `external_id` hashé (email), `client_user_agent`, `fbc`/`fbp` si dispos ; dédup côté Meta.
* **Webhook** `/api/notify` signé **HMAC SHA‑256** (clé env), **idempotent** (unique index sur `order_id`).
* **Cart**: rehydrate‑safe (lecture `localStorage` post‑mount), jamais de flash SSR/CSR.
* **Vercel** (bonus) : déploiement + env vars.

### Env vars

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_URL=__remplir__
SUPABASE_ANON_KEY=__remplir__
HMAC_SECRET=dev_secret_change_me
META_PIXEL_ID=__remplir__
META_ACCESS_TOKEN=__remplir__      # token système ou test events
META_TEST_EVENT_CODE=__optionnel__  # pour Test Events
```

---

## 2) Features à livrer

### A) Home dynamique

Contenu piloté par la base (ou JSON en DB) :

* **Header**: logo, menu, icône panier avec **compteur**.
* **Hero**: grand visuel + titre + sous‑titre + CTA (configurable).
* **Bandeau promo** (ex: "Déstockage ...") géré en DB avec dates d’activation.
* **Grilles produits**: sections "Pour elle" / "Pour lui" (ou autre) alimentées par `products`.
* **Bloc éditorial** (texte + image) façon MyGoose.

> ⚠️ **Rien en dur** : titres, sous‑titres, images, liens, ordre des sections = **données**.

### B) Fiche produit **Apple Watch Ultra 2**

* **Carousel** images (pas de doublon, clavier accessible, focus)
* **Prix** + ancienne valeur si `price_flash` actif (timer).
* **Sélecteur d’options** (simple) — ex: couleur bracelet.
* **Bundle** :

  * **Offre 1**: produit seul (prix X)
  * **Offre 2**: *même prix* + **3 KDO** (affiche les 3 cadeaux avec mini‑vignettes), label **Limited time**.
  * **Explication psycho** (UI): pourquoi l’offre 2 est meilleure (badges, liste bénéfices).
* **Add to Cart** avec micro‑anim (GSAP ok) + dédoublonnage des quantités.
* **Trust** : moyenne étoiles + 3 avis (stockés en DB) + badges (paiement 4x, retours 30j, livraison).

### C) Panier

* Persistance `localStorage`, rehydrate‑safe.
* Drawer simple : liste items, qty +/‑, total, CTA "Passer en caisse".

### D) Tracking (Meta)

* **Client**: Pixel (script) + envoi d’events `ViewContent`, `AddToCart`, `InitiateCheckout`, `Purchase` avec un **`event_id` généré** (UUID).
* **Serveur**: `/api/meta/track` → relai **CAPI** (Graph API) avec le **même `event_id`** + champs requis (hashs). Utilise `META_PIXEL_ID` + `META_ACCESS_TOKEN`.
* **Dedup**: Meta conserve l’event unique si Pixel et CAPI ont le même `event_id`.

### E) Proxy

* `/api/proxy/ping` → `{ ok: true }` (démo) ; toute lib externe passe par là si nécessaire.

### F) Webhook (mock paiement)

* `/api/notify` vérifie `signature = HMAC_SHA256(amount + '+' + order_id, HMAC_SECRET)`.
* **Idempotent** : 2 appels même `order_id` ⇒ 200 unique.

### G) Cron simulateur

* Route/server action qui expire `price_flash` si `flash_ends_at < now()`.

### H) Générateur de **Template** (bonus)

* **But** : basculer le rendu **Home**/**Fiche** entre 2 thèmes via **config JSON** en DB :

  * `template = 'goose' | 'apple'`.
  * Exemples :

    * **goose**: hero plein écran photo lifestyle + sections "Pour elle/pour lui".
    * **apple**: hero produit sur fond blanc + gros titre typographique, grid spec/USP.
* **Implémentation** :

  * Table `site_settings(template text, ... )` et `home_sections(jsonb)`.
  * Rendu contrôlé par `template` + `home_sections`.
  * Paramètre d’URL `?tpl=goose|apple` (optionnel) pour tester.

---

## 3) Schéma Supabase (minimum)

```sql
-- products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price numeric(10,2) not null,
  price_flash numeric(10,2),
  flash_ends_at timestamptz,
  images jsonb default '[]'::jsonb,
  options jsonb,            -- ex: {"bandColor":["noir","sable"]}
  created_at timestamptz default now()
);

-- offers (pour le bundle)
create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  code text not null,             -- 'solo' | 'bundle'
  title text not null,
  same_price boolean default false,
  limited_time boolean default false,
  gifts jsonb default '[]'::jsonb -- ex: [{"name":"Dumbbells 5lbs","img":"..."}, ...]
);
create unique index if not exists offers_product_code_u on offers(product_id, code);

-- reviews (trust)
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  author text not null,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- tracking events (server‑side)
create table if not exists tracking_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  event_id text not null,
  payload jsonb,
  created_at timestamptz default now()
);
create index if not exists tracking_event_id_idx on tracking_events(event_id);

-- site settings & home sections (template engine)
create table if not exists site_settings (
  id int primary key default 1,
  template text not null default 'goose'
);
create table if not exists home_sections (
  id uuid primary key default gen_random_uuid(),
  sort int not null,
  kind text not null,         -- 'hero' | 'grid' | 'editorial' | 'strip'
  payload jsonb not null       -- structure libre selon kind
);
```

---

## 4) API Contracts

### `POST /api/track`

Body: `{ event: 'ViewContent'|'AddToCart'|'InitiateCheckout'|'Purchase', event_id: string, payload?: any }` → `{ ok: true }`

### `POST /api/meta/track`

Body minimal :

```json
{
  "event": "AddToCart",
  "event_id": "uuid-123",
  "email": "user@example.com",   // facultatif
  "contents": [{"id":"birk-1","quantity":1,"item_price":49.99}],
  "value": 49.99,
  "currency": "EUR"
}
```

Effet : relai vers Meta CAPI (Graph API) avec `pixel_id`, `access_token`, `test_event_code` (si fourni), `event_id` identique au Pixel (dedup).

### `GET /api/proxy/ping` → `{ ok: true }`

### `POST /api/notify` → vérifie HMAC, idempotent, `{ ok: true }`

### `POST /api/cron/expire` (ou server action) → expire `price_flash` passés

---

## 5) Données de départ (seed minimal)

Insère **Apple Watch Ultra 2** + 3 cadeaux pour le bundle.

```sql
insert into products (slug, name, price, images, options, price_flash, flash_ends_at)
values (
  'apple-watch-ultra-2',
  'Apple Watch Ultra 2',
  899.00,
  '["https://via.placeholder.com/1200x800?text=AW+Ultra+2","https://via.placeholder.com/1200x800?text=Detail1"]',
  '{"bandColor":["noir","sable"]}',
  899.00,
  now() + interval '2 days'
) returning id into :prod;

-- Offre 1: solo
insert into offers(product_id, code, title, same_price, limited_time, gifts)
values (:prod, 'solo', 'Apple Watch Ultra 2', true, false, '[]');

-- Offre 2: bundle (même prix + 3 cadeaux)
insert into offers(product_id, code, title, same_price, limited_time, gifts)
values (
  :prod, 'bundle', 'Bundle Ultra 2 — 3 cadeaux offerts', true, true,
  '[
    {"name":"Dumbbells 5lbs","img":"https://via.placeholder.com/100?text=Dumbbells"},
    {"name":"
```
## 6) Installation & Démarrage

### Prérequis
- Node.js 20+
- Compte Supabase (gratuit) avec tables créées (voir §3)
- (optionnel) Vercel CLI si déploiement

### Installation
```bash
git clone <repo-url>
cd lumin33-mini-boutique
npm install

Variables d’environnement

Crée un fichier .env.local à la racine :

NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=xxxxx
HMAC_SECRET=dev_secret_change_me
META_PIXEL_ID=xxxxxxx
META_ACCESS_TOKEN=xxxxxxx
META_TEST_EVENT_CODE=TEST123   pour tester tes event depuis meta linker a ton projet 

npm run dev

Build & start

npm run build
npm run start

7) Tests rapides ✅

Avant de livrer, vérifie :
	1.	Home
	•	http://localhost:3000/fr/home → home dynamique OK
	2.	Page produit
	•	http://localhost:3000/fr/product
	•	Vérifie 2 offres :
	•	Offre solo
	•	Offre bundle “Limited” (+3 cadeaux)
	•	Timer visible
	3.	Tracking Pixel + CAPI
	•	Ouvre Meta Test Events
	•	Clique “Ajouter au panier” → tu dois voir l’event
	•	Vérifie la deduplication (Pixel + CAPI même event_id)
	4.	Proxy API

  curl http://localhost:3000/api/proxy/ping
# → { "ok": true }
	5.	Cron expire flash
  curl -X POST http://localhost:3000/api/cron/expire
# → { "ok": true }

8) Livrables attendus 🎯
	•	Repo Git avec code Next.js + Supabase
	•	.env.example correctement rempli
	•	Mini site fonctionnel en local
	•	README complété (instructions + tests rapides)
	•	(bonus) Déploiement Vercel (gratuit pendant 14 jours)

---

## 9) Durée & rendu attendu

- ⏱ Durée estimée : 4 à 5 jours de travail.
- Merci de livrer :
  - Un repo GitHub (privé ou public) avec le code complet.
  - Un README clair (instructions + tests rapides).
  - (Bonus) Un déploiement Vercel accessible publiquement.

---

## 10) Évaluation

Les critères d’évaluation porteront sur :

- **Qualité du code** (TypeScript, architecture, propreté)
- **Respect des contraintes techniques** (rehydration, proxy, CAPI dedup, HMAC)
- **UX / UI** (Home, fiche produit, panier persistant)
- **Tracking Meta** (Pixel + CAPI avec deduplication)
- **Tests rapides** passés
- **Bonus** : déploiement Vercel, templates multiples

Barème indicatif (sur 20) :

- Code & architecture : 6 pts
- Contraintes techniques : 6 pts
- UX/UI & persistance : 4 pts
- Tracking & déduplication : 2 pts
- Bonus : 2 pts


---

## 11) Schéma visuel du parcours

Voici un schéma  illustrant le flux utilisateur et tracking du mini-parcours :

```
Home
  |
  v
Produit (Fiche)
  |
  v
Panier
  |
  v
Checkout
  |
  v
Webhook (paiement)
  |
  v
Tracking
   ├─> Pixel (client)
   └─> CAPI (serveur via /api/meta/track)
```

Résumé du parcours :

- L'utilisateur arrive sur **Home**, visite la **Fiche Produit**, ajoute au **Panier**, passe au **Checkout**.
- Après paiement (Webhook), les événements sont trackés à la fois côté **Pixel** (client) et via **CAPI** (serveur), avec un `event_id` partagé pour la déduplication.