import Link from 'next/link';
import ProductSearch from '@/components/product/ProductSearch';
import { getHomeSections } from '@/lib/supabase';
import ProductGrid from '@/components/product/ProductGrid';
import './banner.css';

export default async function HomePage() {
  const sections = await getHomeSections();

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-10">
      {/* Banner vidéo Apple Watch Ultra 2 */}
      <section className="w-full mb-10 flex justify-center items-center">
        <div className="banner-wrapper">
          <video
            src="https://www.apple.com/105/media/us/watch/2024/f0b51c31-e8a5-44d7-b23d-51bd2858454a/anim/hero/xlarge.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="banner-video"
          />
        </div>
      </section>
      {sections.map((s, i) => {
        // if (s.kind === 'strip') {
        //   return <div key={i} className="text-center text-sm">{s.payload.text}</div>;
        // }
        // if (s.kind === 'hero') {
        //   return (
        //     <section key={i} className="grid md:grid-cols-2 gap-8 items-center">
        //       <div>
        //         <h1 className="text-4xl font-bold mb-2">{s.payload.title}</h1>
        //         <p className="text-gray-500 mb-4">{s.payload.subtitle}</p>
        //         {s.payload.cta && (
        //           <Link className="inline-block rounded-lg border px-4 py-2" href={s.payload.cta.href}>
        //             {s.payload.cta.label}
        //           </Link>
        //         )}
        //       </div>
        //       <img src={s.payload.img} alt="" className="rounded-2xl border" />
        //     </section>
        //   );
        // }
        if (s.kind === 'grid') {
          return (
            <section key={i}>
              {s.payload.background ? (
                <div
                  className="product-grid-banner relative flex items-center justify-center mb-4"
                  style={{
                    margin: '5%',
                    backgroundImage: `url(${s.payload.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '180px',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                  }}
                >
                  <div className="banner-overlay" />
                  <div className="banner-title-wrapper">
                    <h2 className="banner-title">{s.payload.title}</h2>
                  </div>
                </div>
              ) : (
                <h2 className="title">{s.payload.title}</h2>
              )}
              <ProductGrid products={s.payload.products ?? []} />
            </section>
          );
        }
        return null;
      })}
    </main>
  );
}