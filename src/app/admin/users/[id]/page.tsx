'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface UserData {
    profile: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        role: string;
        createdAt: string;
        addresses?: any[];
    };
    orders: Array<{
        _id: string;
        orderNumber: string;
        total: number;
        status: string;
        createdAt: string;
        items: number;
    }>;
}

export default function AdminUserDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await adminFetch(`/admin/users/${resolvedParams.id}`);
                const json = await res.json();
                if (res.ok) {
                    setData(json.data);
                } else {
                    setError('Failed to fetch user profile');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [resolvedParams.id]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading user profile...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!data) return null;

    const { profile, orders } = data;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(val);
    };

    const getInitials = (first: string, last: string) => {
        return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase() || '?';
    };

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <Link href="/admin/users" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                        ← Back to Clients
                    </Link>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>{profile.firstName} {profile.lastName}</h1>
                        <span className={`${styles.roleBadge} ${styles[profile.role]}`}>
                            {profile.role}
                        </span>
                    </div>
                    <p className={styles.subtitle}>
                        Customer since {new Date(profile.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                {/* Left Column: Profile */}
                <div>
                    <div className={styles.card}>
                        <div className={styles.profileAvatar}>
                            {getInitials(profile.firstName, profile.lastName)}
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Email Address</span>
                            <span className={styles.detailValue}>
                                <a href={`mailto:${profile.email}`} style={{ color: 'var(--gold)' }}>{profile.email}</a>
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Phone Number</span>
                            <span className={styles.detailValue}>{profile.phone || 'Not provided'}</span>
                        </div>

                        <div className={styles.detailRow} style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <span className={styles.detailLabel}>Lifetime Value</span>
                            <span className={styles.detailValue} style={{ fontSize: '1.25rem', fontFamily: 'var(--font-secondary)' }}>
                                {formatCurrency(totalSpent)}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Total Orders</span>
                            <span className={styles.detailValue}>{orders.length}</span>
                        </div>
                    </div>

                    {profile.addresses && profile.addresses.length > 0 && (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Saved Addresses</h2>
                            {profile.addresses.map((addr, idx) => (
                                <div key={idx} className={styles.addressBox}>
                                    <span className={styles.addressType}>{addr.isDefault ? 'Default' : `Address ${idx + 1}`}</span>
                                    {addr.name}<br />
                                    {addr.line1}<br />
                                    {addr.line2 && <>{addr.line2}<br /></>}
                                    {addr.city}, {addr.state} {addr.postalCode}<br />
                                    {addr.country}<br />
                                    {addr.phone}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Order History */}
                <div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Order History</h2>
                        {orders.length === 0 ? (
                            <p style={{ color: '#666', fontSize: '0.875rem' }}>This user has not placed any orders yet.</p>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Order No</th>
                                            <th>Date</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>
                                                    <Link href={`/admin/orders/${order._id}`} className={styles.orderLink}>
                                                        {order.orderNumber}
                                                    </Link>
                                                </td>
                                                <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                                                <td>{order.items || '-'}</td>
                                                <td>{formatCurrency(order.total)}</td>
                                                <td>
                                                    <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(' ', '-')]}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
