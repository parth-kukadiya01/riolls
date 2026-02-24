'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/page.module.css'; // Re-use auth styles

export default function SignupPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(form.firstName, form.lastName, form.email, form.password);
            router.push('/profile');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
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
                        <h1 className={styles.title}>Register</h1>
                        <p className={styles.subtitle}>Create an account to track orders and save your favourite bespoke designs.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && (
                            <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                {error}
                            </p>
                        )}

                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName" className={styles.label}>First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className={styles.input}
                                required
                                placeholder="Jane"
                                autoComplete="given-name"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName" className={styles.label}>Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className={styles.input}
                                required
                                placeholder="Doe"
                                autoComplete="family-name"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                required
                                placeholder="name@example.com"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.input}
                                required
                                placeholder="Min. 8 characters"
                                minLength={8}
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        <span className={styles.footerText}>Already have an account?</span>
                        <Link href="/login" className={styles.footerLink}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
