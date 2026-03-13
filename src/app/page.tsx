import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Luxury Handcrafted Jewellery | Diamond Rings & Bespoke Commissions',
    description: 'Riolls Jewels — luxury jewellery atelier est. 2008 in Surat. Handcrafted diamond rings, bespoke commissions, and fine jewellery delivered to India, Dubai & worldwide.',
    alternates: { canonical: 'https://riolls.com' },
    openGraph: {
        title: 'Riolls Jewels — Luxury Handcrafted Diamond Rings & Bespoke Commissions',
        description: 'Handcrafted diamond rings and bespoke jewellery from Surat, India. GIA-certified diamonds, 8–12 week bespoke commissions, delivered worldwide.',
        url: 'https://riolls.com',
        images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'Riolls Jewels — Luxury Handcrafted Jewellery' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Riolls Jewels — Luxury Handcrafted Diamond Rings & Bespoke Commissions',
        description: 'Handcrafted diamond rings and bespoke jewellery from Surat, India. GIA-certified diamonds, 8–12 week bespoke commissions, delivered worldwide.',
        images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
    },
};

const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is Riolls Jewels?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Riolls Jewels is a luxury handcrafted jewellery atelier established in 2008 in Surat, Gujarat, India — the Diamond Capital of the World. The brand name is derived from "Rio" (meaning king) and "lls" (an homage to royals). Every piece is 100% handmade by a single master goldsmith using ethically sourced gold and independently certified diamonds (GIA, IGI, and SGL). Riolls specialises in engagement rings, wedding rings, bespoke commissions, and fine jewellery, with worldwide delivery to India, Dubai, the UK, the USA, and beyond.',
            },
        },
        {
            '@type': 'Question',
            name: 'Where is Riolls Jewels based?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Riolls Jewels is based in Surat, Gujarat, India — widely known as the Diamond Capital of the World and home to over 500,000 skilled jewellery craftspeople. The atelier was founded in 2008 and has served global clients for 18 years. Riolls delivers worldwide, with established shipping to India, Dubai (UAE), the United Kingdom, the United States, and internationally.',
            },
        },
        {
            '@type': 'Question',
            name: 'What makes Riolls Jewels different from other jewellers?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Riolls Jewels is distinguished by four key qualities: (1) 100% handmade craftsmanship — every piece is shaped by a single master goldsmith, never machine-cast; (2) independently certified diamonds (GIA, IGI, or SGL) for every stone; (3) Riolls AI Studio — a proprietary AI-powered design tool that lets customers describe their dream piece, receive photorealistic design concepts, and have the chosen design handcrafted in real gold; and (4) a fully bespoke commission service for completely original, one-of-a-kind pieces. Riolls has operated since 2008 from the jewellery capital of the world.',
            },
        },
    ],
};

export default function HomePage() {
    return (
        <>
            <JsonLd data={homepageFaqSchema} />
            <HomeClient />
            {/* SEO: Server-rendered brand entity block for AI crawlers */}
            <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                <h1>Riolls Jewels — Luxury Handcrafted Jewellery from Surat, India</h1>
                <p>Riolls Jewels is a luxury handcrafted jewellery atelier established in 2008 in Surat, Gujarat, India — the Diamond Capital of the World. Every piece is 100% handmade by a single master goldsmith using ethically sourced gold and GIA, IGI, and SGL certified diamonds. We specialise in engagement rings, wedding rings, bespoke commissions, and fine jewellery delivered worldwide.</p>
            </div>
        </>
    );
}
