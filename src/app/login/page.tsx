'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import styles from './page.module.css';

import { Suspense } from 'react';

function LoginContent() {
    const { login, googleLogin, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || undefined;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect already-logged-in users away from /login
    useEffect(() => {
        if (!authLoading && user) {
            router.replace(callbackUrl || (user.role === 'admin' ? '/admin' : '/profile'));
        }
    }, [user, authLoading, router, callbackUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userData = await login(email, password);
            // Check for callback, otherwise admin users go to dashboard, regular to profile
            router.push(callbackUrl || (userData.role === 'admin' ? '/admin' : '/profile'));
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setError('');
        setLoading(true);
        try {
            if (credentialResponse.credential) {
                const userData = await googleLogin(credentialResponse.credential);
                router.push(callbackUrl || (userData.role === 'admin' ? '/admin' : '/profile'));
            }
        } catch (err: any) {
            setError(err.message || 'Google login failed.');
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

                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <hr style={{ flex: 1, borderTop: '1px solid #ddd' }} />
                            <span style={{ padding: '0 10px', color: '#888', fontSize: '0.85rem' }}>OR</span>
                            <hr style={{ flex: 1, borderTop: '1px solid #ddd' }} />
                        </div>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                            theme="outline"
                            size="large"
                            shape="rectangular"
                            width="100%"
                        />
                    </div>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>New to Riolls Jewels?</span>
                        <Link href="/signup" className={styles.footerLink}>Create an Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div style={{ paddingTop: 'var(--nav-height)', padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
