import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'About Riolls Jewels — Heritage, Craftsmanship & Our Story',
    description: 'Founded in 2008 in Surat, India, Riolls Jewels creates 100% handcrafted luxury jewellery using ethically sourced gold and GIA-certified diamonds. Discover our story.',
    alternates: { canonical: 'https://riolls.com/about' },
};

// Admin can easily swap these image URLs later from a CMS or local public folder
const ABOUT_IMAGES = {
    hero: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1773388587/1_o0oowq.png",
    craft: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1773388686/In_Mexico_a_Family_Focused_on_Twists_of_Silver_Filigree_esztyn.jpg",
    gold: "https://res.cloudinary.com/dl6cdbdzl/image/upload/v1773388694/Jaubalet_Paris_Joaillerie_lwtgkn.jpg"
};

const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'AboutPage',
            '@id': 'https://riolls.com/about#webpage',
            url: 'https://riolls.com/about',
            name: 'About Riolls Jewels — Heritage, Craftsmanship & Our Story',
            description: 'Founded in 2008 in Surat, India, Riolls Jewels creates 100% handcrafted luxury jewellery using ethically sourced gold and GIA-certified diamonds. Learn about the brand\'s heritage, craftsmanship philosophy, and commitment to ethical sourcing.',
            breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
                    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://riolls.com/about' },
                ],
            },
            about: { '@id': 'https://riolls.com/#organization' },
            mainEntity: { '@id': 'https://riolls.com/#organization' },
        },
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
                description: 'Diamond Capital of the World',
            },
            description: 'Riolls Jewels is a luxury handcrafted jewellery atelier established in 2008 in Surat, Gujarat, India — the Diamond Capital of the World. The brand specialises in 100% handmade fine jewellery, including engagement rings, wedding rings, and bespoke commissions, using GIA, IGI, and SGL certified conflict-free diamonds and ethically sourced gold. Every piece is shaped entirely by a single master goldsmith and is never machine-cast. Riolls delivers worldwide to India, Dubai, the UK, the USA, and beyond, with full insurance and a certificate of authenticity on every piece.',
            logo: {
                '@type': 'ImageObject',
                url: 'https://riolls.com/icon.png',
                width: 512,
                height: 512,
            },
            image: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
            sameAs: [
                'https://www.instagram.com/riollsjewels',
            ],
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Surat',
                addressRegion: 'Gujarat',
                addressCountry: 'IN',
            },
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['English', 'Hindi', 'Gujarati'],
                url: 'https://riolls.com/contact',
            },
            knowsAbout: [
                'Handcrafted jewellery',
                'Diamond engagement rings',
                'Bespoke jewellery commissions',
                'GIA diamond certification',
                'Fine goldsmithing',
                'Ethical diamond sourcing',
                'Surat jewellery tradition',
            ],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Riolls Jewellery Collections',
                itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Engagement Rings', url: 'https://riolls.com/engagement-rings' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Wedding Rings', url: 'https://riolls.com/wedding-rings' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke Commissions', url: 'https://riolls.com/bespoke' } },
                    { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'AI Jewellery Studio', url: 'https://riolls.com/ai-studio' } },
                ],
            },
        },
    ],
};

