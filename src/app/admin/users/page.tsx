'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    ordersCount: number;
    totalSpent: number;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await adminFetch(`/admin/users`);
                const json = await res.json();
                if (res.ok) {
                    setUsers(json.data || []);
                } else {
                    console.error('Failed to fetch users:', json);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const searchLower = search.toLowerCase();
            const userName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return userName.includes(searchLower) || user.email.toLowerCase().includes(searchLower);
        });
    }, [users, search]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
    const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(val);
    };

    const getInitials = (first: string, last: string) => {
        return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase() || '?';
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Clients</h1>
                    <p className={styles.subtitle}>Manage customer accounts and view their order history.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Role</th>
                            <th>Total Orders</th>
                            <th>Total Spent</th>
                            <th>Joined</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && users.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading clients...</td></tr>
                        ) : paginatedUsers.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No clients found.</td></tr>
                        ) : (
                            paginatedUsers.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <div className={styles.userInfo}>
                                            <div className={styles.avatar}>
                                                {getInitials(user.firstName, user.lastName)}
                                            </div>
                                            <div>
                                                <Link href={`/admin/users/${user._id}`} className={styles.name}>
                                                    {user.firstName} {user.lastName}
                                                </Link>
                                                <div className={styles.email}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${user.role === 'admin' ? styles.admin : styles.user}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.ordersCount}</td>
                                    <td>{formatCurrency(user.totalSpent)}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <Link href={`/admin/users/${user._id}`} className={styles.actionBtn}>
                                            View Profile
                                        </Link>
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
