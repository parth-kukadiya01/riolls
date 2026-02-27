'use client';

import { useEffect, useState, use } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import CategoryForm from '@/components/admin/CategoryForm';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await adminFetch(`/admin/categories/${resolvedParams.id}`);
                const json = await res.json();
                if (res.ok) {
                    setCategory(json.data);
                } else {
                    setError(json.message || 'Category not found');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [resolvedParams.id]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading category data...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!category) return null;

    return (
        <div>
            <CategoryForm initialData={category} isEdit={true} />
        </div>
    );
}
