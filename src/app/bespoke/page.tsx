import type { Metadata } from 'next';
import Link from 'next/link';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';
import ClientBespokeGallery from './ClientBespokeGallery';
import MaterialGuarantee from '@/components/ui/MaterialGuarantee';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Bespoke Jewellery — Custom Commissions by Riolls',
    description: 'Commission a one-of-a-kind bespoke jewellery piece with Riolls Jewels. From private consultation to masterful creation in 8–12 weeks. GIA-certified diamonds, handcrafted in Surat.',
    alternates: { canonical: 'https://riolls.com/bespoke' },
    openGraph: {
        title: 'Bespoke Jewellery — Custom Commissions by Riolls Jewels',
        description: 'Commission a one-of-a-kind piece with Riolls Jewels. Private consultation, hand-sketched design, 3D rendering, and 8–12 weeks of master crafting. GIA-certified diamonds.',
        url: 'https://riolls.com/bespoke',
        images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'Bespoke Jewellery Commissions — Riolls Jewels' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bespoke Jewellery — Custom Commissions by Riolls Jewels',
        description: 'Commission a one-of-a-kind piece. Private consultation, 3D rendering, 8–12 weeks of master crafting. GIA-certified diamonds, handcrafted in Surat.',
        images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
    },
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Commission Bespoke Jewellery at Riolls',
    description: 'A step-by-step guide to commissioning a one-of-a-kind bespoke jewellery piece at Riolls Jewels — from the first consultation through to handcrafted delivery in 8 to 12 weeks.',
    totalTime: 'PT2160H',
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'The Dialogue',
            text: 'Begin with a private, in-depth consultation — either at the Riolls atelier in Surat or via a virtual appointment. Share your vision, the occasion, your preferred materials, any reference images, and your investment range. This conversation is the foundation of your bespoke piece.',
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'The Vision',
            text: 'The Riolls design team produces hand-sketched designs and precision 3D renders based on your brief. You review the concepts, provide feedback, and the designs are refined until every detail perfectly reflects your vision — before a single gram of gold is touched.',
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'The Creation',
            text: 'Once you approve the final design, your piece is entrusted to a single dedicated master goldsmith at the Surat atelier. Over 8 to 12 weeks of unhurried, uncompromising handcrafting — metal fabrication, stone setting, engraving, polishing, and hallmarking — your bespoke commission is brought to life. The finished piece arrives with a certificate of authenticity and full insurance during delivery.',
        },
    ],
};

const bespokeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': 'https://riolls.com/bespoke#webpage',
            url: 'https://riolls.com/bespoke',
            name: 'Bespoke Jewellery — Custom Commissions by Riolls',
            description: 'Commission a one-of-a-kind bespoke jewellery piece with Riolls Jewels. Private consultation, hand-sketched design, 3D rendering, and 8–12 weeks of master crafting. GIA-certified diamonds, handcrafted in Surat.',
            breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
                    { '@type': 'ListItem', position: 2, name: 'Bespoke Jewellery', item: 'https://riolls.com/bespoke' },
                ],
            },
            provider: { '@id': 'https://riolls.com/#organization' },
        },
        {
            '@type': 'Service',
            '@id': 'https://riolls.com/bespoke#service',
            name: 'Bespoke Jewellery Commission',
            url: 'https://riolls.com/bespoke',
            description: 'A fully custom jewellery commission service. Riolls Jewels takes you through three stages — The Dialogue (private consultation), The Vision (sketching and 3D rendering), and The Creation (8–12 weeks of single-goldsmith handcrafting). Open to all categories: rings, necklaces, pendants, earrings, and bracelets.',
            provider: {
                '@type': 'JewelryStore',
                '@id': 'https://riolls.com/#store',
                name: 'Riolls Jewels',
                url: 'https://riolls.com',
            },
            serviceType: 'Bespoke Jewellery Design and Manufacturing',
            areaServed: ['India', 'United Arab Emirates', 'United Kingdom', 'United States', 'Worldwide'],
            offers: {
                '@type': 'Offer',
                description: 'Bespoke jewellery commissions starting from consultation. Price determined after design approval. 8–12 week production timeline.',
                availability: 'https://schema.org/InStock',
            },
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What is Riolls bespoke jewellery service?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Riolls bespoke jewellery service is a fully custom commission offering where clients co-create a one-of-a-kind piece with the Riolls team. The process has three stages: The Dialogue (a private in-person or virtual consultation to understand your vision), The Vision (hand-sketched designs and precision 3D renders refined until perfect), and The Creation (8 to 12 weeks of handcrafting by a single dedicated master goldsmith at the Surat atelier). The finished piece is hallmarked and accompanied by a certificate of authenticity.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How long does a bespoke commission take at Riolls?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Bespoke commissions at Riolls Jewels take 8 to 12 weeks from design approval to delivery. This timeline covers the complete handcrafting process — metal fabrication, stone setting, engraving, polishing, hallmarking, and final quality inspection — all performed by a single master goldsmith. Rush timelines may be discussed for less complex pieces.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What types of jewellery can be commissioned as bespoke at Riolls?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Riolls accepts bespoke commissions for all jewellery categories: engagement rings, wedding bands, necklaces and pendants, earrings, bracelets and bangles, and men\'s jewellery. Every commission uses ethically sourced gold (available in 9k, 14k, 18k, and 22k in yellow, white, and rose gold) and GIA, IGI, or SGL certified diamonds or gemstones of your choice.',
                    },
                },
            ],
        },
    ],
};

