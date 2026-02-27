'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface DesignRequest {
    _id: string;
    userId: any;
    status: string;
    name: string;
    email: string;
    pieceType: string;
    budget: string;
    createdAt: string;
}

export default function AdminDesignRequests() {
    const [requests, setRequests] = useState<DesignRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const res = await adminFetch(`/admin/designs`);
                const json = await res.json();
                if (res.ok) {
                    let items = json.data || [];
                    if (statusFilter) {
                        items = items.filter((r: any) => r.status === statusFilter);
                    }
                    setRequests(items);
                } else {
                    console.error('Failed to fetch design requests:', json);
                }
            } catch (error) {
                console.error('Error fetching design requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [statusFilter]);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Bespoke Design Requests</h1>
                    <p className={styles.subtitle}>Review and manage custom jewellery inquiries and production lifecycle.</p>
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
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="accepted">Accepted</option>
                    <option value="in_production">In Production</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Jewellery Type</th>
                            <th>Date Submitted</th>
                            <th>Client Info</th>
                            <th>Budget Ext.</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading requests...</td></tr>
                        ) : requests.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No design requests found.</td></tr>
                        ) : (
                            requests.map(req => {
                                let cName = req.name || 'Anonymous';
                                let cEmail = req.email || 'N/A';
                                if (!req.name && req.userId && typeof req.userId === 'object') {
                                    cName = `${req.userId.firstName} ${req.userId.lastName}`;
                                    cEmail = req.userId.email;
                                }

                                const type = req.pieceType || 'Custom Piece';
                                const budgetStr = req.budget || 'Not Specified';

                                return (
                                    <tr key={req._id}>
                                        <td>
                                            <Link href={`/admin/designs/${req._id}`} className={styles.requestLink}>
                                                {type.replace('_', ' ')}
                                            </Link>
                                        </td>
                                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className={styles.clientInfo}>
                                                <span>{cName}</span>
                                                <a href={`mailto:${cEmail}`} className={styles.clientEmail}>{cEmail}</a>
                                            </div>
                                        </td>
                                        <td className={styles.budget}>{budgetStr}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[req.status.replace('_', '-')]}`}>
                                                {req.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Link href={`/admin/designs/${req._id}`} className={styles.actionBtn}>
                                                Manage <span style={{ fontSize: '1.2em' }}>→</span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
