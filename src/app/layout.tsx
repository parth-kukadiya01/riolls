import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: { default: 'Riolls Jewels', template: '%s — Riolls Jewels' },
  description: 'Luxury handcrafted jewellery from the Riolls Jewels atelier. Engagement rings, fine jewellery, and bespoke commissions.',
  keywords: ['luxury jewellery', 'engagement rings', 'diamond rings', 'bespoke jewellery', 'Riolls Jewels'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
