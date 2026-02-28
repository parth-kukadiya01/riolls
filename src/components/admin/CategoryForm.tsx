'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminAuth';
import styles from './CategoryForm.module.css';

interface CategoryFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CategoryForm({ initialData = null, isEdit = false }: CategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        isActive: true,
        sortOrder: 0
    });

    // Image logic
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                slug: initialData.slug || '',
                description: initialData.description || '',
                isActive: initialData.isActive ?? true,
                sortOrder: initialData.sortOrder || 0
            });

            if (initialData.image) {
                setExistingImage(initialData.image);
            }
        }
    }, [initialData]);

    // Handle drag events
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setNewImage(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    };

    const removeNewImage = () => {
        setNewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeExistingImage = () => {
        setExistingImage(null);
    };

    const generateSlug = () => {
        if (!formData.name) return;
        setFormData(f => ({ ...f, slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Handle image upload first if a new image was selected
            let imageUrl: string | null = existingImage;
            if (newImage) {
                const imgForm = new FormData();
                imgForm.append('images', newImage);
                imgForm.append('folder', 'categories');
                const uploadRes = await adminFetch('/upload', { method: 'POST', body: imgForm });
                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    imageUrl = uploadData.data?.urls?.[0] || imageUrl;
                }
                // If upload fails, proceed without image
            }

            const payload = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description || '',
                isActive: formData.isActive,
                sortOrder: parseInt(String(formData.sortOrder)),
                image: imageUrl,
            };

            if (isEdit) {
                const res = await adminFetch(`/admin/categories/${initialData._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to update category');
            } else {
                const res = await adminFetch('/admin/categories', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to create category');
            }

            router.push('/admin/categories');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{isEdit ? 'Edit Category' : 'Add New Category'}</h2>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Category Name *</label>
                    <input className={styles.input} required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} onBlur={generateSlug} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Slug *</label>
                    <input className={styles.input} required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea className={styles.textarea} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Sort Order</label>
                    <input className={styles.input} type="text" value={formData.sortOrder} onChange={e => setFormData({ ...formData, sortOrder: Number(e.target.value.replace(/\D/g, '')) })} />
                </div>

                <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                    <label className={styles.toggleLabel}>
                        <input type="checkbox" className={styles.toggleInput} checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} />
                        Active (Visible in menus)
                    </label>
                </div>

                {/* Image Upload Area */}
                <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                    <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>
                        {isEdit ? 'Update Category Image Cover' : 'Category Image Cover'}
                    </label>
                    {!newImage && (
                        <div
                            className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg className={styles.uploadIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p className={styles.uploadText}>Click or drag & drop image here</p>
                            <p className={styles.uploadHint}>High quality JPG, PNG, WEBP</p>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    )}

                    {newImage && (
                        <div className={styles.previewContainer}>
                            <img src={URL.createObjectURL(newImage)} className={styles.previewImg} alt="preview" />
                            <button type="button" className={styles.removeImgBtn} onClick={(e) => { e.stopPropagation(); removeNewImage(); }}>×</button>
                        </div>
                    )}
                </div>

                {isEdit && existingImage && !newImage && (
                    <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                        <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>Current Cover Image</label>
                        <div className={styles.previewContainer}>
                            <img src={existingImage} className={styles.previewImg} alt="existing" />
                            <button type="button" className={styles.removeImgBtn} onClick={() => removeExistingImage()}>×</button>
                        </div>
                        <p className={styles.uploadHint} style={{ marginTop: '0.5rem' }}>
                            Upload a new image above to replace this one. Remove to clear completely.
                        </p>
                    </div>
                )}

                <div className={styles.actions}>
                    <button type="button" className={styles.cancelBtn} onClick={() => router.push('/admin/categories')}>Cancel</button>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Category')}
                    </button>
                </div>
            </form>
        </div>
    );
}
