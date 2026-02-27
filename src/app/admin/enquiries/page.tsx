'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Enquiry {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'in_progress' | 'resolved';
    adminNotes: string;
    createdAt: string;
}

export default function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');

    // Modal state
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [editStatus, setEditStatus] = useState<'new' | 'in_progress' | 'resolved'>('new');
    const [editNotes, setEditNotes] = useState('');
    const [updating, setUpdating] = useState(false);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const url = statusFilter ? `/admin/enquiries?status=${statusFilter}` : `/admin/enquiries`;
            const res = await adminFetch(url);
            const json = await res.json();
            if (res.ok) {
                setEnquiries(json.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, [statusFilter]);

    const openEditModal = (enquiry: Enquiry) => {
        setSelectedEnquiry(enquiry);
        setEditStatus(enquiry.status);
        setEditNotes(enquiry.adminNotes || '');
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEnquiry) return;
        setUpdating(true);

        try {
            const res = await adminFetch(`/admin/enquiries/${selectedEnquiry._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: editStatus,
                    adminNotes: editNotes
                })
            });

            if (res.ok) {
                setEnquiries(enquiries.map(enq =>
                    enq._id === selectedEnquiry._id
                        ? { ...enq, status: editStatus, adminNotes: editNotes }
                        : enq
                ));
                setSelectedEnquiry(null);
            } else {
                const json = await res.json();
                alert(json.message || 'Update failed');
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Customer Enquiries</h1>
                    <p className={styles.subtitle}>Manage contact form submissions and track resolution.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading...</td></tr>
                        ) : enquiries.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No enquiries found.</td></tr>
                        ) : (
                            enquiries.map(enq => (
                                <tr key={enq._id}>
                                    <td>
                                        <div className={styles.senderInfo}>
                                            <span className={styles.senderName}>{enq.name}</span>
                                            <a href={`mailto:${enq.email}`} className={styles.senderEmail}>{enq.email}</a>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.messageSubject}>{enq.subject}</div>
                                        <div className={styles.messageBody}>{enq.message}</div>
                                        {enq.adminNotes && (
                                            <div className={styles.adminNotes}>
                                                <strong>Notes:</strong> {enq.adminNotes}
                                            </div>
                                        )}
                                    </td>
                                    <td>{new Date(enq.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[enq.status.replace('_', '-')]}`}>
                                            {enq.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className={styles.btn} onClick={() => openEditModal(enq)}>
                                                Update Status
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedEnquiry && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Update Enquiry</h2>
                        <form onSubmit={handleUpdate}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Status</label>
                                <select
                                    className={styles.select}
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as any)}
                                >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Admin Notes</label>
                                <textarea
                                    className={styles.textarea}
                                    value={editNotes}
                                    onChange={(e) => setEditNotes(e.target.value)}
                                    placeholder="Add internal tracking notes here..."
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" className={styles.btn} onClick={() => setSelectedEnquiry(null)}>Cancel</button>
                                <button type="submit" className={`${styles.btn} ${styles.primary}`} disabled={updating}>
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
