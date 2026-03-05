'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number | null;
    images: string[];
    isActive: boolean;
    category: {
        name: string;
    } | null;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            // we use the public endpoint as there is no specific admin GET endpoint
            let url = `/products?page=${page}&limit=10`;
            if (search) url += `&search=${encodeURIComponent(search)}`;

            const res = await adminFetch(url);
            const json = await res.json();

            if (res.ok) {
                // Backend returns { success: true, data: [...], pagination: { totalPages, ... } }
                setProducts(Array.isArray(json.data) ? json.data : []);
                setTotalPages(json.pagination?.totalPages || 1);
            } else {
                console.error('Failed to fetch products', json);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [fetchProducts]);

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

        try {
            const res = await adminFetch(`/admin/products/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchProducts();
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to delete product');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    const formatCurrency = (val: number | null) => {
        if (val === null) return 'POA';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Manage your jewellery collection, pricing, and visibility.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="/admin/designs" className={styles.secondaryBtn}>AI Product</Link>
                    <Link href="/admin/products/new" className={styles.addBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Product
                    </Link>
                </div>
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search products..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); // Reset page on search
                    }}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && products.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No products found.</td></tr>
                        ) : (
                            products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className={styles.productInfo}>
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/48'}
                                                alt={product.name}
                                                className={styles.productImage}
                                            />
                                            <div>
                                                <div className={styles.productName}>{product.name}</div>
                                                <div className={styles.productCategory}>{product.category?.name || 'Uncategorized'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatCurrency(product.price)}</td>
                                    <td>
                                        <span className={`${styles.badge} ${product.isActive ? styles.active : styles.inactive}`}>
                                            {product.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                                            <Link href={`/admin/products/${product._id}`} className={styles.actionBtn} title="Edit Product">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </Link>
                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteHover}`}
                                                onClick={() => handleDelete(product._id, product.name)}
                                                title="Delete Product"
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

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageBtn}
                            disabled={page === 1 || loading}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span style={{ fontSize: '0.875rem', color: '#666' }}>Page {page} of {totalPages}</span>
                        <button
                            className={styles.pageBtn}
                            disabled={page === totalPages || loading}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
