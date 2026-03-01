'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../login/page.module.css'; // Re-use auth styles

export default function SignupPage() {
    const { register, verifyOtp, googleLogin } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', repassword: '' });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.repassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!form.email.toLowerCase().endsWith('@gmail.com')) {
            setError('Only @gmail.com email addresses are allowed.');
            return;
        }

        setLoading(true);
        try {
            await register(form.firstName, form.lastName, form.email, form.password);
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await verifyOtp(form.email, otp);
            router.push('/profile');
        } catch (err: any) {
            setError(err.message || 'OTP Verification failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setError('');
        setLoading(true);
        try {
            if (credentialResponse.credential) {
                await googleLogin(credentialResponse.credential);
                router.push('/profile');
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
                        <h1 className={styles.title}>{step === 'details' ? 'Register' : 'Verify Email'}</h1>
                        <p className={styles.subtitle}>
                            {step === 'details'
                                ? 'Create an account to track orders and save your favourite bespoke designs.'
                                : `We've sent a 6-digit confirmation code to ${form.email}. Enter it below.`}
                        </p>
                    </div>

                    {error && (
                        <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    {step === 'details' ? (
                        <>
                            <form className={styles.form} onSubmit={handleSignupSubmit}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                                    <input type="text" id="firstName" name="firstName" className={styles.input} required placeholder="Jane" autoComplete="given-name" value={form.firstName} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                                    <input type="text" id="lastName" name="lastName" className={styles.input} required placeholder="Doe" autoComplete="family-name" value={form.lastName} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email" className={styles.label}>Email Address</label>
                                    <input type="email" id="email" name="email" className={styles.input} required placeholder="name@gmail.com" autoComplete="email" value={form.email} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <input type="password" id="password" name="password" className={styles.input} required placeholder="Min. 8 characters" minLength={8} autoComplete="new-password" value={form.password} onChange={handleChange} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="repassword" className={styles.label}>Confirm Password</label>
                                    <input type="password" id="repassword" name="repassword" className={styles.input} required placeholder="Min. 8 characters" minLength={8} autoComplete="new-password" value={form.repassword} onChange={handleChange} />
                                </div>
                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    {loading ? 'Creating account…' : 'Create Account'}
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
                        </>
                    ) : (
                        <form className={styles.form} onSubmit={handleOtpSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="otp" className={styles.label}>6-Digit OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    className={styles.input}
                                    required
                                    placeholder="123456"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    style={{ letterSpacing: '0.2rem', textAlign: 'center', fontSize: '1.25rem' }}
                                />
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'Verifying…' : 'Verify Email'}
                            </button>
                            <button
                                type="button"
                                style={{ background: 'none', border: 'none', color: '#9a9590', textDecoration: 'underline', marginTop: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}
                                onClick={() => setStep('details')}
                            >
                                ← Back to details
                            </button>
                        </form>
                    )}

                    <div className={styles.footer}>
                        <span className={styles.footerText}>Already have an account?</span>
                        <Link href="/login" className={styles.footerLink}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
