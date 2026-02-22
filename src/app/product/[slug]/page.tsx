import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, PRODUCTS, formatPrice } from '@/lib/products';
import PDPClient from './PDPClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return {};
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    return <PDPClient product={product} />;
}
