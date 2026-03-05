'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Order {
    _id: string;
    orderNumber: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    } | string;
    status: string;
    total: number;
    createdAt: string;
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;

    const fetchOrders = async (currentPage = 1, status = '', searchTerm = '') => {
        setLoading(true);
        try {
            let url = `/admin/orders?page=${currentPage}&limit=${itemsPerPage}`;
            if (status) url += `&status=${status}`;
            if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
            const res = await adminFetch(url);
            const json = await res.json();
            if (res.ok) {
                // Backend returns: { data: [...], pagination: { totalPages, ... } }
                setOrders(Array.isArray(json.data) ? json.data : []);
                setTotalPages(json.pagination?.totalPages || 1);
            } else {
                console.error('Failed to fetch orders:', json);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(page, statusFilter, search);
    }, [page, statusFilter]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Orders</h1>
                    <p className={styles.subtitle}>View and manage customer orders and fulfillments.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search by Order # or Customer..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSearch(val);
                        setPage(1);
                        // debounce search — trigger server fetch after typing stops
                        clearTimeout((window as any)._orderSearchTimer);
                        (window as any)._orderSearchTimer = setTimeout(() => {
                            fetchOrders(1, statusFilter, val);
                        }, 400);
                    }}
                />
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && orders.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading orders...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No orders found.</td></tr>
                        ) : (
                            orders.map((order: Order) => {
                                const user = typeof order.userId === 'object' ? order.userId : null;
                                return (
                                    <tr key={order._id}>
                                        <td>
                                            <Link href={`/admin/orders/${order._id}`} className={styles.orderNumber}>
                                                {order.orderNumber}
                                            </Link>
                                        </td>
                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                day: '2-digit', month: 'short', year: 'numeric'
                                            })}
                                        </td>
                                        <td>
                                            <div className={styles.customerInfo}>
                                                <span>{user ? `${user.firstName} ${user.lastName}` : 'Guest / Deleted User'}</span>
                                                {user && <span className={styles.customerEmail}>{user.email}</span>}
                                            </div>
                                        </td>
                                        <td>{formatCurrency(order.total)}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(' ', '-')]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Link href={`/admin/orders/${order._id}`} className={styles.actionBtn}>
                                                Manage <span style={{ fontSize: '1.2em' }}>→</span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageBtn}
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span style={{ fontSize: '0.875rem', color: '#666' }}>Page {page} of {totalPages}</span>
                        <button
                            className={styles.pageBtn}
                            disabled={page === totalPages}
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
