'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface BespokeWork {
    _id: string;
    name: string;
    image: string;
    tall: boolean;
    order: number;
    isActive: boolean;
    category?: string;
    type?: string;
}

export default function AdminBespokePage() {
    const router = useRouter();
    const [works, setWorks] = useState<BespokeWork[]>([]);
    const [aiConcepts, setAiConcepts] = useState<BespokeWork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'portfolio' | 'ai'>('portfolio');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<BespokeWork | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [tall, setTall] = useState(false);
    const [order, setOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [category, setCategory] = useState('Ring');
    const [type, setType] = useState('commission');
    const [uploading, setUploading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        setLoading(true);
        setError('');
        try {
            const [portfolioRes, aiRes] = await Promise.all([
                adminFetch('/bespoke?active_only=false'),
                adminFetch('/bespoke/admin/ai-concepts')
            ]);

            const portfolioJson = await portfolioRes.json();
            const aiJson = await aiRes.json();

            if (!portfolioRes.ok) throw new Error(portfolioJson.message || 'Failed to load portfolio');
            if (!aiRes.ok) throw new Error(aiJson.message || 'Failed to load AI concepts');

            setWorks((portfolioJson.data as BespokeWork[]) || []);
            setAiConcepts((aiJson.data as BespokeWork[]) || []);
        } catch (err: any) {
            console.error('Failed to load bespoke works:', err);
            setError(err.message || 'Failed to load bespoke works');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('images', file);
            formData.append('folder', 'bespoke');

            const res = await adminFetch('/upload', {
                method: 'POST',
                body: formData
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Upload failed');

            setImage(json.data.urls[0]);
        } catch (err: any) {
            alert(err.message || 'Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const openModal = (work?: BespokeWork, isAiPromotion = false) => {
        setFormError('');
        if (work && !isAiPromotion) {
            setEditingWork(work);
            setName(work.name);
            setImage(work.image);
            setTall(work.tall);
            setOrder(work.order);
            setIsActive(work.isActive);
            setCategory(work.category || 'Ring');
            setType(work.type || 'commission');
        } else if (work && isAiPromotion) {
            // Preparing to create a NEW permanent bespoke work from an AI concept
            setEditingWork(null);
            setName(work.name);
            setImage(work.image);
            setTall(false);
            setOrder(works.length * 10);
            setIsActive(true);
            setCategory(work.category || 'Ring');
            setType('ai_concept');
        } else {
            setEditingWork(null);
            setName('');
            setImage('');
            setTall(false);
            setOrder(works.length * 10);
            setIsActive(true);
            setCategory('Ring');
            setType('commission');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        if (!name || !image) {
            setFormError('Name and Image are required');
            return;
        }

        const payload = { name, image, tall, order: Number(order), isActive, category, type };

        try {
            const endpoint = editingWork ? `/bespoke/admin/${editingWork._id}` : '/bespoke/admin';
            const method = editingWork ? 'PUT' : 'POST';

            const res = await adminFetch(endpoint, {
                method,
                body: JSON.stringify(payload)
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to save');

            closeModal();
            loadWorks();
        } catch (err: any) {
            setFormError(err.message || 'Failed to save bespoke work');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this work?')) return;
        try {
            const res = await adminFetch(`/bespoke/admin/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || 'Delete failed');
            }

            loadWorks();
        } catch (err: any) {
            alert(err.message || 'Delete failed');
        }
    };

    if (loading) return <div className={styles.loading}>Loading bespoke portfolio...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Bespoke Portfolio</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className={styles.secondaryBtn} onClick={() => router.push('/admin/designs')}>AI Product</button>
                    <button className={styles.primaryBtn} onClick={() => openModal()}>+ Add New Work</button>
                </div>
            </div>

            <div className={styles.tabs} style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setActiveTab('portfolio')}
                    style={{ padding: '12px 0', borderBottom: activeTab === 'portfolio' ? '2px solid var(--charcoal)' : '2px solid transparent', color: activeTab === 'portfolio' ? 'var(--charcoal)' : 'var(--stone)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', fontWeight: activeTab === 'portfolio' ? 600 : 400 }}
                >
                    Approved Portfolio
                </button>
                <button
                    onClick={() => setActiveTab('ai')}
                    style={{ padding: '12px 0', borderBottom: activeTab === 'ai' ? '2px solid var(--charcoal)' : '2px solid transparent', color: activeTab === 'ai' ? 'var(--charcoal)' : 'var(--stone)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.15em', fontWeight: activeTab === 'ai' ? 600 : 400 }}
                >
                    AI Gallery ({aiConcepts.length})
                </button>
            </div>

            {error && <div className={styles.errorBanner}>{error}</div>}

            {activeTab === 'portfolio' && (
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Layout</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map(w => (
                                <tr key={w._id}>
                                    <td>
                                        <img src={w.image} alt={w.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{w.name}</td>
                                    <td>{w.category || 'None'}</td>
                                    <td>
                                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--stone)', background: 'var(--cream)', padding: '2px 6px', borderRadius: '4px' }}>
                                            {w.type === 'ai_concept' ? 'AI Concept' : 'Commission'}
                                        </span>
                                    </td>
                                    <td>{w.tall ? 'Tall (2 rows)' : 'Standard (1 row)'}</td>
                                    <td>{w.order}</td>
                                    <td>
                                        <span style={{ color: w.isActive ? 'green' : 'red', fontSize: '12px', background: w.isActive ? '#ecfdf5' : '#fef2f2', padding: '2px 8px', borderRadius: '12px' }}>
                                            {w.isActive ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className={styles.textBtn} onClick={() => openModal(w)}>Edit</button>
                                        <button className={styles.textBtnDanger} onClick={() => handleDelete(w._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {works.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--stone)' }}>
                                        No bespoke works found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'ai' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {aiConcepts.map(c => (
                        <div key={c._id} style={{ border: '1px solid var(--border)', background: 'var(--white)', padding: '16px', borderRadius: '4px', textAlign: 'center' }}>
                            <img src={c.image} alt={c.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '4px', marginBottom: '16px' }} />
                            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', margin: '0 0 16px', color: 'var(--charcoal)', minHeight: '40px' }}>{c.name}</h3>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button className={styles.primaryBtn} style={{ flex: 2, padding: '8px 4px', fontSize: '12px' }} onClick={() => openModal(c, true)}>
                                    Promote
                                </button>
                                <button className={styles.secondaryBtn} style={{ flex: 1, padding: '8px 4px', fontSize: '12px' }} onClick={() => openModal(c, false)}>
                                    Edit
                                </button>
                                <button className={styles.textBtnDanger} style={{ padding: '8px', border: '1px solid #fee2e2', borderRadius: '4px', background: '#fef2f2', fontSize: '12px' }} onClick={() => handleDelete(c._id)}>
                                    Del
                                </button>
                            </div>
                        </div>
                    ))}
                    {aiConcepts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--stone)' }}>
                            No AI concepts generated yet.
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2 className={styles.modalTitle}>{editingWork ? 'Edit Work' : 'Add New Work'}</h2>
                        {formError && <div className={styles.formError}>{formError}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup} style={{ flex: 2 }}>
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className={styles.formGroup} style={{ flex: 1 }}>
                                    <label>Category</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="Ring">Ring</option>
                                        <option value="Necklace">Necklace</option>
                                        <option value="Earrings">Earrings</option>
                                        <option value="Bracelet">Bracelet</option>
                                        <option value="Pendant">Pendant</option>
                                        <option value="Hip Hop">Hip Hop</option>
                                        <option value="Chain">Chain</option>
                                        <option value="Man's hoops">Man's hoops</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Image URL</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." required style={{ flex: 1 }} />
                                    <label className={styles.uploadBtn} style={{ cursor: uploading ? 'wait' : 'pointer' }}>
                                        {uploading ? 'Uploading...' : 'Upload'}
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
                                    </label>
                                </div>
                                {image && (
                                    <img src={image} alt="Preview" style={{ marginTop: '8px', maxHeight: '120px', borderRadius: '4px', border: '1px solid var(--border)' }} />
                                )}
                            </div>

                            <div className={styles.formRow}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={tall} onChange={e => setTall(e.target.checked)} />
                                    Tall Layout (spans 2 grid rows)
                                </label>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup} style={{ flex: 1 }}>
                                    <label>Display Order</label>
                                    <input type="text" value={order} onChange={e => setOrder(Number(e.target.value.replace(/\D/g, '')))} />
                                </div>
                                <div className={styles.formGroup} style={{ flex: 1 }}>
                                    <label>Type</label>
                                    <select value={type} onChange={e => setType(e.target.value)}>
                                        <option value="commission">Commission</option>
                                        <option value="ai_concept">AI Concept</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup} style={{ flex: 1 }}>
                                    <label>Status</label>
                                    <select value={isActive ? 'true' : 'false'} onChange={e => setIsActive(e.target.value === 'true')}>
                                        <option value="true">Active (Visible)</option>
                                        <option value="false">Hidden</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.primaryBtn}>Save Work</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
