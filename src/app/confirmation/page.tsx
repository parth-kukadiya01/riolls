import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Order Confirmed' };

export default function ConfirmationPage() {
    const steps = [
        { icon: '📧', title: 'Confirmation', body: 'Check your inbox for full order details.' },
        { icon: '💎', title: 'Your Goldsmith', body: 'We\'ll introduce you to your dedicated artisan within 24 hours.' },
        { icon: '🗓', title: 'Creation', body: 'Track your piece\'s journey from workshop to your door.' },
    ];

    return (
        <div className={styles.page}>
            <Link href="/" className={styles.logo}>RIOLLS JEWELS</Link>

            <div className={styles.main}>
                <div className={styles.diamond}>
                    <svg width="60" height="72" viewBox="0 0 60 72" fill="rgba(201,169,110,0.25)" stroke="#C9A96E" strokeWidth="0.6">
                        <polygon points="30,2 58,18 47,70 13,70 2,18" />
                        <polygon points="30,2 47,18 30,28 13,18" />
                        <line x1="13" y1="18" x2="47" y2="18" />
                        <line x1="30" y1="28" x2="13" y2="70" />
                        <line x1="30" y1="28" x2="47" y2="70" />
                    </svg>
                </div>

                <span className={styles.eyebrow}>Your Order Is Confirmed</span>
                <h1 className={styles.headline}>Thank you, <em>Sarah.</em></h1>
                <p className={styles.editorial}>Your journey with Riolls Jewels begins today.</p>
                <p className={styles.body}>We&apos;ve sent a confirmation to sarah@email.com. Your piece will be handcrafted over the coming weeks by your dedicated goldsmith, who will be in touch shortly.</p>

                <div className={styles.orderCard}>
                    <span className={styles.refLabel}>Order Reference</span>
                    <span className={styles.refNum}>#RJ-2025-8471</span>
                    {[
                        ['Piece', 'Celestine Solitaire Ring'],
                        ['Metal', '18k Yellow Gold'],
                        ['Delivery', 'Free Insured Worldwide'],
                        ['Est. Creation', '8 – 10 weeks'],
                        ['Goldsmith', 'London Atelier'],
                    ].map(([k, v]) => (
                        <div key={k} className={styles.specRow}>
                            <span className={styles.specKey}>{k}</span>
                            <span className={styles.specVal}>{v}</span>
                        </div>
                    ))}
                    <p className={styles.orderTotal}>$ 8,500</p>
                </div>

                <span className={styles.nextTitle}>What Happens Next</span>
                <div className={styles.nextGrid}>
                    {steps.map(s => (
                        <div key={s.title} className={styles.nextCard}>
                            <span className={styles.nextIcon}>{s.icon}</span>
                            <span className={styles.nextCardTitle}>{s.title}</span>
                            <p className={styles.nextCardBody}>{s.body}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.ctas}>
                    <Link href="/shop" className={styles.ctaBtn}>Continue Exploring</Link>
                    <Link href="/" className={styles.ctaLink}>Return to Homepage →</Link>
                </div>

                <p className={styles.quote}>
                    Every Riolls Jewels piece is created by a single goldsmith —<br />one pair of hands, one vision, one story.
                </p>
            </div>
        </div>
    );
}
