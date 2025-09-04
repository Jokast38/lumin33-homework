import ProductPageClient from '@/components/product/ProductPage';
import { getOffersByProduct, getProductBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Define the type for the params prop
type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();
  const offers = await getOffersByProduct(product.id);

  return (
    <ProductPageClient
      name={product.name}
      price={product.price}
      images={product.images}
      flashEndsAt={product.flash_ends_at ?? undefined}
      offers={offers}
      options={product.options}
      //   description={product.description}
      rating={product.rating}
      reviews={product.reviews}
    />
  );
}
