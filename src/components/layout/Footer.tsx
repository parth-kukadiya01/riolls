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
                            style={{ flex: 1, padding: '0.6rem 1rem', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'inherit', borderRadius: '2px', fontSize: '0.85rem' }}
                        />
                        <button
                            type="submit"
                            style={{ padding: '0.6rem 1.4rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'inherit', borderRadius: '2px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.05em' }}
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
                        <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="#" aria-label="TikTok" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Pinterest" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <circle cx="12" cy="12" r="10" /><path d="M9 15c-.5-1.5 0-3 .5-4s2.5-4 2.5-4 .5 2-1 4 1.5 4 3 1" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" />
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
