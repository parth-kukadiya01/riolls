import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PDPClient from './PDPClient';
import JsonLd from '@/components/seo/JsonLd';

const API_URL = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function getProduct(slug: string) {
    try {
        const res = await fetch(`${API_URL}/products/${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

function mapProduct(p: any) {
    return {
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
    };
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const p = await getProduct(slug);
    if (!p) return { title: 'Product Not Found' };

    const description = p.description ||
        `${p.name} — luxury handcrafted jewellery by Riolls Jewels.${p.stone ? ` ${p.stone} stone.` : ''} GIA-certified diamonds, ethically sourced gold, worldwide delivery.`;
    const image = p.images?.[0];

    return {
        title: p.name,
        description,
        alternates: { canonical: `https://riolls.com/product/${p.slug}` },
        openGraph: {
            title: `${p.name} — Riolls Jewels`,
            description,
            url: `https://riolls.com/product/${p.slug}`,
            ...(image && { images: [{ url: image, width: 1200, height: 900, alt: p.name }] }),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${p.name} — Riolls Jewels`,
            description,
            ...(image && { images: [image] }),
        },
    };
}

export default async function ProductPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const p = await getProduct(slug);
    if (!p) notFound();

    const product = mapProduct(p);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: p.images?.[0] || 'https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772124653/Riolls_jewels_t4kryx.png',
        description: p.description || `Luxury handcrafted ${p.name} by Riolls Jewels.`,
        brand: { '@type': 'Brand', name: 'Riolls Jewels' },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: p.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            url: `https://riolls.com/product/${p.slug}`,
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://riolls.com' },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://riolls.com/shop' },
            { '@type': 'ListItem', position: 3, name: p.name, item: `https://riolls.com/product/${p.slug}` },
        ],
    };

    return (
        <>
            <JsonLd data={productSchema} />
            <JsonLd data={breadcrumbSchema} />
            <PDPClient product={product} />
        </>
    );
}
