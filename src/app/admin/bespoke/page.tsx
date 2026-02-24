'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { bespokeApi, reviewsApi } from '@/lib/api';
import styles from './page.module.css';

interface BespokeWork {
    _id: string;
    name: string;
    image: string;
    tall: boolean;
    order: number;
    isActive: boolean;
}

export default function AdminBespokePage() {
    const router = useRouter();
    const [works, setWorks] = useState<BespokeWork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<BespokeWork | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [tall, setTall] = useState(false);
    const [order, setOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        setLoading(true);
        try {
            const res = await bespokeApi.list(false); // get all, including inactive
            setWorks((res.data as BespokeWork[]) || []);
        } catch (err: any) {
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
            // Re-using the review image upload endpoint since it just uploads to Cloudinary and returns URL
            // In a real app we might want a dedicated admin upload endpoint
            const url = await reviewsApi.uploadImage(file);
            setImage(url);
        } catch (err) {
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const openModal = (work?: BespokeWork) => {
        setFormError('');
        if (work) {
            setEditingWork(work);
            setName(work.name);
            setImage(work.image);
            setTall(work.tall);
            setOrder(work.order);
            setIsActive(work.isActive);
        } else {
            setEditingWork(null);
            setName('');
            setImage('');
            setTall(false);
            setOrder(works.length * 10);
            setIsActive(true);
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

        const payload = { name, image, tall, order: Number(order), isActive };

        try {
            if (editingWork) {
                await bespokeApi.update(editingWork._id, payload);
            } else {
                await bespokeApi.create(payload);
            }
            closeModal();
            loadWorks();
        } catch (err: any) {
            setFormError(err.message || 'Failed to save bespoke work');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this work?')) return;
        try {
            await bespokeApi.delete(id);
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
                <button className={styles.primaryBtn} onClick={() => openModal()}>+ Add New Work</button>
            </div>

            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
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

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2 className={styles.modalTitle}>{editingWork ? 'Edit Work' : 'Add New Work'}</h2>
                        {formError && <div className={styles.formError}>{formError}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
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
                                    <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} />
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
