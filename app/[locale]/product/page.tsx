import ProductPageClient from '@/components/product/ProductPage';
import { getOffersByProduct, getProductBySlug } from '@/lib/supabase';

export default async function Page() {
  const product = await getProductBySlug('apple-watch-ultra-2');
  const offers = await getOffersByProduct(product.id);

  return (
    <ProductPageClient
      name={product.name}
      price={product.price}
      images={product.images}
      flashEndsAt={product.flash_ends_at ?? undefined}
      offers={offers}
    />
  );
}