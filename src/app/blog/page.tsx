import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: 'The Journal — Jewellery Guides & Stories from the Atelier',
    description: 'Expert jewellery guides, craft essays, and inspiration from Riolls Jewels\' master goldsmiths and in-house editors. Stories from the atelier.',
    alternates: { canonical: 'https://riolls.com/blog' },
    openGraph: {
        title: 'The Journal — Riolls Jewels',
        description: 'Expert jewellery guides, craft essays, and inspiration from Riolls Jewels\' master goldsmiths and in-house editors.',
        url: 'https://riolls.com/blog',
        images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'The Journal — Riolls Jewels' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Journal — Riolls Jewels',
        description: 'Expert jewellery guides, craft essays, and inspiration from Riolls Jewels\' master goldsmiths and in-house editors.',
        images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
    },
};

export default function BlogPage() {
    return <BlogClient />;
}
