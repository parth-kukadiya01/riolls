'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminToken, ADMIN_API_URL } from '@/lib/adminAuth';
import styles from './page.module.css';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${ADMIN_API_URL}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.data?.user?.role !== 'admin') {
                throw new Error('Access denied. Administrator privileges required.');
            }

            setAdminToken(data.data.token);
            router.replace('/admin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1">
                        <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" />
                        <polygon points="8,4 12,6.5 12,9.5 8,12 4,9.5 4,6.5" fill="rgba(220,207,178,0.3)" />
                    </svg>
                    <span className={styles.logoText}>RIOLLS</span>
                </div>

                <h1 className={styles.title}>Admin Portal</h1>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@riolls.com"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.footer}>
                    Secure Server Access
                </div>
            </div>
        </div>
    );
}
