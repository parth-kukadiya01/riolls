'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from '../page.module.css';

interface AILimitUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    aiGenerationsUsed: number;
    aiGenerationLimit: number;
    remaining: number;
    createdAt: string;
}

export default function AdminAILimitsPage() {
    const [users, setUsers] = useState<AILimitUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Per-row edit states
    const [editValues, setEditValues] = useState<Record<string, string>>({});
    const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
    const [feedbackMap, setFeedbackMap] = useState<Record<string, { type: 'success' | 'error'; msg: string }>>({});

    const loadUsers = async (p = 1, q = '') => {
        setLoading(true);
        setError('');
        try {
            const qs = new URLSearchParams({ page: String(p), limit: '20', ...(q ? { search: q } : {}) });
            const res = await adminFetch(`/admin/ai-limits?${qs}`);
            const json = await res.json();
            if (res.ok) {
                setUsers(json.data || []);
                setTotalPages(json.pagination?.totalPages || 1);
                setTotal(json.pagination?.total || 0);
            } else {
                setError(json.message || 'Failed to load users');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers(page, search);
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        loadUsers(1, search);
    };

    const handleUpdateLimit = async (userId: string) => {
        const raw = editValues[userId];
        const newLimit = parseInt(raw, 10);
        if (isNaN(newLimit) || newLimit < 0) {
            setFeedbackMap(prev => ({ ...prev, [userId]: { type: 'error', msg: 'Enter a valid non-negative number' } }));
            return;
        }

        setSavingIds(prev => new Set(prev).add(userId));
        setFeedbackMap(prev => { const n = { ...prev }; delete n[userId]; return n; });

        try {
            const res = await adminFetch(`/admin/users/${userId}/ai-limit`, {
                method: 'PUT',
                body: JSON.stringify({ limit: newLimit }),
            });
            const json = await res.json();
            if (res.ok) {
                setFeedbackMap(prev => ({ ...prev, [userId]: { type: 'success', msg: 'Limit updated ✓' } }));
                // Update row inline
                setUsers(prev => prev.map(u => u._id === userId ? { ...u, aiGenerationLimit: newLimit, remaining: Math.max(0, newLimit - u.aiGenerationsUsed) } : u));
                setEditValues(prev => { const n = { ...prev }; delete n[userId]; return n; });
            } else {
                setFeedbackMap(prev => ({ ...prev, [userId]: { type: 'error', msg: json.message || 'Update failed' } }));
            }
        } catch (err: any) {
            setFeedbackMap(prev => ({ ...prev, [userId]: { type: 'error', msg: err.message } }));
        } finally {
            setSavingIds(prev => { const s = new Set(prev); s.delete(userId); return s; });
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>AI Generation Limits</h1>
                <p className={styles.subtitle}>
                    View and manage how many times each user can generate AI jewelry designs. Default limit is 3.
                </p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', maxWidth: '480px' }}>
                <input
                    type="text"
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.6rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--foreground)',
                        fontSize: '0.9rem',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        background: 'rgba(201,169,110,0.15)',
                        border: '1px solid rgba(201,169,110,0.3)',
                        color: '#C9A96E',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Stats bar */}
            <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
                {!loading && `${total} user${total !== 1 ? 's' : ''} found`}
            </div>

            {loading && <div style={{ padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>Loading…</div>}
            {error && <div style={{ padding: '1rem', color: '#e74c3c', background: 'rgba(231,76,60,0.08)', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

            {!loading && users.length > 0 && (
                <div style={{ overflowX: 'auto' }}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th style={{ textAlign: 'center' }}>Used</th>
                                <th style={{ textAlign: 'center' }}>Limit</th>
                                <th style={{ textAlign: 'center' }}>Remaining</th>
                                <th style={{ textAlign: 'center' }}>Set New Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => {
                                const feedback = feedbackMap[u._id];
                                const isSaving = savingIds.has(u._id);
                                const editVal = editValues[u._id] ?? '';
                                const isAtLimit = u.remaining === 0;

                                return (
                                    <tr key={u._id}>
                                        <td style={{ fontWeight: 500 }}>{u.firstName} {u.lastName}</td>
                                        <td style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>{u.email}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.2rem 0.65rem',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                background: isAtLimit ? 'rgba(231,76,60,0.15)' : 'rgba(255,255,255,0.06)',
                                                color: isAtLimit ? '#e74c3c' : 'var(--foreground)',
                                            }}>
                                                {u.aiGenerationsUsed}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 600, color: '#C9A96E' }}>{u.aiGenerationLimit}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.2rem 0.65rem',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                background: isAtLimit ? 'rgba(231,76,60,0.12)' : 'rgba(39,174,96,0.12)',
                                                color: isAtLimit ? '#e74c3c' : '#27ae60',
                                            }}>
                                                {u.remaining}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', minWidth: '180px' }}>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    placeholder={String(u.aiGenerationLimit)}
                                                    value={editVal}
                                                    onChange={e => setEditValues(prev => ({ ...prev, [u._id]: e.target.value }))}
                                                    style={{
                                                        width: '70px',
                                                        padding: '0.4rem 0.6rem',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(201,169,110,0.25)',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        color: 'var(--foreground)',
                                                        fontSize: '0.88rem',
                                                        textAlign: 'center',
                                                        outline: 'none',
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleUpdateLimit(u._id)}
                                                    disabled={isSaving || !editVal}
                                                    style={{
                                                        padding: '0.4rem 0.85rem',
                                                        borderRadius: '6px',
                                                        background: editVal ? 'rgba(201,169,110,0.18)' : 'rgba(255,255,255,0.04)',
                                                        border: `1px solid ${editVal ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                                        color: editVal ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                                                        fontWeight: 600,
                                                        fontSize: '0.82rem',
                                                        cursor: editVal && !isSaving ? 'pointer' : 'default',
                                                        letterSpacing: '0.02em',
                                                        whiteSpace: 'nowrap',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    {isSaving ? '…' : 'Update'}
                                                </button>
                                                {feedback && (
                                                    <span style={{
                                                        fontSize: '0.78rem',
                                                        color: feedback.type === 'success' ? '#27ae60' : '#e74c3c',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {feedback.msg}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && users.length === 0 && !error && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>No users found.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', alignItems: 'center' }}>
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.04)',
                            color: page <= 1 ? 'rgba(255,255,255,0.2)' : 'var(--foreground)',
                            cursor: page <= 1 ? 'default' : 'pointer',
                            fontSize: '0.85rem',
                        }}
                    >
                        ← Prev
                    </button>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', padding: '0 0.5rem' }}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        style={{
                            padding: '0.4rem 0.9rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.04)',
                            color: page >= totalPages ? 'rgba(255,255,255,0.2)' : 'var(--foreground)',
                            cursor: page >= totalPages ? 'default' : 'pointer',
                            fontSize: '0.85rem',
                        }}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
