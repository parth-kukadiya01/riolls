'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import CustomTimePicker from '@/components/ui/CustomTimePicker';
import styles from './page.module.css';

export default function ContactPage() {
    const { user } = useAuth();
    const [mode, setMode] = useState<'enquiry' | 'appointment'>('enquiry');

    // Enquiry form state
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

    // Appointment form state
    const [apptForm, setApptForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+44',
        phone: '',
        country: '',
        pincode: '',
        date: '',
        time: '',
        type: 'office_visit' as 'office_visit' | 'google_meet' | 'whatsapp',
        message: ''
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [sent, setSent] = useState(false);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleAppt = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setApptForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        if (!user) {
            setSubmitError('Please sign in to submit this form.');
            return;
        }
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

    const submitAppt = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        if (!user) {
            setSubmitError('Please sign in to book an appointment.');
            return;
        }
        setSubmitting(true);
        try {
            const { appointmentApi } = await import('@/lib/api');
            await appointmentApi.book(apptForm);
            setSent(true);
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to book appointment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.eyebrow}>Private Consultation</span>
                    <h1 className={styles.heroH1}>At your absolute<br />disposal.</h1>
                    <p className={styles.heroSub}>
                        Our dedicated concierges are available Monday through Saturday to assist with discerning acquisitions, bespoke commissions, and private viewings.
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

                    <a href="https://wa.me/message/CNVYZ7P7GP3SN1?text=hellii" target="_blank" rel="noopener noreferrer" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                        </div>
                        <span className={styles.cardLabel}>WhatsApp</span>
                        <span className={styles.cardValue}>Chat with us</span>
                        <span className={styles.cardCta}>Message now →</span>
                    </a>
                </div>
            </section>

            {/* ── Form + Map ── */}
            <section className={styles.mainSection}>
                {/* Form Wrap */}
                <div className={styles.formWrap}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                        <button
                            type="button"
                            onClick={() => { setMode('enquiry'); setSent(false); }}
                            className={`${styles.modeBtn} ${mode === 'enquiry' ? styles.modeBtnActive : ''}`}
                        >
                            Send Enquiry
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMode('appointment'); setSent(false); }}
                            className={`${styles.modeBtn} ${mode === 'appointment' ? styles.modeBtnActive : ''}`}
                        >
                            Book Appointment
                        </button>
                    </div>

                    <h2 className={styles.formTitle}>{mode === 'enquiry' ? 'Submit an Inquiry' : 'Request a Private Appointment'}</h2>
                    <p className={styles.formSub}>
                        {mode === 'enquiry' ? "Detail your request below. A bespoke advisor will respond within 24 hours with the utmost discretion." : "Select your preferred date and time for an exclusive consultation with our master artisans."}
                    </p>

                    {!user && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            background: '#fdf8f5', border: '1px solid #e8ddd8',
                            borderRadius: '10px', padding: '14px 18px', marginBottom: '20px',
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5C52" strokeWidth="1.6">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span style={{ fontSize: '0.875rem', color: '#5c4a43' }}>
                                You need to be signed in to submit this form.{' '}
                                <Link href="/login" style={{ color: '#8B5C52', fontWeight: 600, textDecoration: 'underline' }}>
                                    Sign in
                                </Link>
                                {' '}or{' '}
                                <Link href="/register" style={{ color: '#8B5C52', fontWeight: 600, textDecoration: 'underline' }}>
                                    create an account
                                </Link>.
                            </span>
                        </div>
                    )}

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
                    ) : mode === 'enquiry' ? (
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
                                    <input type="tel" name="phone" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9+\s-]/g, '') }))} placeholder="+91 00000 00000" className={styles.input} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Subject <span className={styles.req}>*</span></label>
                                    <select name="subject" value={form.subject} onChange={handle} required className={styles.input}>
                                        <option value="">Select a topic…</option>
                                        <option>Order Enquiry</option>
                                        <option>Bespoke Commission</option>
                                        <option>Product Information</option>
                                        <option>Returns &amp; Exchanges</option>
                                        <option>Press &amp; Media</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Message <span className={styles.req}>*</span></label>
                                <textarea name="message" value={form.message} onChange={handle} required rows={6} placeholder="Tell us how we can help…" className={styles.textarea} />
                            </div>

                            {submitError && <div style={{ color: 'red', fontSize: '0.875rem', marginBottom: '16px' }}>{submitError}</div>}

                            <div className={styles.formFooter}>
                                <button type="submit" disabled={submitting} className={styles.submitBtn}>
                                    {submitting ? 'Sending...' : 'Send Enquiry'}
                                </button>
                                <p className={styles.privacy}>
                                    By submitting you agree to our{' '}
                                    <Link href="/privacy" className={styles.privacyLink}>Privacy Policy</Link>.
                                </p>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={submitAppt} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label className={styles.label}>First Name <span className={styles.req}>*</span></label>
                                    <input name="firstName" value={apptForm.firstName} onChange={handleAppt} required placeholder="First Name" className={styles.input} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Last Name <span className={styles.req}>*</span></label>
                                    <input name="lastName" value={apptForm.lastName} onChange={handleAppt} required placeholder="Last Name" className={styles.input} />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Email Address <span className={styles.req}>*</span></label>
                                <input type="email" name="email" value={apptForm.email} onChange={handleAppt} required placeholder="email@example.com" className={styles.input} />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field} style={{ flex: '0 0 160px' }}>
                                    <label className={styles.label}>Code <span className={styles.req}>*</span></label>
                                    <select name="countryCode" value={apptForm.countryCode} onChange={handleAppt} required className={styles.input}>
                                        <option value="+91">India (+91)</option>
                                        <option value="+44">UK (+44)</option>
                                        <option value="+1">USA / Canada (+1)</option>
                                        <option value="+971">UAE (+971)</option>
                                        <option value="+61">Australia (+61)</option>
                                        <option value="+33">France (+33)</option>
                                        <option value="+49">Germany (+49)</option>
                                        <option value="+81">Japan (+81)</option>
                                        <option value="+65">Singapore (+65)</option>
                                        <option value="+974">Qatar (+974)</option>
                                        <option value="+966">Saudi Arabia (+966)</option>
                                        <option value="+27">South Africa (+27)</option>
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Contact Number <span className={styles.req}>*</span></label>
                                    <input type="tel" name="phone" value={apptForm.phone} onChange={(e) => setApptForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9+\s-]/g, '') }))} required placeholder="Phone Number" className={styles.input} />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Country <span className={styles.req}>*</span></label>
                                    <input name="country" value={apptForm.country} onChange={handleAppt} required placeholder="Country" className={styles.input} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Pincode / Zip <span className={styles.req}>*</span></label>
                                    <input name="pincode" value={apptForm.pincode} onChange={(e) => setApptForm(f => ({ ...f, pincode: e.target.value.replace(/[^0-9a-zA-Z\s]/g, '') }))} required placeholder="e.g. EC1A 1BB" className={styles.input} />
                                </div>
                            </div>

                            {/* Appointment type selector */}
                            <div className={styles.field}>
                                <label className={styles.label}>Appointment Type <span className={styles.req}>*</span></label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '6px' }}>
                                    {[
                                        { value: 'office_visit', label: 'Private Atelier', icon: '🏢', desc: 'Visit our sanctuary' },
                                        { value: 'google_meet', label: 'Virtual Viewing', icon: '📹', desc: 'Secure video link' },
                                        { value: 'whatsapp', label: 'Priority Chat', icon: '💬', desc: 'Direct artisan access' },
                                    ].map(opt => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setApptForm(f => ({ ...f, type: opt.value as any }))}
                                            style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                                padding: '16px 8px', borderRadius: '10px', cursor: 'pointer',
                                                border: apptForm.type === opt.value ? '2px solid #8B5C52' : '1.5px solid #e0dcd7',
                                                background: apptForm.type === opt.value ? '#faf5f2' : '#fff',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <span style={{ fontSize: '24px' }}>{opt.icon}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#2c2622' }}>{opt.label}</span>
                                            <span style={{ fontSize: '11px', color: '#9a9590' }}>{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field} style={{ position: 'relative' }}>
                                    <label className={styles.label}>Date <span className={styles.req}>*</span></label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={apptForm.date}
                                        onClick={() => { setShowDatePicker(!showDatePicker); setShowTimePicker(false); }}
                                        placeholder="Select a Date"
                                        required
                                        className={styles.input}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {showDatePicker && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
                                            <div className={styles.pickerOverlayBox}>
                                                <CustomDatePicker
                                                    value={apptForm.date}
                                                    onChange={(val) => {
                                                        setApptForm(f => ({ ...f, date: val }));
                                                        setShowDatePicker(false);
                                                    }}
                                                    minDate={new Date().toLocaleDateString('en-CA')}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.field} style={{ position: 'relative' }}>
                                    <label className={styles.label}>Time (10am - 7pm) <span className={styles.req}>*</span></label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={apptForm.time}
                                        onClick={() => { setShowTimePicker(!showTimePicker); setShowDatePicker(false); }}
                                        placeholder="Select a Time"
                                        required
                                        className={styles.input}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {showTimePicker && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: -180, zIndex: 10 }}>
                                            <div className={styles.pickerOverlayBox}>
                                                <CustomTimePicker
                                                    value={apptForm.time}
                                                    onChange={(val) => {
                                                        setApptForm(f => ({ ...f, time: val }));
                                                        setShowTimePicker(false);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>Message / Details <span className={styles.req}>*</span></label>
                                <textarea name="message" value={apptForm.message} onChange={handleAppt} required rows={4} placeholder="Let us know what you would like to discuss…" className={styles.textarea} />
                            </div>

                            {submitError && <div style={{ color: 'red', fontSize: '0.875rem', marginBottom: '16px' }}>{submitError}</div>}

                            <div className={styles.formFooter}>
                                <button type="submit" disabled={submitting} className={styles.submitBtn}>
                                    {submitting ? 'Booking...' : 'Book Appointment'}
                                </button>
                                <p className={styles.privacy}>
                                    By submitting you agree to our{' '}
                                    <Link href="/privacy" className={styles.privacyLink}>Privacy Policy</Link>.
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
