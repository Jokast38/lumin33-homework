import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';
import PixelBoot from '@/components/PixelBoot';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <PixelBoot />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}