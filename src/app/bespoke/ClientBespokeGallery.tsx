'use client';

import { useState, useEffect } from 'react';
import { bespokeApi } from '@/lib/api';
import styles from './page.module.css';

interface BespokeWork {
    _id: string;
    name: string;
    image: string;
    tall: boolean;
    order: number;
    isActive: boolean;
}

export default function ClientBespokeGallery() {
    const [works, setWorks] = useState<BespokeWork[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className={styles.masonry}>
            {works.map((w: BespokeWork) => (
                <div
                    key={w._id}
                    className={`${styles.masonryItem} ${w.tall ? styles.masonryTall : ''}`}
                    style={{ background: `url(${w.image}) center/cover` }}
                >
                    <div className={styles.masonryOverlay}>
                        <span className={styles.masonryCaption}>{w.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
