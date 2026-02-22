'use client';

import Link from 'next/link';
import { useState } from 'react';
import { REVIEWS, STATS } from '@/lib/reviews';
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

export default function ReviewsPage() {
    const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');

    const sorted = [...REVIEWS].sort((a, b) =>
        sortBy === 'top' ? b.rating - a.rating : 0
    );

    return (
        <>
            {/* Hero */}
            <section className={styles.hero} style={{ paddingTop: 'var(--nav-height)' }}>
                <span className={styles.heroBrow}>Customer Reviews</span>
                <h1 className={styles.heroH1}>{STATS.average.toFixed(2)} out of 5</h1>
                <Stars rating={5} />
                <p className={styles.heroSub}>Based on {STATS.total.toLocaleString()} verified reviews</p>
            </section>

            {/* Stats */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {[
                        { label: 'Average Rating', value: STATS.average.toFixed(2), unit: '/ 5' },
                        { label: 'Total Reviews', value: STATS.total.toLocaleString(), unit: '' },
                        { label: 'Would Recommend', value: '98%', unit: '' },
                        { label: 'Verified Purchases', value: '100%', unit: '' },
                    ].map(s => (
                        <div key={s.label} className={styles.statCard}>
                            <span className={styles.statValue}>{s.value}<span className={styles.statUnit}>{s.unit}</span></span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Rating breakdown */}
                <div className={styles.breakdown}>
                    {STATS.breakdown.map(b => (
                        <div key={b.stars} className={styles.breakdownRow}>
                            <span className={styles.breakdownStars}>{b.stars}★</span>
                            <div className={styles.breakdownBar}>
                                <div className={styles.breakdownFill} style={{ width: `${b.pct}%` }} />
                            </div>
                            <span className={styles.breakdownPct}>{b.pct}%</span>
                        </div>
                    ))}
                </div>
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

                <div className={styles.grid}>
                    {sorted.map(review => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewTop}>
                                <div className={styles.avatar}>{review.name[0]}</div>
                                <div>
                                    <span className={styles.reviewName}>{review.name}</span>
                                    <span className={styles.reviewLocation}>{review.location}</span>
                                </div>
                                {review.verified && <span className={styles.verifiedBadge}>✓ Verified</span>}
                            </div>
                            <Stars rating={review.rating} />
                            <p className={styles.reviewProduct}>{review.product}</p>
                            <p className={styles.reviewTitle}>{review.title}</p>
                            <p className={styles.reviewBody}>{review.body}</p>
                            <span className={styles.reviewDate}>{review.date}</span>
                        </div>
                    ))}
                </div>
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
