import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { AIStudioProvider } from '@/context/AIStudioContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
    <html lang="en" suppressHydrationWarning>
      <body className="page-wrapper" suppressHydrationWarning>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <AuthProvider>
            <CartProvider>
              <AIStudioProvider>
                <Navbar />
                <main className="page-content">{children}</main>
                <CartDrawer />
                <Footer />
              </AIStudioProvider>
            </CartProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
