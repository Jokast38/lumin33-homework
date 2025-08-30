'use client';
import ProductCard from '@/components/product/ProductCard';
import '@/components/product/ProductCard.css';
import { useRouter } from 'next/navigation';

export default function ProductGrid({ products }: { products: any[] }) {
  const router = useRouter();
  const getProductLink = (p: any) => `/fr/product/${p.slug}`;
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          brand={p.brand}
          logo={p.logo}
          image={p.images?.[0]}
          rating={p.rating}
          reviewsCount={p.reviews?.length}
          price={p.price}
          oldPrice={p.oldPrice}
          badge={p.oldPrice ? `Jusqu'à -${Math.round(100-(p.price/p.oldPrice)*100)}%` : undefined}
          onClick={() => router.push(getProductLink(p))}
        />
      ))}
    </div>
  );
}