'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './step.module.css';

export default function AIStep5() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '', contact: 'Email' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.page}>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '100%' }} /></div>
                <div className={styles.successWrap}>
                    <div className={styles.checkCircle}>
                        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="var(--deep)" strokeWidth="2.5">
                            <polyline points="2,11 10,19 26,3" />
                        </svg>
                    </div>
                    <h2 className={styles.successH2}>Your request has been received.</h2>
                    <p className={styles.successBody}>
                        Our concierge team will contact you within 48 hours with a personalised quote
                        and introduce you to your dedicated goldsmith.
                    </p>
                    <Link href="/shop" className={styles.continueBtn}>Continue Exploring →</Link>
                    <Link href="/" className={styles.returnLink}>Return to Homepage</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '100%' }} /></div>

            <div className={styles.twoCol}>
                {/* Design Summary */}
                <div className={styles.preview}>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Your Design</span>
                        <div className={styles.summaryImg} style={{ background: 'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)' }} />
                        {[
                            ['Piece', 'Ring'],
                            ['Metal', '18k Yellow Gold'],
                            ['Stone', '1.50ct Brilliant Diamond'],
                            ['Setting', 'Vintage Milgrain'],
                            ['Finish', 'High Polish'],
                        ].map(([k, v]) => (
                            <div key={k} className={styles.specRow}>
                                <span className={styles.specKey}>{k}</span>
                                <span className={styles.specVal}>{v}</span>
                            </div>
                        ))}
                        <div className={styles.priceEstimate}>
                            <span className={styles.priceLabel}>Estimated Range</span>
                            <span className={styles.priceValue}>£ 4,200 – £ 5,800</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className={styles.builder}>
                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>Step 5 of 5</span>
                        <h2 className={styles.builderH2}>Request your quote.</h2>
                        <p className={styles.builderBody}>Our concierge team responds within 48 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {[
                            { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Sarah Williams' },
                            { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'sarah@email.com' },
                            { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+44 ...' },
                        ].map(f => (
                            <div key={f.id} className={styles.formField}>
                                <label className={styles.formLabel}>{f.label}</label>
                                <input
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    className={styles.formInput}
                                    value={(form as Record<string, string>)[f.id]}
                                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                                    required={f.label.includes('*')}
                                />
                            </div>
                        ))}

                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Preferred Contact</label>
                            <div className={styles.contactBtns}>
                                {['Email', 'Phone', 'WhatsApp'].map(c => (
                                    <button
                                        key={c} type="button"
                                        className={`${styles.contactBtn} ${form.contact === c ? styles.contactBtnActive : ''}`}
                                        onClick={() => setForm(p => ({ ...p, contact: c }))}
                                    >{c}</button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Additional Notes</label>
                            <textarea
                                className={styles.formTextarea}
                                rows={3}
                                placeholder="Any other inspirations, questions, or details…"
                                value={form.notes}
                                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>Send My Quote Request →</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
