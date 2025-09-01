-- Table: products

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

-- Exemple d'insertion produit + options
INSERT INTO products (id, slug, name, price, price_flash, flash_ends_at, images, options) VALUES
  ('00000000-0000-0000-0000-000000000001', 'apple-watch-band-milanese', 'Bracelet Milanais Apple Watch', 16.99, 15.33, '2025-09-03T12:00:00+00:00', '["https://m.media-amazon.com/images/I/818W32LDJyL._AC_SL1500_.jpg","https://m.media-amazon.com/images/I/514CXZZP9BL._AC_.jpg"]', '{"couleur":["Argent","Noir","Bleu","Gris"],"taille":["42mm (Series 10/41/40/38mm)","44mm (Series 3 2 1)"]}');
