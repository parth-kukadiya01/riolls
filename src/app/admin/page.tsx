'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface DashboardData {
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
    totalProducts: number;
    pendingOrders: number;
    newEnquiries: number;
    newDesignRequests: number;
    aiConceptsCount?: number;
    recentOrders: Array<{
        _id: string;
        orderNumber: string;
        total: number;
        status: string;
        createdAt: string;
    }>;
    revenueChart: {
        labels: string[];
        data: number[];
    };
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [goldPrice, setGoldPrice] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        let mounted = true;
        const loadDashboard = async () => {
            try {
                const res = await adminFetch('/admin/dashboard');
                const json = await res.json();
                if (res.ok && mounted) {
                    setData(json.data);
                } else if (mounted) {
                    setError(json.message || 'Failed to load dashboard data');
                }
            } catch (err: any) {
                if (mounted) setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadDashboard();
        return () => { mounted = false; };
    }, []);

    const handleUpdateGoldPrice = async () => {
        if (!goldPrice || isNaN(parseFloat(goldPrice))) {
            alert('Please enter a valid gold price');
            return;
        }

        if (!confirm(`Are you sure you want to update all product prices based on $${goldPrice}/g?`)) {
            return;
        }

        setUpdating(true);
        try {
            const res = await adminFetch('/admin/bulk-update-gold-prices', {
                method: 'POST',
                body: JSON.stringify({ gold24kPrice: parseFloat(goldPrice) })
            });
            const json = await res.json();
            if (res.ok) {
                alert(json.message);
                setGoldPrice('');
            } else {
                alert(json.message || 'Failed to update prices');
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard data...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
    if (!data) return null;

    const maxChartValue = Math.max(...(data.revenueChart?.data || [1]));

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Overview</h1>
                <p className={styles.subtitle}>Welcome back. Here is your store's performance at a glance.</p>
            </div>

            {/* KPI Cards */}
            <div className={styles.grid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiTitle}>Total Revenue</span>
                        <div className={styles.kpiIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{formatCurrency(data.totalRevenue)}</div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiTitle}>Total Orders</span>
                        <div className={styles.kpiIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{data.totalOrders}</div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiTitle}>Total Clients</span>
                        <div className={styles.kpiIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{data.totalUsers}</div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiTitle}>Active Products</span>
                        <div className={styles.kpiIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.kpiValue}>{data.totalProducts}</div>
                </div>

                <div className={`${styles.kpiCard} ${styles.goldCard}`}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiTitle}>Gold Price Control</span>
                        <div className={styles.kpiIcon} style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.goldInputGroup}>
                        <div className={styles.inputWrapper}>
                            <span className={styles.currencyPrefix}>$</span>
                            <input
                                type="number"
                                step="0.01"
                                className={styles.goldInput}
                                placeholder="24k Price / g"
                                value={goldPrice}
                                onChange={e => setGoldPrice(e.target.value)}
                            />
                        </div>
                        <button
                            className={styles.goldButton}
                            onClick={handleUpdateGoldPrice}
                            disabled={updating}
                        >
                            {updating ? '...' : 'Update All'}
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                {/* Revenue Chart Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Revenue Trend</h2>
                    <div className={styles.chartContainer}>
                        {data.revenueChart.labels.map((label, idx) => {
                            const val = data.revenueChart.data[idx];
                            const heightPercentage = Math.max((val / maxChartValue) * 100, 5);
                            return (
                                <div key={label} className={styles.chartBarWrapper}>
                                    <div
                                        className={styles.chartBar}
                                        style={{ height: `${heightPercentage}%` }}
                                        title={formatCurrency(val)}
                                    />
                                    <span className={styles.chartLabel}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pending Actions Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Action Required</h2>
                    <div className={styles.actionList}>
                        <Link href="/admin/orders?status=confirmed" className={styles.actionItem} style={{ textDecoration: 'none' }}>
                            <div className={styles.actionLabel}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>Pending Orders</span>
                            </div>
                            {data.pendingOrders > 0 && <span className={styles.actionBadge}>{data.pendingOrders}</span>}
                        </Link>

                        <Link href="/admin/enquiries?status=new" className={styles.actionItem} style={{ textDecoration: 'none' }}>
                            <div className={styles.actionLabel}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c93d3d" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span>New Enquiries</span>
                            </div>
                            {data.newEnquiries > 0 && <span className={styles.actionBadge}>{data.newEnquiries}</span>}
                        </Link>

                        <Link href="/admin/designs?status=new" className={styles.actionItem} style={{ textDecoration: 'none' }}>
                            <div className={styles.actionLabel}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <span>AI Studio Quotes</span>
                            </div>
                            {data.newDesignRequests > 0 && <span className={styles.actionBadge}>{data.newDesignRequests}</span>}
                        </Link>

                        <Link href="/admin/bespoke" className={styles.actionItem} style={{ textDecoration: 'none' }}>
                            <div className={styles.actionLabel}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b4fbb" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                <span>Bespoke Portfolio</span>
                            </div>
                            <span className={styles.actionBadge} style={{ background: '#f3e8ff', color: '#6b4fbb' }}>
                                {data.aiConceptsCount !== undefined ? `${data.aiConceptsCount} Concepts` : 'Manage'}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className={styles.section} style={{ marginTop: '1.5rem' }}>
                <h2 className={styles.sectionTitle}>Recent Orders</h2>
                {data.recentOrders.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order No</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>
                                            <Link href={`/admin/orders/${order._id}`} className={styles.link} style={{ marginTop: 0 }}>
                                                {order.orderNumber}
                                            </Link>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
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
                ) : (
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>No recent orders found.</p>
                )}
                <Link href="/admin/orders" className={styles.link}>View all orders →</Link>
            </div>
        </div>
    );
}
