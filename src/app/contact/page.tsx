'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitting(true);
        try {
            const { contactApi } = await import('@/lib/api');
            await contactApi.submit({
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                subject: form.subject,
                message: form.message,
            });
            setSent(true);
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to send. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Get in Touch</span>
                    <h1 className={styles.heroH1}>We&apos;d love<br />to hear from you.</h1>
                    <p className={styles.heroSub}>
                        Our team of experts is available Monday through Saturday to assist with orders,
                        bespoke commissions, and styling enquiries.
                    </p>
                </div>
            </section>

            {/* ── Contact cards ── */}
            <section className={styles.cardsSection}>
                <div className={styles.cards}>
                    <a href="mailto:info@riolls.in" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <span className={styles.cardLabel}>Email Us</span>
                        <span className={styles.cardValue}>info@riolls.in</span>
                        <span className={styles.cardCta}>Send an email →</span>
                    </a>

                    <a href="tel:+918320601190" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.51-1.51a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </div>
                        <span className={styles.cardLabel}>Call Us</span>
                        <span className={styles.cardValue}>+91-83206-01190</span>
                        <span className={styles.cardCta}>Call now →</span>
                    </a>

                    <div className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                            </svg>
                        </div>
                        <span className={styles.cardLabel}>Business Hours</span>
                        <span className={styles.cardValue}>Mon – Sat: 10am – 7pm</span>
                        <span className={styles.cardValue2}>Sunday: By appointment</span>
                    </div>

                    <a href="https://maps.app.goo.gl/JWDQiDaJYzi83cxx8" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <span className={styles.cardLabel}>Visit Us</span>
                        <span className={styles.cardValue}>Surat, India</span>
                        <span className={styles.cardCta}>Get directions →</span>
                    </a>
                </div>
            </section>

            {/* ── Form + Map ── */}
            <section className={styles.mainSection}>
                {/* Enquiry form */}
                <div className={styles.formWrap}>
                    <h2 className={styles.formTitle}>Make an Enquiry</h2>
                    <p className={styles.formSub}>Fill in the form and we&apos;ll respond within 24 hours.</p>

                    {sent ? (
                        <div className={styles.success}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="9,12 11,14 15,10" />
                            </svg>
                            <p className={styles.successTitle}>Message received.</p>
                            <p className={styles.successBody}>Thank you — a member of our team will be in touch shortly.</p>
                            <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                                    <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className={styles.input} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Email Address <span className={styles.req}>*</span></label>
                                    <input type="email" name="email" value={form.email} onChange={handle} required placeholder="email@example.com" className={styles.input} />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" className={styles.input} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Subject <span className={styles.req}>*</span></label>
                                    <select name="subject" value={form.subject} onChange={handle} required className={styles.input}>
                                        <option value="">Select a topic…</option>
                                        <option>Order Enquiry</option>
                                        <option>Bespoke Commission</option>
                                        <option>Product Information</option>
                                        <option>Returns &amp; Exchanges</option>
                                        <option>Appointment Booking</option>
                                        <option>Press &amp; Media</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Message <span className={styles.req}>*</span></label>
                                <textarea name="message" value={form.message} onChange={handle} required rows={6} placeholder="Tell us how we can help…" className={styles.textarea} />
                            </div>

                            <div className={styles.formFooter}>
                                <button type="submit" className={styles.submitBtn}>Send Enquiry</button>
                                <p className={styles.privacy}>
                                    By submitting you agree to our{' '}
                                    <Link href="#" className={styles.privacyLink}>Privacy Policy</Link>.
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Map */}
                <div className={styles.mapWrap}>
                    <div className={styles.mapFrame}>
                        <iframe
                            title="Riolls Jewels — Surat"
                            src="https://maps.google.com/maps?q=Surat,Gujarat,India&z=13&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                    <a
                        href="https://maps.app.goo.gl/JWDQiDaJYzi83cxx8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapBtn}
                    >
                        Open in Google Maps →
                    </a>
                </div>
            </section>

        </div>
    );
}
