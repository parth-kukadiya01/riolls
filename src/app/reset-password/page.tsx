'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import styles from '../login/page.module.css';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') ?? '';

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    // If no token in URL, show an error immediately
    const missingToken = !token;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await authApi.resetPassword(token, password);
            setDone(true);
            // Auto-redirect to login after 3 s
            setTimeout(() => router.push('/login'), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicator
    const strength = password.length === 0 ? 0
        : password.length < 8 ? 1
            : /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 12 ? 3
                : 2;
    const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
    const strengthColor = ['', '#c0392b', '#e67e22', '#27ae60'];

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.container}>
                <div className={styles.authBox}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>Account Security</span>
                        <h1 className={styles.title}>New Password</h1>
                        <p className={styles.subtitle}>
                            {done
                                ? 'Your password has been reset. Redirecting to sign in…'
                                : missingToken
                                    ? 'Invalid or missing reset token.'
                                    : 'Choose a strong new password for your account.'}
                        </p>
                    </div>

                    {done ? (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</p>
                            <p style={{ color: '#27ae60', fontWeight: 500, marginBottom: '1rem' }}>Password changed successfully!</p>
                            <Link href="/login" className={styles.footerLink}>Go to Sign In →</Link>
                        </div>
                    ) : missingToken ? (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <p style={{ color: '#c0392b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                This link is invalid or has already been used. Please request a new one.
                            </p>
                            <Link href="/forgot-password" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                                Request New Link
                            </Link>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {error && (
                                <p style={{ color: '#c0392b', fontSize: '0.9rem', textAlign: 'center', margin: '-8px 0 4px' }}>
                                    {error}
                                </p>
                            )}

                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={styles.input}
                                    required
                                    autoComplete="new-password"
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {/* Strength bar */}
                                {password.length > 0 && (
                                    <div style={{ marginTop: '6px' }}>
                                        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                            {[1, 2, 3].map(i => (
                                                <div key={i} style={{
                                                    flex: 1, height: '3px', borderRadius: '2px',
                                                    background: i <= strength ? strengthColor[strength] : '#ede8e2',
                                                    transition: 'background 0.3s',
                                                }} />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '11px', color: strengthColor[strength] }}>
                                            {strengthLabel[strength]}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm"
                                    className={styles.input}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Repeat your new password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    style={{ borderColor: confirm && confirm !== password ? '#c0392b' : undefined }}
                                />
                                {confirm && confirm !== password && (
                                    <span style={{ fontSize: '11px', color: '#c0392b', marginTop: '2px' }}>Passwords don't match</span>
                                )}
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Saving…' : 'Set New Password'}
                            </button>
                        </form>
                    )}

                    {!done && (
                        <div className={styles.footer}>
                            <span className={styles.footerText}>Remember your password?</span>
                            <Link href="/login" className={styles.footerLink}>Back to Sign In</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordForm />
        </Suspense>
    );
}
