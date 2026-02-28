'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { reviewsApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

function Stars({ rating }: { rating: number }) {
    return (
        <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`${styles.star} ${i <= rating ? styles.starFilled : ''}`}>★</span>
            ))}
        </div>
    );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div style={{ display: 'flex', gap: '4px', fontSize: '2rem', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span
                    key={i}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(i)}
                    style={{ color: i <= (hover || value) ? '#C9A96E' : '#d9d4cd', transition: 'color 0.15s' }}
                    aria-label={`${i} star`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const { user } = useAuth();
    const writeRef = useRef<HTMLElement>(null);
    const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');
    const [reviews, setReviews] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ average: 0, total: 0, breakdown: [] });
    const [loading, setLoading] = useState(true);

    // Write a review form state
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [reviewImages, setReviewImages] = useState<File[]>([]);   // selected local files
    const [reviewPreviews, setReviewPreviews] = useState<string[]>([]);  // object URLs for thumbnails
    const [reviewErr, setReviewErr] = useState('');
    const [reviewOk, setReviewOk] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const imgInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLoading(true);
        reviewsApi
            .list({ page: 1, limit: 50, sort: sortBy === 'recent' ? 'recent' : 'top' })
            .then((res: any) => {
                const d = res.data ?? {};
                setReviews(d.reviews ?? []);
                setStats(d.stats ?? { average: 0, total: 0, breakdown: [] });
            })
            .catch(() => {
                setReviews([]);
            })
            .finally(() => setLoading(false));
    }, [sortBy]);

    const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []).slice(0, 4 - reviewImages.length);
        if (!files.length) return;
        setReviewImages(prev => [...prev, ...files].slice(0, 4));
        setReviewPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))].slice(0, 4));
    };

    const removeImage = (idx: number) => {
        setReviewImages(prev => prev.filter((_, i) => i !== idx));
        setReviewPreviews(prev => {
            URL.revokeObjectURL(prev[idx]);
            return prev.filter((_, i) => i !== idx);
        });
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setReviewErr('');
        if (reviewRating === 0) { setReviewErr('Please select a star rating.'); return; }
        if (!reviewTitle.trim()) { setReviewErr('Please add a review title.'); return; }
        if (!reviewBody.trim()) { setReviewErr('Please write your review.'); return; }
        setReviewLoading(true);
        try {
            // Upload images to Cloudinary first
            const uploadedUrls: string[] = [];
            for (const file of reviewImages) {
                try {
                    const url = await reviewsApi.uploadImage(file);
                    uploadedUrls.push(url);
                } catch {
                    // Image upload failed — continue without it
                }
            }
            await reviewsApi.submit({
                rating: reviewRating,
                title: reviewTitle.trim(),
                body: reviewBody.trim(),
                images: uploadedUrls,
            });
            setReviewOk(true);
            setReviewRating(0); setReviewTitle(''); setReviewBody('');
            setReviewImages([]); setReviewPreviews([]);
        } catch (err: any) {
            setReviewErr(err.message || 'Failed to submit review. Please try again.');
        } finally {
            setReviewLoading(false);
        }
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });


    return (
        <>
            {/* Hero */}
            <section className={styles.hero} style={{ paddingTop: 'var(--nav-height)' }}>
                <span className={styles.heroBrow}>Customer Reviews</span>
                <h1 className={styles.heroH1}>{stats.average ? stats.average.toFixed(2) : '—'} out of 5</h1>
                <Stars rating={5} />
                <p className={styles.heroSub}>Based on {stats.total.toLocaleString()} verified reviews</p>
            </section>

            {/* Stats */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {[
                        { label: 'Average Rating', value: stats.average ? stats.average.toFixed(2) : '—', unit: '/ 5' },
                        { label: 'Total Reviews', value: stats.total.toLocaleString(), unit: '' },
                        { label: 'Would Recommend', value: `${stats.wouldRecommendPercent ?? 98}%`, unit: '' },
                        { label: 'Verified Purchases', value: `${stats.verifiedPercent ?? 100}%`, unit: '' },
                    ].map(s => (
                        <div key={s.label} className={styles.statCard}>
                            <span className={styles.statValue}>{s.value}<span className={styles.statUnit}>{s.unit}</span></span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Rating breakdown */}
                {stats.breakdown?.length > 0 && (
                    <div className={styles.breakdown}>
                        {stats.breakdown.map((b: any) => (
                            <div key={b.stars} className={styles.breakdownRow}>
                                <span className={styles.breakdownStars}>{b.stars}★</span>
                                <div className={styles.breakdownBar}>
                                    <div className={styles.breakdownFill} style={{ width: `${b.percentage ?? b.pct ?? 0}%` }} />
                                </div>
                                <span className={styles.breakdownPct}>{b.percentage ?? b.pct ?? 0}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Reviews grid */}
            <section className={styles.reviewsSection}>
                <div className={styles.reviewsHeader}>
                    <h2 className={styles.reviewsH2}>What our customers say</h2>
                    <div className={styles.sortRow}>
                        <span className={styles.sortLabel}>Sort by:</span>
                        {(['recent', 'top'] as const).map(s => (
                            <button
                                key={s}
                                className={`${styles.sortBtn} ${sortBy === s ? styles.sortBtnActive : ''}`}
                                onClick={() => setSortBy(s)}
                            >
                                {s === 'recent' ? 'Most Recent' : 'Highest Rated'}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>Loading reviews…</p>
                ) : reviews.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>No reviews yet.</p>
                ) : (
                    <div className={styles.grid}>
                        {reviews.map((review: any) => (
                            <div key={review._id} className={styles.reviewCard}>
                                <div className={styles.reviewTop}>
                                    <div className={styles.avatar}>{review.user?.name?.[0] ?? '?'}</div>
                                    <div>
                                        <span className={styles.reviewName}>{review.user?.name}</span>
                                        <span className={styles.reviewLocation}>{review.user?.location}</span>
                                    </div>
                                    {review.verified && <span className={styles.verifiedBadge}>✓ Verified</span>}
                                </div>
                                <Stars rating={review.rating} />
                                <p className={styles.reviewProduct}>{review.product?.name}</p>
                                <p className={styles.reviewTitle}>{review.title}</p>
                                <p className={styles.reviewBody}>{review.body}</p>
                                <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Write a Review */}
            <section id="write" ref={writeRef} className={styles.cta} style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
                <h2 className={styles.ctaH2} style={{ marginBottom: '2rem' }}>Share Your Experience</h2>

                {!user ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--stone)', marginBottom: '1.5rem' }}>Please sign in to leave a review.</p>
                        <Link href="/login" className={styles.ctaBtn}>Sign In to Review</Link>
                    </div>
                ) : reviewOk ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</p>
                        <p style={{ color: 'var(--charcoal)', fontWeight: 500 }}>Thank you — your review has been submitted for approval.</p>
                    </div>
                ) : (
                    <form onSubmit={submitReview} style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                        {reviewErr && <p style={{ color: '#c0392b', fontSize: '0.875rem' }}>{reviewErr}</p>}

                        <div>
                            <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--charcoal)', marginBottom: '8px', fontFamily: 'var(--font-sc)' }}>Your Rating *</label>
                            <StarPicker value={reviewRating} onChange={setReviewRating} />
                        </div>

                        <div>
                            <label htmlFor="rtitle" style={{ display: 'block', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--charcoal)', marginBottom: '8px', fontFamily: 'var(--font-sc)' }}>Review Title *</label>
                            <input
                                id="rtitle"
                                type="text"
                                maxLength={100}
                                value={reviewTitle}
                                onChange={e => setReviewTitle(e.target.value)}
                                placeholder="Summarise your experience…"
                                required
                                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', background: 'var(--cream)', fontSize: '15px', fontFamily: 'var(--font-body)', color: 'var(--charcoal)', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label htmlFor="rbody" style={{ display: 'block', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--charcoal)', marginBottom: '8px', fontFamily: 'var(--font-sc)' }}>Your Review *</label>
                            <textarea
                                id="rbody"
                                rows={5}
                                maxLength={1000}
                                value={reviewBody}
                                onChange={e => setReviewBody(e.target.value)}
                                required
                                placeholder="Tell us about your experience with Riolls Jewels…"
                                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', background: 'var(--cream)', fontSize: '15px', fontFamily: 'var(--font-body)', color: 'var(--charcoal)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{reviewBody.length}/1000</span>
                        </div>

                        {/* Image upload */}
                        <div>
                            <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--charcoal)', marginBottom: '8px', fontFamily: 'var(--font-sc)' }}>
                                Photos <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--stone)' }}>(optional, up to 4)</span>
                            </label>

                            {/* Thumbnails */}
                            {reviewPreviews.length > 0 && (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                    {reviewPreviews.map((src, idx) => (
                                        <div key={idx} style={{ position: 'relative', width: '72px', height: '72px' }}>
                                            <img
                                                src={src}
                                                alt={`Preview ${idx + 1}`}
                                                style={{ width: '72px', height: '72px', objectFit: 'cover', border: '1px solid var(--border)' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                aria-label="Remove image"
                                                style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--charcoal)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: '11px', lineHeight: '18px', textAlign: 'center', padding: 0 }}
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add photos button */}
                            {reviewImages.length < 4 && (
                                <>
                                    <input
                                        ref={imgInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleImagePick}
                                        id="review-images"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => imgInputRef.current?.click()}
                                        style={{ padding: '10px 20px', border: '1px dashed var(--border)', background: 'var(--cream)', color: 'var(--stone)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-sc)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <span style={{ fontSize: '18px' }}>+</span> Add Photos
                                    </button>
                                </>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={reviewLoading}
                            style={{ padding: '16px 32px', background: 'var(--charcoal)', color: 'var(--white)', border: 'none', cursor: reviewLoading ? 'not-allowed' : 'pointer', fontSize: '11px', letterSpacing: '0.2em', fontFamily: 'var(--font-sc)', opacity: reviewLoading ? 0.7 : 1, transition: 'background 0.2s', alignSelf: 'flex-start' }}
                        >
                            {reviewLoading ? 'Submitting…' : 'Submit Review'}
                        </button>
                    </form>
                )}
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2 className={styles.ctaH2}>Ready to start your story?</h2>
                <div className={styles.ctaRow}>
                    <Link href="/shop" className={styles.ctaBtn}>Explore the Collection</Link>
                    <Link href="/bespoke" className={styles.ctaGhost}>Commission Bespoke</Link>
                </div>
            </section>
        </>
    );
}
