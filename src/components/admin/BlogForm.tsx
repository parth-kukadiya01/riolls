'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminAuth';
import styles from './BlogForm.module.css';

interface BlogFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function BlogForm({ initialData = null, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        author: 'Riolls Atelier',
        category: 'Guides',
        isPublished: true,
        isFeatured: false,
        tags: ''
    });

    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                slug: initialData.slug || '',
                content: initialData.content || '',
                author: initialData.author || '',
                category: initialData.category || '',
                isPublished: initialData.isPublished ?? true,
                isFeatured: initialData.isFeatured || false,
                tags: initialData.tags ? initialData.tags.join(', ') : ''
            });

            if (initialData.coverImage) {
                setExistingImage(initialData.coverImage);
            }
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    };

    const generateSlug = () => {
        if (!formData.title) return;
        setFormData(f => ({ ...f, slug: f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                // Edit uses PUT with JSON
                const payload = {
                    ...formData,
                    tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                    coverImage: existingImage
                };

                const res = await adminFetch(`/blog/admin/${initialData._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || 'Failed to update post');
                }
            } else {
                // CREATE - uses multipart/form-data
                const submitData = new FormData();
                submitData.append('title', formData.title);
                submitData.append('slug', formData.slug);
                submitData.append('content', formData.content);
                submitData.append('author', formData.author);
                submitData.append('category', formData.category);
                submitData.append('isPublished', String(formData.isPublished));
                submitData.append('isFeatured', String(formData.isFeatured));

                const tagsList = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
                tagsList.forEach(t => submitData.append('tags', t));

                if (newImage) {
                    submitData.append('coverImage', newImage);
                }

                const res = await adminFetch(`/blog/admin`, {
                    method: 'POST',
                    body: submitData
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || 'Failed to create post');
                }
            }

            router.push('/admin/blog');
            router.refresh();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{isEdit ? 'Edit Post' : 'Write New Post'}</h2>

            <form onSubmit={handleSubmit} className={styles.grid}>
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.label}>Post Title *</label>
                    <input className={styles.input} required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} onBlur={generateSlug} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Slug *</label>
                    <input className={styles.input} required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <input className={styles.input} required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Guides" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Author</label>
                    <input className={styles.input} value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Tags (comma separated)</label>
                    <input className={styles.input} value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="engagement, diamonds, education" />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.label}>Content (Markdown/HTML Support)</label>
                    <textarea
                        className={styles.textarea}
                        required
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your blog post content here. You can use Markdown or HTML tags."
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.toggleLabel}>
                        <input type="checkbox" className={styles.toggleInput} checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} />
                        Published
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.toggleLabel}>
                        <input type="checkbox" className={styles.toggleInput} checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} />
                        Featured Post
                    </label>
                </div>

                {/* Image Upload Area */}
                {!isEdit && (
                    <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                        <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>Cover Image</label>
                        {!newImage && (
                            <div
                                className={styles.uploadArea}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <svg className={styles.uploadIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <p className={styles.uploadText}>Click to upload cover image</p>
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
                                <button type="button" className={styles.removeImgBtn} onClick={() => setNewImage(null)}>×</button>
                            </div>
                        )}
                    </div>
                )}

                {isEdit && existingImage && (
                    <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                        <label className={styles.label}>Current Cover Image</label>
                        <div className={styles.previewContainer}>
                            <img src={existingImage} className={styles.previewImg} alt="existing" />
                            <button type="button" className={styles.removeImgBtn} onClick={() => setExistingImage(null)}>×</button>
                        </div>
                    </div>
                )}

                <div className={styles.fullWidth}>
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={() => router.push('/admin/blog')}>Cancel</button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Publish Post')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
