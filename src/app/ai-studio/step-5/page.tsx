'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';

export default function AIStep5() {
    const router = useRouter();
    const { state, submitQuote } = useAIStudio();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '', preferredContact: 'Email' });

    const selectedConcept = state.selectedConceptIndex !== null ? state.generatedConcepts[state.selectedConceptIndex] : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        const success = await submitQuote(form);
        if (success) {
            setSubmitted(true);
        } else {
            setErrorMsg('Failed to submit quote. Please try again.');
        }
        setIsSubmitting(false);
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
                    {state.galleryReference ? (
                        <div className={styles.summaryCard}>
                            <span className={styles.summaryLabel}>Gallery Inquiry</span>
                            <div
                                className={styles.summaryImg}
                                style={{
                                    background: `url(${state.galleryReference.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                            <div className={styles.specRow}>
                                <span className={styles.specKey}>Piece</span>
                                <span className={styles.specVal}>{state.galleryReference.name}</span>
                            </div>
                            <div className={styles.specRow}>
                                <span className={styles.specKey}>Type</span>
                                <span className={styles.specVal}>{state.galleryReference.type === 'ai_concept' ? 'Community AI Concept' : 'Past Commission'}</span>
                            </div>
                            <div className={styles.priceEstimate} style={{ marginTop: '24px' }}>
                                <span className={styles.priceLabel}>Inquire</span>
                                <span className={styles.priceValue} style={{ fontSize: '14px', lineHeight: 1.5 }}>
                                    Submit your details to discuss creating a custom piece inspired by this design.
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.summaryCard}>
                            <span className={styles.summaryLabel}>Your Design</span>
                            <div
                                className={styles.summaryImg}
                                style={{
                                    background: selectedConcept?.image_data ? `url(${selectedConcept.image_data})` : 'radial-gradient(ellipse at 45%,#3d2b14,#1a1208)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                            {[
                                ['Piece', state.profile.pieceType || 'Ring'],
                                ['Metal', state.customisations.finalMetal || '18k Yellow Gold'],
                                ['Stone', `${state.customisations.stoneSize || '1.50'}ct ${state.customisations.stoneCut || 'Brilliant'} Diamond`],
                                ['Setting', state.profile.setting || 'Classic'],
                                ['Finish', state.customisations.finish || 'High Polish'],
                            ].map(([k, v]) => (
                                <div key={k} className={styles.specRow}>
                                    <span className={styles.specKey}>{k}</span>
                                    <span className={styles.specVal}>{v}</span>
                                </div>
                            ))}
                            <div className={styles.priceEstimate}>
                                <span className={styles.priceLabel}>Estimated Range</span>
                                <span className={styles.priceValue}>
                                    {state.customisations.estimatedPriceLow ? `£ ${state.customisations.estimatedPriceLow.toLocaleString()}` : ''}
                                    {state.customisations.estimatedPriceHigh ? ` – £ ${state.customisations.estimatedPriceHigh.toLocaleString()}` : ''}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form */}
                <div className={styles.builder}>
                    {state.galleryReference ? (
                        <button type="button" onClick={() => router.push('/bespoke')} className={styles.backBtn}>
                            ← Back to Gallery
                        </button>
                    ) : (
                        <button type="button" onClick={() => router.push('/ai-studio/step-4')} className={styles.backBtn}>
                            ← Back
                        </button>
                    )}

                    <div className={styles.builderHeader}>
                        <span className={styles.builderEyebrow}>{state.galleryReference ? 'Book Consultation' : 'Step 5 of 5'}</span>
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
                                        className={`${styles.contactBtn} ${form.preferredContact === c ? styles.contactBtnActive : ''}`}
                                        onClick={() => setForm(p => ({ ...p, preferredContact: c }))}
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
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                            />
                        </div>

                        {errorMsg && <p style={{ color: 'var(--alert)', marginBottom: '1rem', fontSize: '0.9rem' }}>{errorMsg}</p>}
                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send My Quote Request →'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
