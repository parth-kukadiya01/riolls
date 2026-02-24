'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function LoginPage() {
    const { login, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect already-logged-in users away from /login
    useEffect(() => {
        if (!authLoading && user) {
            router.replace(user.role === 'admin' ? '/admin' : '/profile');
        }
    }, [user, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userData = await login(email, password);
            // Admin users go straight to the dashboard
            router.push(userData.role === 'admin' ? '/admin' : '/profile');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.container}>
                <div className={styles.authBox}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>Client Account</span>
                        <h1 className={styles.title}>Sign In</h1>
                        <p className={styles.subtitle}>Enter your details to access your bespoke orders and preferences.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && (
                            <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                {error}
                            </p>
                        )}
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                required
                                placeholder="name@example.com"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.passwordHeader}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <Link href="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className={styles.input}
                                required
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>New to Riolls Jewels?</span>
                        <Link href="/signup" className={styles.footerLink}>Create an Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
