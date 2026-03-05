'use client';

import { useState, useEffect } from 'react';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';
import cardStyles from '@/components/ui/ProductCard.module.css';
import ProtectedImage from '@/components/ui/ProtectedImage';

interface BespokeWork {
    _id: string;
    name: string;
    image: string;
    tall: boolean;
    order: number;
    isActive: boolean;
    type?: 'commission' | 'ai_concept';
    category?: string;
}

import { useRouter } from 'next/navigation';
import { useAIStudio } from '@/context/AIStudioContext';

const LIMIT = 8;

export default function ClientBespokeGallery() {
    const router = useRouter();
    const { setGalleryReference } = useAIStudio();

    const [works, setWorks] = useState<BespokeWork[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [filter, setFilter] = useState<'all' | 'commission' | 'ai_concept'>('all');
    const [catFilter, setCatFilter] = useState('all');

    useEffect(() => {
        setLoading(true);
        bespokeApi.list(true, LIMIT, 0)
            .then(res => {
                const data = res.data as any;
                const items = Array.isArray(data) ? data : (data?.items ?? []);
                setWorks(items);
                setHasMore(data?.has_more ?? false);
                setOffset(LIMIT);
            })
            .catch(() => setWorks([]))
            .finally(() => setLoading(false));
    }, []);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            const res = await bespokeApi.list(true, LIMIT, offset);
            const data = res.data as any;
            const items = Array.isArray(data) ? data : (data?.items ?? []);
            setWorks(prev => [...prev, ...items]);
            setHasMore(data?.has_more ?? false);
            setOffset(prev => prev + LIMIT);
        } catch {
            // silently fail
        } finally {
            setLoadingMore(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--stone)' }}>
                Loading gallery...
            </div>
        );
    }

    if (works.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--stone)' }}>
                <p>An exclusive collection is currently being curated.</p>
            </div>
        );
    }

    const typeFiltered = filter === 'all' ? works : works.filter(w => w.type === filter);
    const filteredWorks = catFilter === 'all'
        ? typeFiltered
        : typeFiltered.filter(w => (w.category || '').toLowerCase() === catFilter.toLowerCase());

    const availableCategories = Array.from(new Set(typeFiltered.map(w => w.category).filter(Boolean)));

    const handleInquiryClick = (piece: BespokeWork) => {
        setGalleryReference({
            name: piece.name,
            image: piece.image,
            type: piece.type || 'commission'
        });
        router.push('/ai-studio/step-5');
    };

    return (
        <div>
            {/* Filters */}
            <div className={styles.galleryFilters}>
                <button
                    className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Complete Archives
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'commission' ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter('commission')}
                >
                    Private Commissions
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'ai_concept' ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter('ai_concept')}
                >
                    Conceptual Visions
                </button>
            </div>

            {/* Category Filters */}
            {availableCategories.length > 0 && (
                <div className={styles.galleryFilters} style={{ marginTop: '16px' }}>
                    <button
                        className={`${styles.filterBtn} ${catFilter === 'all' ? styles.filterBtnActive : ''}`}
                        onClick={() => setCatFilter('all')}
                    >
                        All Categories
                    </button>
                    {availableCategories.map((cat: any) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${catFilter === cat ? styles.filterBtnActive : ''}`}
                            onClick={() => setCatFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.masonry}>
                {filteredWorks.map((w: BespokeWork) => (
                    <div
                        key={w._id}
                        className={`${cardStyles.card} ${styles.masonryCard}`}
                        onClick={() => handleInquiryClick(w)}
                    >
                        <div className={`${cardStyles.image} ${styles.masonryImg}`} style={{ position: 'relative' }}>
                            <ProtectedImage
                                src={w.image}
                                alt={w.name}
                                className={cardStyles.imgMain}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className={`${cardStyles.info} ${styles.masonryInfo}`}>
                            <span className={cardStyles.category}>{w.type === 'ai_concept' ? 'Intelligent Vision' : 'Private Commission'}</span>
                            <div className={cardStyles.name}>{w.name}</div>
                            <span className={cardStyles.price} style={{ textDecoration: 'underline', opacity: 0.8 }}>Price Upon Request</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '48px', marginBottom: '16px' }}>
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        style={{
                            display: 'inline-block',
                            padding: '14px 48px',
                            background: 'transparent',
                            border: '1px solid var(--charcoal)',
                            color: 'var(--charcoal)',
                            fontFamily: 'var(--font-sc)',
                            fontSize: '11px',
                            letterSpacing: '0.22em',
                            cursor: loadingMore ? 'not-allowed' : 'pointer',
                            opacity: loadingMore ? 0.5 : 1,
                            transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => { if (!loadingMore) (e.target as HTMLElement).style.background = 'var(--charcoal)'; (e.target as HTMLElement).style.color = 'var(--white)'; }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = 'var(--charcoal)'; }}
                    >
                        {loadingMore ? 'Loading...' : 'See More'}
                    </button>
                </div>
            )}
        </div>
    );
}


