'use client';

import { useState, useEffect } from 'react';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';
import cardStyles from '@/components/ui/ProductCard.module.css';

interface BespokeWork {
    _id: string;
    name: string;
    image: string;
    tall: boolean;
    order: number;
    isActive: boolean;
    type?: 'commission' | 'ai_concept';
}

import { useRouter } from 'next/navigation';
import { useAIStudio } from '@/context/AIStudioContext';

export default function ClientBespokeGallery() {
    const router = useRouter();
    const { setGalleryReference } = useAIStudio();

    const [works, setWorks] = useState<BespokeWork[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'commission' | 'ai_concept'>('all');

    useEffect(() => {
        bespokeApi.list(true) // only active
            .then(res => setWorks((res.data as BespokeWork[]) || []))
            .catch(() => setWorks([]))
            .finally(() => setLoading(false));
    }, []);

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
                <p>New portfolio pieces arriving soon.</p>
            </div>
        );
    }

    const filteredWorks = filter === 'all' ? works : works.filter(w => (w.type || 'commission') === filter);

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
                    All Works
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'commission' ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter('commission')}
                >
                    Past Commissions
                </button>
                <button
                    className={`${styles.filterBtn} ${filter === 'ai_concept' ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilter('ai_concept')}
                >
                    Community Concepts
                </button>
            </div>

            <div className={styles.masonry}>
                {filteredWorks.map((w: BespokeWork) => (
                    <div
                        key={w._id}
                        className={cardStyles.card}
                        onClick={() => handleInquiryClick(w)}
                    >
                        <div className={cardStyles.image}>
                            <img
                                src={w.image}
                                alt={w.name}
                                className={cardStyles.imgMain}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className={cardStyles.info}>
                            <span className={cardStyles.category}>{w.type === 'ai_concept' ? 'AI Concept' : 'Commission'}</span>
                            <div className={cardStyles.name}>{w.name}</div>
                            <span className={cardStyles.price} style={{ textDecoration: 'underline', opacity: 0.8 }}>POA - Inquire</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