export default function AboutPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <JsonLd data={aboutSchema} />
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Our Story</span>
                    <h1 className={styles.heroH1}>About Riolls</h1>
                </div>
            </section>

            {/* Main Hero Image */}
            <section className={styles.imageSection}>
                <div className={styles.fullImageWrapper}>
                    <Image
                        src={ABOUT_IMAGES.hero}
                        alt="About Riolls"
                        fill
                        className={styles.fullImage}
                        unoptimized
                    />
                </div>
            </section>

            {/* ── Content ── */}
            <section className={styles.content}>

                {/* GEO: Key Facts block — AI-extractable structured facts */}
                <div className={styles.textBlockCenter} style={{ marginBottom: '0' }}>
                    <h2 className={styles.sectionTitle}>Riolls Jewels — Key Facts</h2>
                    <p className={styles.text} style={{ marginBottom: '1.5rem' }}>
                        Riolls Jewels is a luxury handcrafted jewellery atelier based in Surat, Gujarat, India — the Diamond Capital of the World. Since our founding in 2008, we have specialised in 100% handmade fine jewellery, including engagement rings, wedding rings, bespoke commissions, and fine gold pieces, serving discerning clients across India, Dubai, the United Kingdom, the United States, and worldwide.
                    </p>
                    <ul className={styles.list} style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        <li><strong>Founded:</strong> 2008 — 18 years of uncompromising craftsmanship</li>
                        <li><strong>Location:</strong> Surat, Gujarat, India (Diamond Capital of the World)</li>
                        <li><strong>Speciality:</strong> 100% handcrafted fine jewellery — every piece shaped by a single master goldsmith, never machine-cast</li>
                        <li><strong>Diamond Certifications:</strong> GIA (Gemological Institute of America), IGI (International Gemological Institute), SGL (Solitaire Gemological Laboratories)</li>
                        <li><strong>Gold Purity:</strong> 9k, 14k, 18k, and 22k gold in yellow, white, and rose gold</li>
                        <li><strong>Bespoke Lead Time:</strong> 8 to 12 weeks from consultation to delivery</li>
                        <li><strong>Delivery:</strong> Worldwide — fully insured and tracked, including to India, Dubai, UK, USA, and beyond</li>
                        <li><strong>Hallmarking:</strong> All pieces hallmarked and accompanied by a certificate of authenticity</li>
                        <li><strong>Ethical Sourcing:</strong> Conflict-free diamonds and responsibly sourced gold from certified mines</li>
                    </ul>
                </div>

                {/* Intro */}
                <div className={styles.textBlockCenter}>
                    <h2 className={styles.sectionTitle}>A Regal Heritage</h2>
                    <p className={styles.textLead}>
                        Our name, Riolls, is inspired by words that evoke majesty: Rio (meaning king) and lls (an homage to royals). This name carries our brand's spirit—regal elegance woven into every design.
                    </p>
                    <p className={styles.text}>
                        Since 2008, Riolls has been dedicated to crafting jewelry that feels both timeless and intimate, a reflection of personal greatness in everyday moments. We believe every person has a sovereign shine, and our pieces are created to honor that inner royalty.
                    </p>
                </div>

                {/* 50/50 Split 1 */}
                <div className={styles.splitBlock}>
                    <div className={styles.splitText}>
                        <h2 className={styles.sectionTitle}>Our Journey and Vision</h2>
                        <p className={styles.text}>
                            Founded in 2008, Riolls was born from a desire to blend tradition with modern life. Our founder envisioned a brand where age-old techniques meet contemporary style, making luxury wearable every day. Eighteen years later, we remain true to that vision.
                        </p>
                        <p className={styles.text}>
                            We cherish our roots in classic craftsmanship while embracing the dreams of a vibrant community. Each year of experience deepens our commitment to quality, authenticity, and heartfelt service.
                        </p>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Handcrafted Excellence</h2>
                        <p className={styles.text}>
                            Every piece at Riolls is 100% handmade by dedicated artisans who pour their devotion into each creation. Our craftsmen and women use time-honored techniques—from careful sculpting to hand engraving—ensuring no detail is overlooked. This isn't just production; it's personal devotion.
                        </p>
                        <p className={styles.text}>
                            With gentle hands and patient hearts, our artisans transform pure gold into wearable art, infusing each jewel with care and character. The result is a collection of pieces that are unique, alive with story, and destined to become cherished heirlooms.
                        </p>
                    </div>
                    <div className={styles.splitImage}>
                        <Image
                            src={ABOUT_IMAGES.craft}
                            alt="Craftsmanship"
                            fill
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                </div>

                {/* 50/50 Split 2 (Reversed) */}
                <div className={`${styles.splitBlock} ${styles.reversed}`}>
                    <div className={styles.splitText}>
                        <h2 className={styles.sectionTitle}>Pure, Responsibly Sourced Gold</h2>
                        <p className={styles.text}>
                            At Riolls, quality begins with the purity of materials. We use only the finest pure gold, carefully sourced from certified, ethical mines. Our gold is responsibly obtained — we partner with trusted suppliers who share our commitment to environmental stewardship and fair labor practices.
                        </p>
                        <p className={styles.text}>
                            This transparency in sourcing means you can wear Riolls jewelry with absolute confidence. Each piece carries the gleam of pure metal and the peace of mind that it was made honestly, from the ground up.
                        </p>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Trust, Transparency, and Quality</h2>
                        <p className={styles.text}>
                            Honesty is the cornerstone of the Riolls experience. We stand by every piece we create with full transparency and rigorous quality assurance. Each jewel is hallmarked to certify its purity, and we openly share details about our craftsmanship and materials. Our promise is simple: you deserve to know exactly what you're wearing.
                        </p>
                        <p className={styles.text}>
                            From the first selection of raw gold to the final polish, we document our process and welcome any questions. When you choose Riolls, you join a community built on mutual trust and integrity.
                        </p>
                    </div>
                    <div className={styles.splitImage}>
                        <Image
                            src={ABOUT_IMAGES.gold}
                            alt="Responsibly Sourced Gold"
                            fill
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                </div>

                {/* Closing Block */}
                <div className={styles.textBlockCenter} style={{ marginTop: '40px' }}>
                    <h2 className={styles.sectionTitle}>Everyday Elegance for Life</h2>
                    <p className={styles.text}>
                        Riolls jewelry is designed to be part of your daily story. We believe that elegance shouldn't be reserved for special occasions alone, but woven into every day. Each design blends classic timelessness with modern comfort, so pieces can be worn as effortlessly with jeans and a blouse as with a formal gown.
                    </p>
                    <p className={styles.text}>
                        Crafted to withstand daily adventures, Riolls pieces are robust yet refined—made to stand the test of time. These are not fleeting trends; they are treasures meant to grow with you, becoming cherished keepsakes of every moment.
                    </p>

                    <ul className={styles.list}>
                        <li><strong>Timeless Design:</strong> Classic motifs that endure changing fashions.</li>
                        <li><strong>Durable Craftsmanship:</strong> Solid construction to last a lifetime.</li>
                        <li><strong>Effortless Wear:</strong> Comfort and versatility for every occasion.</li>
                    </ul>

                    <p className={styles.text}>
                        Our jewelry is more than an accessory — it's a constant companion through life's milestones, from the quietest mornings to the grandest celebrations.
                    </p>

                    <h2 className={styles.sectionTitle} style={{ marginTop: '60px' }}>Community and Connection</h2>
                    <p className={styles.text}>
                        At the heart of Riolls is a warm community of customers, artisans, and friends. We see you as part of the Riolls family. Every message, every story of a Riolls jewel at a wedding or as a daily talisman, inspires us to keep creating.
                    </p>
                    <p className={styles.text}>
                        We celebrate our customers' journeys and strive to be there for you through all of life's moments. When you hold a Riolls piece, know that it was made with love by people who care — for you, for the craft, and for our world.
                    </p>

                    <p className={styles.closingText}>
                        We invite you to share your story with us.
                        <br /><br />
                        <em>Embrace your crown. Shine with Riolls.</em>
                    </p>
                </div>

            </section>
        </div>
    );
}
