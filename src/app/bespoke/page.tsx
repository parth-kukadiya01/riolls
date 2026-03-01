import type { Metadata } from 'next';
import Link from 'next/link';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';
import ClientBespokeGallery from './ClientBespokeGallery';

export const metadata: Metadata = { title: 'Bespoke Jewellery' };

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