export default function BespokePage() {
    const steps = [
        { n: '01', title: 'The Dialogue', body: 'Commence your journey with a private, in-depth consultation—either at our exclusive atelier or via a discreet virtual appointment.' },
        { n: '02', title: 'The Vision', body: 'Through masterful sketching and precision 3D rendering, we meticulously refine the design until it flawlessly reflects your deepest desires.' },
        { n: '03', title: 'The Creation', body: 'Entrusted to a single master goldsmith, your piece is forged over 8 to 12 weeks of uncompromising dedication and unparalleled artistry.' },
    ];

    // We delegates gallery to a client component because we need useEffect
    // The rest of the page remains server-rendered (or default NextJS behavior)

    return (
        <>
            <JsonLd data={bespokeSchema} />
            <JsonLd data={howToSchema} />

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.heroBrow}>
                        <span className={styles.heroLine} />
                        <span className={styles.heroBrowText}>The Ultimate Expression</span>
                    </div>
                    <h1 className={styles.heroH1}>A masterpiece crafted<br />exclusively for you.</h1>
                    <p className={styles.heroBody}>Commission a timeless heirloom, intimately co-created with our master artisans and brought to life over 8–12 weeks of unhurried perfection.</p>
                    <Link href="/contact" className={styles.heroCta}>Request a Private Consultation</Link>
                </div>
            </section>

            {/* Process */}
            <section className={styles.process}>
                <div className={styles.sectionCenter}>
                    <span className={styles.eyebrow}>The Journey</span>
                    <h2 className={styles.sectionH2}>From inspiration to eternal legacy.</h2>
                </div>
                <div className={styles.stepsGrid}>
                    {steps.map(s => (
                        <div key={s.n} className={styles.step}>
                            <span className={styles.stepNum}>{s.n}</span>
                            <span className={styles.stepTitle}>{s.title}</span>
                            <p className={styles.stepBody}>{s.body}</p>
                        </div>
                    ))}
                </div>

                <div style={{ maxWidth: '1000px', margin: '40px auto 0' }}>
                    <MaterialGuarantee />
                </div>
            </section>

            {/* Gallery */}
            <section className={styles.gallery}>
                <div className={styles.sectionCenter} style={{ marginBottom: '0' }}>
                    <span className={styles.eyebrow} style={{ color: 'var(--gold)' }}>The Archives</span>
                    <h2 className={styles.sectionH2} style={{ color: '#686765ff' }}>A legacy of unique masterpieces.</h2>
                </div>
                <ClientBespokeGallery />
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2 className={styles.ctaH2}>Initiate your legacy.</h2>
                <p className={styles.ctaBody}>We serve discerning clientele globally. We invite you to a private, complimentary consultation to explore your vision, timeline, and investment.</p>
                <div className={styles.ctaRow}>
                    <Link href="/contact" className={styles.ctaBtnGold}>Request an Appointment</Link>
                    <a href="https://wa.me/message/CNVYZ7P7GP3SN1?text=Hello" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnGhost}>Inquire via WhatsApp</a>
                </div>
            </section>
        </>
    );
}
