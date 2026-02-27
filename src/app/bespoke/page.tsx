import type { Metadata } from 'next';
import Link from 'next/link';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';
import ClientBespokeGallery from './ClientBespokeGallery';

export const metadata: Metadata = { title: 'Bespoke Jewellery' };

export default function BespokePage() {
    const steps = [
        { n: '01', title: 'The Conversation', body: 'Begin with an in-depth appointment with our Creative Director — in person at our London townhouse or via private video call.' },
        { n: '02', title: 'The Vision', body: 'We sketch, render, and refine. From hand-drawn studies to 3D models, we craft until every detail is exactly as you imagined.' },
        { n: '03', title: 'The Making', body: 'A single goldsmith dedicates 8 to 12 weeks to your piece. No factory. No shortcuts. Just mastery.' },
    ];

    // We delegates gallery to a client component because we need useEffect
    // The rest of the page remains server-rendered (or default NextJS behavior)

    return (
        <>
            {/* Hero */}
            <section className={styles.hero} style={{ paddingTop: 'var(--nav-height)' }}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.heroBrow}>
                        <span className={styles.heroLine} />
                        <span className={styles.heroBrowText}>Bespoke Jewellery</span>
                    </div>
                    <h1 className={styles.heroH1}>A piece made<br />only for you.</h1>
                    <p className={styles.heroBody}>Commission a one-of-a-kind jewel, designed in close collaboration with our master goldsmiths over 8–12 weeks.</p>
                    <Link href="/contact" className={styles.heroCta}>Book a Private Consultation</Link>
                </div>
            </section>

            {/* Process */}
            <section className={styles.process}>
                <div className={styles.sectionCenter}>
                    <span className={styles.eyebrow}>The Process</span>
                    <h2 className={styles.sectionH2}>From idea to heirloom.</h2>
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
                <div className={styles.sectionCenter}>
                    <span className={styles.eyebrow} style={{ color: 'var(--gold)' }}>Past Commissions</span>
                    <h2 className={styles.sectionH2} style={{ color: '#F5F0E8' }}>Each one, one of a kind.</h2>
                </div>
                <ClientBespokeGallery />
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2 className={styles.ctaH2}>Begin your commission.</h2>
                <p className={styles.ctaBody}>Our commissions are available worldwide. Begin with a complimentary consultation to discuss your vision, timeline, and budget.</p>
                <div className={styles.ctaRow}>
                    <Link href="/contact" className={styles.ctaBtnGold}>Book a Consultation</Link>
                    <a href="https://wa.me/message/CNVYZ7P7GP3SN1?text=Hello" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnGhost}>WhatsApp Us</a>
                </div>
            </section>
        </>
    );
}
