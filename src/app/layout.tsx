import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { AIStudioProvider } from '@/context/AIStudioContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { default: 'Riolls Jewels', template: '%s — Riolls Jewels' },
  description: 'Luxury handcrafted jewellery from the Riolls Jewels atelier. Engagement rings, fine jewellery, and bespoke commissions.',
  keywords: ['luxury jewellery', 'engagement rings', 'diamond rings', 'bespoke jewellery', 'handmade jewellery', 'custom jewellery', 'wedding rings', 'anniversary gifts', 'Riolls Jewels'],
  openGraph: {
    type: 'website',
    siteName: 'Riolls Jewels',
    title: 'Riolls Jewels — Luxury Handcrafted Jewellery',
    description: 'Luxury handcrafted jewellery from the Riolls Jewels atelier, est. 2008 in Surat. Engagement rings, wedding rings, bespoke commissions and fine jewellery.',
    url: 'https://riolls.com',
    images: [
      {
        url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        width: 1200,
        height: 630,
        alt: 'Riolls Jewels — Luxury Handcrafted Jewellery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riolls Jewels — Luxury Handcrafted Jewellery',
    description: 'Luxury handcrafted jewellery from the Riolls Jewels atelier, est. 2008 in Surat. Engagement rings, wedding rings, bespoke commissions.',
    images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://riolls.com/#organization',
      name: 'Riolls Jewels',
      alternateName: 'Riolls',
      url: 'https://riolls.com',
      foundingDate: '2008',
      foundingLocation: {
        '@type': 'Place',
        name: 'Surat, Gujarat, India',
      },
      description:
        'Riolls Jewels is a luxury handcrafted jewellery atelier established in 2008 in Surat, Gujarat, India. We create 100% handmade engagement rings, wedding rings, and bespoke fine jewellery using GIA, IGI, and SGL certified diamonds and ethically sourced gold.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://riolls.com/icon.png',
        width: 512,
        height: 512,
      },
      image: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
        url: 'https://riolls.com/contact',
      },
      sameAs: [
        'https://www.instagram.com/riollsjewels',
        'https://www.facebook.com/riollsjewels',
        'https://www.youtube.com/@riollsjewels',
        'https://in.pinterest.com/riollsjewels',
        'https://www.linkedin.com/company/riolls-jewels',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://riolls.com/#website',
      url: 'https://riolls.com',
      name: 'Riolls Jewels',
      description: 'Luxury handcrafted jewellery — engagement rings, bespoke commissions, and fine jewellery from Surat, India.',
      publisher: { '@id': 'https://riolls.com/#organization' },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://riolls.com/shop?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'JewelryStore',
      '@id': 'https://riolls.com/#store',
      name: 'Riolls Jewels',
      url: 'https://riolls.com',
      image: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
      description:
        'Luxury handcrafted jewellery atelier in Surat, India, established 2008. Specialising in diamond engagement rings, bespoke commissions, and fine gold jewellery. GIA, IGI, and SGL certified diamonds. Worldwide delivery.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.1702',
        longitude: '72.8311',
      },
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR, USD, GBP, AED',
      openingHours: 'Mo-Sa 10:00-19:00',
      hasMap: 'https://maps.google.com/?q=Surat,Gujarat,India',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      parentOrganization: { '@id': 'https://riolls.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="page-wrapper" suppressHydrationWarning>
        <JsonLd data={globalSchema} />
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
      </body>
    </html>
  );
}
