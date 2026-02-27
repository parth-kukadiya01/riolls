'use client';

import Link from 'next/link';
import { useState } from 'react';
import { authApi } from '@/lib/api';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authApi.forgotPassword(email);
            setSent(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.container}>
                <div className={styles.authBox}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>Password Recovery</span>
                        <h1 className={styles.title}>Forgot Password</h1>
                        <p className={styles.subtitle}>
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>

                    {sent ? (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✉️</p>
                            <p style={{ color: 'var(--charcoal)', marginBottom: '0.5rem', fontWeight: 500 }}>
                                Check your inbox
                            </p>
                            <p style={{ color: 'var(--stone)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                If an account exists for <strong>{email}</strong>, you&apos;ll receive a password reset link shortly.
                            </p>
                            <Link href="/login" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--charcoal)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                                ← Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {error && (
                                <p style={{ color: '#c0392b', marginBottom: '0.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
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

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Sending…' : 'Send Reset Link'}
                            </button>
                        </form>
                    )}

                    <div className={styles.footer}>
                        <span className={styles.footerText}>Remember your password?</span>
                        <Link href="/login" className={styles.footerLink}>Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
