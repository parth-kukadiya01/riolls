'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getProductBySlug, PRODUCTS } from '@/lib/products';
import { productsApi } from '@/lib/api';
import PDPClient from './PDPClient';

export default function ProductPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [status, setStatus] = useState<'loading' | 'found' | 'notfound'>('loading');

    useEffect(() => {
        if (!slug) return;

        // 1. Try static data first (instant)
        const staticProduct = getProductBySlug(slug);
        if (staticProduct) {
            setProduct(staticProduct);
            setStatus('found');
            return;
        }

        // 2. Fetch from backend API (for products added via admin panel)
        productsApi
            .getBySlug(slug)
            .then((res: any) => {
                const p = res.data;
                if (!p) { setStatus('notfound'); return; }

                // Map API shape → Product shape that PDPClient expects
                setProduct({
                    id: p._id,
                    _id: p._id,
                    slug: p.slug,
                    name: p.name,
                    category: p.category?.slug ?? p.category ?? '',
                    price: p.price,
                    metal: p.metal ?? '',
                    stone: p.stone ?? '',
                    badge: p.badge,
                    description: p.description ?? '',
                    stone_detail: p.stoneDetail ?? '',
                    gradient: 'linear-gradient(145deg,#ddd5c4,#c8bba8)',
                    gradient_hover: 'linear-gradient(145deg,#c8b89a,#b8a880)',
                    is_wishlisted: p.isWishlisted,
                    images: p.images ?? [],
                    price9k: p.price9k,
                    price14k: p.price14k,
                    price18k: p.price18k,
                    price22k: p.price22k,
                    availableMetals: p.availableMetals,
                });
                setStatus('found');
            })
            .catch(() => setStatus('notfound'));
    }, [slug]);

    if (status === 'loading') {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                <p>Loading…</p>
            </div>
        );
    }

    if (status === 'notfound' || !product) {
        notFound();
    }

    return <PDPClient product={product} />;
}
