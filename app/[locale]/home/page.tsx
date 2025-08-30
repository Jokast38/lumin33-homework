import Link from 'next/link';
import { getHomeSections } from '@/lib/supabase';
import ProductGrid from '@/components/product/ProductGrid';

export default async function HomePage() {
  const sections = await getHomeSections();

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-10">
      {sections.map((s, i) => {
        if (s.kind === 'strip') {
          return <div key={i} className="text-center text-sm">{s.payload.text}</div>;
        }
        if (s.kind === 'hero') {
          return (
            <section key={i} className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">{s.payload.title}</h1>
                <p className="text-gray-500 mb-4">{s.payload.subtitle}</p>
                {s.payload.cta && (
                  <Link className="inline-block rounded-lg border px-4 py-2" href={s.payload.cta.href}>
                    {s.payload.cta.label}
                  </Link>
                )}
              </div>
              <img src={s.payload.img} alt="" className="rounded-2xl border" />
            </section>
          );
        }
        if (s.kind === 'grid') {
          return (
            <section key={i}>
              <h2 className="text-2xl font-semibold mb-4">{s.payload.title}</h2>
                <ProductGrid products={s.payload.products ?? []} />
            </section>
          );
        }
        return null;
      })}
    </main>
  );
}