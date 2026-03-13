import type { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
    title: 'Shop Fine Jewellery',
    description: 'Browse Riolls Jewels\' handcrafted collection — diamond rings, gold necklaces, earrings and bracelets. GIA & IGI certified diamonds, ethically sourced gold, delivered worldwide.',
    alternates: { canonical: 'https://riolls.com/shop' },
    openGraph: {
        title: 'Shop Fine Jewellery — Riolls Jewels',
        description: 'Browse Riolls Jewels\' handcrafted collection — diamond rings, gold necklaces, earrings and bracelets. GIA & IGI certified diamonds, ethically sourced gold, delivered worldwide.',
        url: 'https://riolls.com/shop',
        images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'Riolls Jewels — Shop Fine Jewellery' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Shop Fine Jewellery — Riolls Jewels',
        description: 'Browse Riolls Jewels\' handcrafted collection — diamond rings, gold necklaces, earrings and bracelets.',
        images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
    },
};

export default function ShopPage() {
    return <ShopClient />;
}
