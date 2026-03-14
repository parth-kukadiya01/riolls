import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Read the Riolls Jewels Conditions of Use. Our commitment to quality, bespoke commissions, shipping, returns, and intellectual property rights.',
    alternates: { canonical: 'https://riolls.com/terms' },
    openGraph: {
        title: 'Terms & Conditions — Riolls Jewels',
        description: 'Read the Riolls Jewels Conditions of Use — quality, bespoke commissions, shipping, returns, and intellectual property.',
        url: 'https://riolls.com/terms',
    },
};


export default function TermsAndConditions() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Conditions of Use</h1>
            <p className={styles.subtitle}>Our Commitment to Excellence and Trust</p>

            <div className={styles.content}>
                <section className={styles.section}>
                    <p className={styles.text}>
                        Welcome to Riolls Jewels. We consider it a profound privilege to present our discerning clientele with masterpieces of fine jewelry. We kindly invite you to review these Conditions of Use, which graciously outline the harmonious relationship between our atelier and those who choose to engage with our creations. Your continued presence on our digital boutique constitutes your esteemed acceptance of these terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Uncompromising Quality & Artistry</h2>
                    <p className={styles.text}>
                        Every piece birthed within the Riolls Jewels atelier is a testament to rigorous craftsmanship and unyielding standards. The visual representations across our collections frequently feature highly sophisticated, AI-generated conceptual artistry to showcase the zenith of jewelry design. While our master artisans dedicate themselves tirelessly to achieving a pristine 100% replication of these visions, the organic nature of precious materials and the bounds of physical craftsmanship may occasionally prevent an exact match. Should a spectacular design prove structurally unfeasible to execute to our exacting standards, we respectfully reserve the right to decline the commission, prioritizing the enduring integrity of your jewelry over a perfect replication.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Discerning Acquisitions</h2>
                    <p className={styles.text}>
                        When you select to acquire a piece from our collection, you are initiating a binding commitment of purchase. All acquisitions remain the property of Riolls Jewels until the final settlement of funds has been gracefully received. We reserve the right to respectfully decline an acquisition inquiry should the piece become unexpectedly unavailable or if our rigorous security protocols kindly mandate it.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Bespoke Commissions</h2>
                    <p className={styles.text}>
                        For our most esteemed clients seeking one-of-a-kind art, the Bespoke journey is guided by dedicated concierges.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>A non-refundable engagement deposit is required to commence the honorable design process.</li>
                        <li className={styles.listItem}>As these personalized masterpieces are intimately crafted to your exact predilections, customized jewelry is strictly exempt from our standard return policy and remains non-returnable. Should any queries arise or if a return is sought under exceptional circumstances, we kindly direct your attention to our comprehensive exchange and return conditions.</li>
                        <li className={styles.listItem}>We commit to complete transparency throughout the ideation and creation timeline.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Secure and Dignified Shipping</h2>
                    <p className={styles.text}>
                        Your acquisitions are transported with the highest echelons of security. We partner exclusively with premier logistics providers to ensure your piece is fully insured while in transit. Upon its arrival, a signature from the designated recipient is strictly mandated to conclude its safe journey into your possession.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Graceful Returns & Exchanges</h2>
                    <p className={styles.text}>
                        We wish for your complete infatuation with your Riolls Jewels acquisition. If, for any reason, a standard collection piece does not entirely capture your heart, you may initiate a return within 14 days of receipt, provided the item remains in original, unworn condition with all authenticity documentation intact. Please note, however, that bespoke and customized creations are strictly non-returnable. For a detailed understanding of our policies, we warmly invite you to consult our exchange and return conditions. Please <Link href="/contact" className={styles.contactLink}>contact our concierge team</Link> to arrange a secure return transit.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Intellectual Property & Heritage</h2>
                    <p className={styles.text}>
                        The designs, imagery, nomenclature, and digital presence of Riolls Jewels are the exclusive cultural heritage and intellectual property of our House. We kindly request that our imagery and text not be duplicated, distributed, or utilized without the express written blessing of our executive team.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Confidentiality & Discretion</h2>
                    <p className={styles.text}>
                        We hold our relationship with you in the strictest confidence. For details concerning the careful stewardship of your personal information, we invite you to review our dedicated Privacy Policy.
                    </p>
                </section>

                <section className={styles.section}>
                    <p className={styles.text} style={{ fontStyle: 'italic', marginTop: '40px' }}>
                        For any inquiries regarding these policies, our dedicated advisors are at your entire disposal. We thank you for entrusting Riolls Jewels with your most precious moments.
                    </p>
                </section>
            </div>
        </div>
    );
}
