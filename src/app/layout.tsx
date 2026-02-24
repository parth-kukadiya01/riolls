import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
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
      <body className="page-wrapper">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="page-content">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
