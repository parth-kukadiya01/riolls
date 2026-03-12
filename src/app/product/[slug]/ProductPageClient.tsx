'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { productsApi } from '@/lib/api';
import PDPClient from './PDPClient';

export default function ProductPageClient() {
    const params = useParams();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [status, setStatus] = useState<'loading' | 'found' | 'notfound'>('loading');

    useEffect(() => {
        if (!slug) return;

        productsApi
            .getBySlug(slug)
            .then((res: any) => {
                const p = res.data;
                if (!p) { setStatus('notfound'); return; }

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

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images[0] || 'https://riolls.com/og-image.jpg',
        description: product.description || `Luxury handcrafted ${product.name} by Riolls Jewels.`,
        brand: { '@type': 'Brand', name: 'Riolls Jewels' },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            url: `https://riolls.com/product/${product.slug}`
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://riolls.com/shop' },
            { '@type': 'ListItem', position: 3, name: product.name, item: `https://riolls.com/product/${product.slug}` }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PDPClient product={product} />
        </>
    );
}
