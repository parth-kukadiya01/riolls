'use client';

import { useState } from 'react';
import { newsletterApi } from '@/lib/api';
import styles from './page.module.css';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try { await newsletterApi.subscribe(email); setSubscribed(true); setEmail(''); } catch { }
    };

    return (
        <section className={styles.newsletter}>
            <h2 className={styles.newsletterH2}>Never miss a story.</h2>
            <p className={styles.newsletterSub}>New articles, collection drops, and exclusive atelier access — delivered monthly.</p>
            {subscribed ? (
                <p style={{ color: '#7a6a5a', fontStyle: 'italic' }}>Thank you for subscribing!</p>
            ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className={styles.newsletterInput}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                </form>
            )}
        </section>
    );
}
