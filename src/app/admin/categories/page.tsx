'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
    productCount?: number;
}

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await adminFetch(`/categories`);
            const json = await res.json();
            if (res.ok) {
                // Sort by sortOrder
                const sorted = (json.data || []).sort((a: Category, b: Category) => a.sortOrder - b.sortOrder);
                setCategories(sorted);
            } else {
                console.error('Failed to fetch categories:', json);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete category "${name}"? Products in this category may be affected.`)) return;

        try {
            const res = await adminFetch(`/admin/categories/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchCategories();
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to delete category');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Categories</h1>
                    <p className={styles.subtitle}>Organize your jewellery into logical collections for navigation.</p>
                </div>
                <Link href="/admin/categories/new" className={styles.addBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Category
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && categories.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading categories...</td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No categories found.</td></tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat._id}>
                                    <td>
                                        <div className={styles.categoryInfo}>
                                            <img
                                                src={cat.image || 'https://via.placeholder.com/60x48'}
                                                alt={cat.name}
                                                className={styles.categoryImage}
                                            />
                                            <div>
                                                <div className={styles.categoryName}>{cat.name}</div>
                                                <div className={styles.categorySlug}>/{cat.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.75rem', color: '#666' }}>
                                            {cat.description || 'No description'}
                                        </div>
                                    </td>
                                    <td>{cat.sortOrder}</td>
                                    <td>
                                        <span className={`${styles.badge} ${cat.isActive ? styles.active : styles.inactive}`}>
                                            {cat.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/categories/${cat._id}`} className={styles.actionBtn} title="Edit Category">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </Link>
                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteHover}`}
                                                onClick={() => handleDelete(cat._id, cat.name)}
                                                title="Delete Category"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
