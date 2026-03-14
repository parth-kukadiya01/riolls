import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Delivery & Returns',
    description: 'Learn about Riolls Jewels delivery, shipping, and returns policy. Complimentary insured shipping within India, worldwide delivery, 48-hour returns window, and 7-day exchange privilege.',
    alternates: { canonical: 'https://riolls.com/delivery-returns' },
    openGraph: {
        title: 'Delivery & Returns — Riolls Jewels',
        description: 'Complimentary insured shipping within India, worldwide delivery, 7-day exchange privilege, and refined returns policy from Riolls Jewels.',
        url: 'https://riolls.com/delivery-returns',
        images: [{ url: 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png', width: 1200, height: 630, alt: 'Riolls Jewels — Delivery & Returns' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Delivery & Returns — Riolls Jewels',
        description: 'Free insured shipping in India, worldwide delivery, 7-day exchange privilege.',
        images: ['https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png'],
    },
};

export default function DeliveryReturnsPage() {
    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Riolls Jewels</span>
                    <h1 className={styles.heroH1}>Delivery &amp; Returns</h1>
                    <p className={styles.heroSub}>
                        Everything you need to know about processing, shipping, and our Return &amp; Exchange policy.
                    </p>
                </div>
            </section>

            {/* ── Content ── */}
            <section className={styles.content}>
                <div className={styles.article}>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Graceful Returns &amp; Exchanges</h2>
                        <p className={styles.text}>
                            At Riolls Jewels, our master artisans dedicate themselves to creating magnificent fine jewellery of uncompromising quality. Each superlative creation is subjected to our most rigorous quality standards before it leaves our atelier. We respectfully understand, however, that circumstances change. If a piece from our standard collections does not fully capture your heart, we extend a refined, transparent Return &amp; Exchange Policy for your peace of mind.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Complimentary Shipping Privileges</h2>

                        <h3 className={styles.subTitle}>Curation &amp; Dispatch</h3>
                        <p className={styles.text}>
                            Orders from our immediate collections are gracefully prepared and dispatched within 48 hours. Bespoke commissions, personalized engravings, and made-to-order masterpieces naturally require the unhurried attention of our craftsmen and will require additional time. Should your acquisition include both immediate and bespoke items, we may arrange separate, secure shipments to prioritize your convenience.
                        </p>

                        <h3 className={styles.subTitle}>Global Delivery Privileges</h3>
                        <ul className={styles.list}>
                            <li><strong>Within India:</strong> We are pleased to offer secure, complimentary insured delivery on all acquisitions exceeding ₹449.</li>
                            <li><strong>International Patronage:</strong> Insured global shipping rates apply. We ask our esteemed international clients to kindly note that complimentary returns are not available for deliveries outside India.</li>
                        </ul>

                        <h3 className={styles.subTitle}>Secure Transit</h3>
                        <ul className={styles.list}>
                            <li><strong>Discrete Tracking:</strong> The moment your jewel departs our atelier, you will be personally provided with discrete tracking particulars via WhatsApp, Email, and SMS.</li>
                            <li><strong>Staged Deliveries:</strong> Elaborate acquisitions or multi-piece orders may be thoughtfully divided into separate, secure parcels to ensure the absolute safety of your investments in transit.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Return Eligibility &amp; Conditions</h2>
                        <ul className={styles.list}>
                            <li>We kindly invite you to initiate an return or exchange request within 48 hours of meticulously receiving your jewel (applicable to eligible collection pieces only).</li>
                            <li>To honour the pristine nature of our creations, returned jewels must be in immaculate, completely unworn condition, secured within their original presentation boxes, and accompanied by all undisturbed certificates, protective seals, and authenticity tags.</li>
                            <li>With the deepest respect for our next patron, returns cannot be authorized if authenticity tags have been removed or altered, or if the jewel exhibits the slightest indication of wear or handling.</li>
                        </ul>

                        <h3 className={styles.subTitle}>Exclusively Yours (Non-Returnable Creations)</h3>
                        <ul className={styles.list}>
                            <li>Bespoke commissions and intimately personalized designs</li>
                            <li>Meticulously made-to-order fine jewellery</li>
                            <li>Exclusive archivial or gracefully reduced acquisitions</li>
                        </ul>
                        <p className={styles.textNote}>
                            <em>An Artisan's Note:</em> As each Riolls jewel is lovingly handcrafted by generational artisans in Jaipur and Kolkata, microscopic variations are the celebrated hallmark of human artistry, not flaws. The subtle, unique characteristics of natural precious stones are equally inherent and cherished.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Refined Refund Protocol</h2>
                        <ul className={styles.list}>
                            <li>Refunds are gracefully initiated immediately following a thorough, satisfactory inspection by our master evaluators at the Riolls atelier.</li>
                            <li>Reimbursements will be securely routed to your original method of acquisition within 7–10 business days.</li>
                            <li>We kindly request that any complimentary gifts or exclusive accessories presented with your order be returned alongside the jewel. The absence of such accompaniments may respectfully necessitate a deduction equivalent to their retail value.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>The Exchange Privilege</h2>
                        <ul className={styles.list}>
                            <li>We proudly offer a 7-day exchange privilege for all eligible collection pieces.</li>
                            <li>You are welcome to exchange your acquisition for an alternate size, a different design from our collections, or a piece of equal or superlative value.</li>
                            <li>We ask that any delicate differences in valuation be respectfully settled prior to the dispatch of your new selection.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Initiating a Return</h2>
                        <ul className={styles.list}>
                            <li>We invite you to register your request elegantly via <Link href="/contact" className={styles.link}>Riolls.com or by directly contacting our dedicated Concierge Team</Link>.</li>
                            <li>For your ultimate convenience, our secure logistics partner will arrange a reverse pick-up from your residence or office. We kindly ask for your availability during this scheduled window.</li>
                            <li>Should your estate reside outside our partner's secure return network, we will guide you in utilizing a trusted insured courier, and seamlessly reimburse your transit costs up to ₹70.</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Final Advisements</h2>
                        <ul className={styles.list}>
                            <li><strong>Security Verifications:</strong> For your absolute protection, claims regarding missing or tampered items must be reported within 48 hours, strictly accompanied by an uninterrupted, 360° unboxing video. Without this visual verification, we regret that we cannot authorize a replacement.</li>
                            <li><strong>International Consideration:</strong> Our valued international patrons are kindly responsible for secure return shipping logistics, associated customs duties, and relevant handling fees.</li>
                            <li><strong>The Riolls Standard:</strong> Riolls Jewels respectfully reserves the final discretion in authorizing returns, based unequivocally on the verified condition of the returned masterpiece.</li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
}
