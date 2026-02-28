'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './step.module.css';
import { useAIStudio } from '@/context/AIStudioContext';
import { useAuth } from '@/context/AuthContext';
import { COUNTRIES } from '@/utils/countries';

export default function AIStep5() {
    const router = useRouter();
    const { state, submitQuote } = useAIStudio();
    const { user } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        countryCode: '+91',
        notes: '',
        preferredContact: 'Email'
    });

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Pre-fill user info if logged in
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: prev.name || `${user.firstName} ${user.lastName}`.trim(),
                email: prev.email || user.email,
            }));
        }
    }, [user]);

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

    const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
        setForm(p => ({
            ...p,
            countryCode: c.code,
            country: p.country || c.name // Auto-fill country if empty
        }));
        setDropdownOpen(false);
    };

    const currentCountry = COUNTRIES.find(c => c.code === form.countryCode) || { flag: '🌐', code: form.countryCode };

    if (submitted) {
        return (
            <div className={styles.page}>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '100%' }} /></div>
                <div className={styles.successWrap}>
                    <div className={styles.checkCircle}>
                        {/* Checkmark icon could go here */}
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
                                <span className={styles.specKey}>Name</span>
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
                            {(() => {
                                const g = (key: string) => {
                                    const v = state.profile[key];
                                    return Array.isArray(v) ? v[0] : v;
                                };
                                const pt = g('pieceType') || 'Ring';

                                if (pt === 'Hip Hop / Iced Out') {
                                    const hipHopSpecs: [string, string][] = [
                                        ['Piece', g('hipHopStyle') || pt || 'Hip Hop Piece'],
                                        ...(g('chainStyle') ? [['Chain Style', g('chainStyle')] as [string, string]] : []),
                                        ['Ice Level', state.customisations.iceLevel || g('iceLevel') || '—'],
                                        ...(g('pendantType') ? [['Pendant', g('pendantType')] as [string, string]] : []),
                                        ...(g('grillz') ? [['Grillz', g('grillz')] as [string, string]] : []),
                                        ...(g('ringStyle') ? [['Ring Style', g('ringStyle')] as [string, string]] : []),
                                        ['Metal', state.customisations.finalMetal || g('metalColor') || '—'],
                                        ...(state.customisations.chainWeight ? [['Weight', state.customisations.chainWeight] as [string, string]] : []),
                                        ...(state.customisations.chainLength ? [['Length', state.customisations.chainLength] as [string, string]] : []),
                                        ['Finish', state.customisations.finish || '—'],
                                        ...(state.customisations.engraving ? [['Inscription', state.customisations.engraving] as [string, string]] : []),
                                        ...(g('budget') ? [['Budget', g('budget')] as [string, string]] : []),
                                    ];
                                    return hipHopSpecs.map(([k, v]) => (
                                        <div key={k} className={styles.specRow}>
                                            <span className={styles.specKey}>{k}</span>
                                            <span className={styles.specVal}>{v}</span>
                                        </div>
                                    ));
                                }

                                // Build dynamic specs for Standard types
                                const specs: [string, string][] = [['Piece', pt]];

                                if (pt === 'Necklace') {
                                    if (g('necklaceOccasion')) specs.push(['Occasion', g('necklaceOccasion')]);
                                    if (g('necklaceStyle')) specs.push(['Style', g('necklaceStyle')]);
                                    if (g('primaryStone') && g('primaryStone') !== 'Solid High-Polish Metal') specs.push(['Primary Stone', g('primaryStone')]);
                                    if (g('stoneShape')) specs.push(['Stone Cut', g('stoneShape')]);
                                    if (g('settingProfile')) specs.push(['Setting Profile', g('settingProfile')]);
                                    if (g('chainStyle')) specs.push(['Chain', g('chainStyle')]);
                                    if (g('pendantType')) specs.push(['Pendant', g('pendantType')]);
                                    if (g('scale')) specs.push(['Length', g('scale')]);
                                } else if (pt === 'Earrings') {
                                    if (g('earringOccasion')) specs.push(['Occasion', g('earringOccasion')]);
                                    if (g('earringStyle')) specs.push(['Style', g('earringStyle')]);
                                    if (g('format')) specs.push(['Format', g('format')]);
                                    if (g('primaryStone') && g('primaryStone') !== 'Solid High-Polish Metal' && g('primaryStone') !== 'Solid High-Polish Gold') specs.push(['Primary Stone', g('primaryStone')]);
                                    if (g('stoneShape')) specs.push(['Stone Cut', g('stoneShape')]);
                                    if (g('settingProfile')) specs.push(['Setting Profile', g('settingProfile')]);
                                    if (g('scale')) specs.push(['Size', g('scale')]);
                                } else if (pt === 'Bracelet') {
                                    if (g('braceletOccasion')) specs.push(['Occasion', g('braceletOccasion')]);
                                    if (g('braceletStyle')) specs.push(['Style', g('braceletStyle')]);
                                    if (g('primaryStone') && g('primaryStone') !== 'Solid High-Polish Metal') specs.push(['Primary Stone', g('primaryStone')]);
                                    if (g('stoneShape')) specs.push(['Stone Cut', g('stoneShape')]);
                                    if (g('bandStyle')) specs.push(['Detail', g('bandStyle')]);
                                    if (g('scale')) specs.push(['Fit', g('scale')]);
                                } else { // Ring 
                                    const occasion = g('ringOccasion') || 'Engagement';
                                    specs.push(['Occasion', occasion]);

                                    if (g('ringStyle')) specs.push(['Style', g('ringStyle')]);

                                    const isPlainBand = g('ringStyle') === 'Classic Solid Band' || g('ringStyle')?.includes('Signet') || g('ringStyle') === 'Bold Cigar Band';

                                    if (!isPlainBand && g('primaryStone') && g('primaryStone') !== 'Solid High-Polish Metal') {
                                        specs.push(['Primary Stone', g('primaryStone')]);
                                        if (g('stoneShape')) specs.push(['Stone Cut', g('stoneShape')]);
                                        if (state.customisations.stoneSize) specs.push(['Stone Size', `${state.customisations.stoneSize}ct`]);
                                        if (g('settingProfile')) specs.push(['Setting Profile', g('settingProfile')]);
                                    }

                                    if (g('bandStyle')) specs.push(['Band Style', g('bandStyle')]);
                                    if (g('scale')) specs.push(['Band Thickness', g('scale')]);
                                }

                                // Common to all standard
                                specs.push(['Metal', state.customisations.finalMetal || g('metalColor') || '—']);
                                specs.push(['Finish', state.customisations.finish || '—']);
                                if (g('style')) specs.push(['Aesthetic', g('style')]);
                                if (state.customisations.engraving) specs.push(['Engraving', state.customisations.engraving]);
                                if (g('budget')) specs.push(['Budget', g('budget')]);

                                return specs.map(([k, v]) => (
                                    <div key={k} className={styles.specRow}>
                                        <span className={styles.specKey}>{k}</span>
                                        <span className={styles.specVal}>{v}</span>
                                    </div>
                                ));
                            })()}
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
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Full Name *</label>
                            <input
                                type="text"
                                placeholder="Sarah Williams"
                                className={styles.formInput}
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                required
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Email Address *</label>
                            <input
                                type="email"
                                placeholder="sarah@email.com"
                                className={styles.formInput}
                                value={form.email}
                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                required
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Country *</label>
                            <input
                                type="text"
                                placeholder="United Kingdom"
                                className={styles.formInput}
                                value={form.country}
                                onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                                required
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel}>Phone Number</label>
                            <div className={styles.phoneInputGroup}>
                                <div className={styles.countryCodePrefix} onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownRef}>
                                    <span className={styles.flag}>{currentCountry.flag}</span>
                                    <span>{currentCountry.code}</span>
                                    <span style={{ fontSize: '10px', marginLeft: '4px' }}>▼</span>

                                    {dropdownOpen && (
                                        <div className={styles.countryDropdown}>
                                            {COUNTRIES.map((c, idx) => (
                                                <div key={idx} className={styles.countryOption} onClick={() => handleCountrySelect(c)}>
                                                    <span className={styles.countryOptionFlag}>{c.flag}</span>
                                                    <span className={styles.countryOptionName}>{c.name}</span>
                                                    <span className={styles.countryOptionCode}>{c.code}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    className={styles.phoneInput}
                                    value={form.phone}
                                    onChange={(e) => setForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9+\s-]/g, '') }))}
                                />
                            </div>
                        </div>

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
