
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';
import PixelBoot from '@/components/PixelBoot';
import BannerScroller from '@/components/BannerScroller';
import Navbar from '@/components/Navbar';
import CartIcon from '@/components/cart/CartIcon';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <BannerScroller />
          <Navbar />
          <PixelBoot />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}