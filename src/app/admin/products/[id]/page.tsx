'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminAuth';
import ProductForm from '@/components/admin/ProductForm';
import { use } from 'react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await adminFetch(`/admin/products/${resolvedParams.id}`);
                const json = await res.json();
                if (res.ok) {
                    setProduct(json.data);
                } else {
                    setError(json.message || 'Failed to fetch product');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [resolvedParams.id]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading product data...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!product) return null;

    return (
        <div>
            <ProductForm initialData={product} isEdit={true} />
        </div>
    );
}
