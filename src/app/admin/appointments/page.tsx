'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Appointment {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    country: string;
    pincode: string;
    type: string;
    date: string;
    time: string;
    message?: string;
    meetLink?: string;
    status: string;
    adminNotes?: string;
    createdAt: string;
}

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
    office_visit: { label: 'Office Visit', icon: '🏢' },
    google_meet: { label: 'Google Meet', icon: '📹' },
    whatsapp: { label: 'WhatsApp', icon: '💬' },
};

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            let url = `/admin/appointments?page=${page}&limit=20`;
            if (statusFilter) url += `&status=${statusFilter}`;
            const res = await adminFetch(url);
            const json = await res.json();
            if (res.ok) {
                setAppointments(Array.isArray(json.data) ? json.data : []);
                setTotalPages(json.pagination?.totalPages || 1);
            }
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter, page]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await adminFetch(`/admin/appointments/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to update status');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch {
            return iso;
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Appointments</h1>
                    <p className={styles.subtitle}>Manage customer consultation bookings — office visits, Google Meet, and WhatsApp.</p>
                </div>
            </div>

            <div className={styles.controls}>
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Type</th>
                            <th>Date &amp; Time</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
                        ) : appointments.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No appointments found.</td></tr>
                        ) : (
                            appointments.map(appt => {
                                const typeInfo = TYPE_LABELS[appt.type] || { label: appt.type, icon: '📅' };
                                return (
                                    <tr key={appt._id}>
                                        <td>
                                            <div className={styles.customerName}>
                                                {appt.firstName} {appt.lastName}
                                            </div>
                                            <div className={styles.metaInfo}>{appt.email}</div>
                                            {appt.message && (
                                                <div className={styles.messagePreview}>{appt.message}</div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`${styles.typeBadge} ${styles[appt.type] || ''}`}>
                                                {typeInfo.icon} {typeInfo.label}
                                            </span>
                                            {appt.meetLink && (
                                                <div style={{ marginTop: '4px' }}>
                                                    <a href={appt.meetLink} target="_blank" rel="noopener noreferrer"
                                                        className={styles.meetLink}>
                                                        Open Meet →
                                                    </a>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{appt.date}</div>
                                            <div className={styles.metaInfo}>{appt.time}</div>
                                        </td>
                                        <td>
                                            <div>{appt.countryCode} {appt.phone}</div>
                                            <div className={styles.metaInfo}>{appt.country} · {appt.pincode}</div>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[appt.status] || ''}`}>
                                                {appt.status}
                                            </span>
                                            <div className={styles.metaInfo} style={{ marginTop: '4px' }}>
                                                {formatDate(appt.createdAt)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                {appt.status === 'new' && (
                                                    <>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.approve}`}
                                                            onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.reject}`}
                                                            onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {appt.status === 'confirmed' && (
                                                    <>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.approve}`}
                                                            onClick={() => handleUpdateStatus(appt._id, 'completed')}
                                                        >
                                                            Complete
                                                        </button>
                                                        <button
                                                            className={`${styles.actionBtn} ${styles.reject}`}
                                                            onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {appt.status === 'cancelled' && (
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.approve}`}
                                                        onClick={() => handleUpdateStatus(appt._id, 'new')}
                                                    >
                                                        Reopen
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        className={styles.pageBtn}
                    >
                        ← Previous
                    </button>
                    <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className={styles.pageBtn}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
