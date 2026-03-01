'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Review {
    _id: string;
    rating: number;
    title: string;
    body: string;
    productName: string;
    userName: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    images?: string[];
}

const ReviewText = ({ text }: { text: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = text && text.length > 100;

    return (
        <div>
            <div className={expanded ? styles.reviewBodyExpanded : styles.reviewBody}>
                {text}
            </div>
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={styles.readMoreBtn}
                >
                    {expanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');

    const fetchReviews = async () => {
        setLoading(true);
        try {
            // Admin reviews endpoint might not support pagination/filtering yet from frontend query args.
            // We'll fetch all and filter client-side for now based on backend logic available.
            const url = statusFilter ? `/admin/reviews?status=${statusFilter}` : `/admin/reviews`;
            const res = await adminFetch(url);
            const json = await res.json();

            if (res.ok) {
                // Ensure data shapes: if backend expands to object, parse appropriately.
                // Assuming `json.data` is an array of dicts returned by `format_review_dict`.
                let items: Review[] = [];
                if (Array.isArray(json.data)) {
                    items = json.data.map((r: any) => ({
                        _id: r._id,
                        rating: r.rating,
                        title: r.title,
                        body: r.body,
                        status: r.status,
                        createdAt: r.createdAt,
                        images: r.images || [],
                        productName: r.product?.name || 'Unknown Product',
                        userName: r.userName || 'Anonymous'
                    }));
                }
                setReviews(items);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter]);

    const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
        try {
            const res = await adminFetch(`/admin/reviews/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                // Update local state instead of full refetch for snappier UI
                setReviews(reviews.map(r => r._id === id ? { ...r, status: newStatus } : r));
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to update status');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to permanently delete this review?')) return;

        try {
            const res = await adminFetch(`/admin/reviews/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setReviews(reviews.filter(r => r._id !== id));
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to delete review');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    const renderStars = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Review Moderation</h1>
                    <p className={styles.subtitle}>Approve or reject customer reviews before they appear publicly.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Review</th>
                            <th>Product / Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading...</td></tr>
                        ) : reviews.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No reviews found.</td></tr>
                        ) : (
                            reviews.map(review => (
                                <tr key={review._id}>
                                    <td>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.rating}>{renderStars(review.rating)}</span>
                                            <span className={styles.reviewTitle}>{review.title}</span>
                                        </div>
                                        <ReviewText text={review.body} />
                                        {review.images && review.images.length > 0 && (
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                                {review.images.map((img, idx) => (
                                                    <a key={idx} href={img} target="_blank" rel="noopener noreferrer">
                                                        <img src={img} alt="Review attachment" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div className={styles.metaInfo}>
                                            <div className={styles.productName}>{review.productName}</div>
                                            <div>by {review.userName}</div>
                                        </div>
                                    </td>
                                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[review.status]}`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {review.status === 'pending' && (
                                                <>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.approve}`}
                                                        onClick={() => handleUpdateStatus(review._id, 'approved')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.reject}`}
                                                        onClick={() => handleUpdateStatus(review._id, 'rejected')}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {review.status === 'approved' && (
                                                <button
                                                    className={`${styles.actionBtn} ${styles.reject}`}
                                                    onClick={() => handleUpdateStatus(review._id, 'rejected')}
                                                >
                                                    Revoke
                                                </button>
                                            )}
                                            {review.status === 'rejected' && (
                                                <button
                                                    className={`${styles.actionBtn} ${styles.approve}`}
                                                    onClick={() => handleUpdateStatus(review._id, 'approved')}
                                                >
                                                    Re-Approve
                                                </button>
                                            )}
                                            <button
                                                className={`${styles.actionBtn} ${styles.delete}`}
                                                onClick={() => handleDelete(review._id)}
                                                title="Delete permanently"
                                            >
                                                Delete
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
