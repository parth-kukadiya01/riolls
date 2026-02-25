'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { newsletterApi } from '@/lib/api';
import styles from './Footer.module.css';

export default function Footer() {
    const pathname = usePathname();
    const [highContrast, setHighContrast] = useState(false);
    const [newsEmail, setNewsEmail] = useState('');
    const [newsMsg, setNewsMsg] = useState('');

    if (pathname?.startsWith('/admin')) return null;

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsEmail) return;
        try {
            await newsletterApi.subscribe(newsEmail);
            setNewsMsg('Thank you for subscribing!');
            setNewsEmail('');
        } catch (err: any) {
            setNewsMsg(err.message || 'Subscription failed. Please try again.');
        }
    };

    return (
        <footer className={styles.footer}>
            {/* Newsletter strip */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '2rem 4vw', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.5rem' }}>The Journal</p>
                <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>Atelier updates, new arrivals & exclusive stories — to your inbox.</p>
                {newsMsg ? (
                    <p style={{ fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.8 }}>{newsMsg}</p>
                ) : (
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px', margin: '0 auto' }}>
                        <input
                            type="email"
                            required
                            value={newsEmail}
                            onChange={e => setNewsEmail(e.target.value)}
                            placeholder="Your email address"
                            style={{ flex: 1, padding: '0.6rem 1rem', border: '1px solid black', background: 'transparent', color: 'inherit', borderRadius: '2px', fontSize: '0.85rem' }}
                        />
                        <button
                            type="submit"
                            style={{ padding: '0.6rem 1.4rem', background: 'rgba(255,255,255,0.15)', border: '1px solid black', color: 'inherit', borderRadius: '2px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.05em' }}
                        >
                            Subscribe
                        </button>
                    </form>
                )}
            </div>

            {/* Main link grid */}
            <div className={styles.grid}>
                <div className={styles.col}>
                    <span className={styles.colTitle}>Customer Care</span>
                    <Link href="/contact">Contact Us</Link>
                    <Link href="/product-care">Product Care</Link>
                    <Link href="/delivery-returns">Delivery &amp; Returns</Link>
                </div>

                <div className={styles.col}>
                    <span className={styles.colTitle}>Client Services</span>
                    <Link href="/bespoke">Book an Appointment</Link>
                    <Link href="/education/diamond-guide">Diamond Buying Guide</Link>
                    <Link href="/size-guide">Size Guide</Link>
                </div>

                <div className={styles.col}>
                    <span className={styles.colTitle}>Our Company</span>
                    <Link href="/about">About Us</Link>
                    <Link href="/careers">Careers</Link>
                </div>

                {/* Right column */}
                <div className={styles.colRight}>
                    <span className={styles.shipping}>
                        Shipping to <Link href="#" className={styles.shippingLink}>United Kingdom (£)</Link>
                    </span>

                    <div className={styles.socials}>
                        <a href="https://www.instagram.com/riollsjewels/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/riolls-jewels-b189a1387/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@riollsjewels" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z" />
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                            </svg>
                        </a>
                    </div>

                    <div className={styles.contrastRow}>
                        <span className={styles.contrastLabel}>High Contrast Mode</span>
                        <button
                            role="switch"
                            aria-checked={highContrast}
                            className={`${styles.toggle} ${highContrast ? styles.toggleOn : ''}`}
                            onClick={() => setHighContrast(v => !v)}
                            aria-label="Toggle high contrast mode"
                        >
                            <span className={styles.toggleThumb} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom legal bar */}
            <div className={styles.legal}>
                <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
                <span className={styles.copyright}>© Riolls Jewels UK 2026</span>
            </div>
        </footer>
    );
}
