'use client';

import { useEffect, useState, useRef } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface Banner {
    id: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image: string;
}

export default function AdminCMS() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // To handle new image uploads before saving
    const [newImages, setNewImages] = useState<Record<string, File>>({});

    // Create multiple refs programmatically might be complex, use a simple map of ref functions or just direct DOM manipulation if really needed, but better to use state index for active upload.
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await adminFetch('/admin/cms/banners');
                const json = await res.json();

                if (res.ok && json.data && json.data.length > 0) {
                    setBanners(json.data[0].heroElements || []);
                } else {
                    // Initialize empty if nothing exists
                    setBanners([
                        { id: '1', title: '', subtitle: '', ctaText: '', ctaLink: '', image: '' },
                        { id: '2', title: '', subtitle: '', ctaText: '', ctaLink: '', image: '' },
                        { id: '3', title: '', subtitle: '', ctaText: '', ctaLink: '', image: '' },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const handleTextChange = (id: string, field: keyof Banner, value: string) => {
        setBanners(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    const triggerFileInput = (id: string) => {
        setActiveUploadId(id);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && activeUploadId) {
            setNewImages({
                ...newImages,
                [activeUploadId]: e.target.files[0]
            });
            // Reset input so choosing same file again triggers
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccessMsg('');

        try {
            // Because we have files, we must use FormData
            const formData = new FormData();

            // The backend expects hero elements to be updated. 
            // In `cms.py`, `PUT /admin/cms/banners` accepts FormData with indexes.

            banners.forEach((banner, idx) => {
                formData.append(`title_${idx}`, banner.title);
                formData.append(`subtitle_${idx}`, banner.subtitle);
                formData.append(`ctaText_${idx}`, banner.ctaText);
                formData.append(`ctaLink_${idx}`, banner.ctaLink);
                formData.append(`existingImage_${idx}`, banner.image);

                if (newImages[banner.id]) {
                    formData.append(`image_${idx}`, newImages[banner.id]);
                }
            });

            // Need to specify how many elements there are
            formData.append('count', banners.length.toString());

            const res = await adminFetch('/admin/cms/banners', {
                method: 'PUT',
                body: formData
            });

            const json = await res.json();
            if (res.ok) {
                setSuccessMsg('Homepage banners updated successfully!');
                // Update local state with new URLs returned from server (if any)
                // For simplicity, just clearing newImages and showing success.
                // In full implementation, server would return updated full object.
                if (json.data && json.data.heroElements) {
                    setBanners(json.data.heroElements);
                }
                setNewImages({});
                setTimeout(() => setSuccessMsg(''), 5000);
            } else {
                throw new Error(json.message || 'Failed to update banners');
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading CMS data...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Content Management</h1>
                    <p className={styles.subtitle}>Update homepage banners and hero images.</p>
                </div>
            </div>

            {successMsg && (
                <div className={styles.successMessage}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {successMsg}
                </div>
            )}

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Homepage Carousel</h2>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {banners.map((banner, index) => {
                    const previewSrc = newImages[banner.id] ? URL.createObjectURL(newImages[banner.id]) : banner.image;

                    return (
                        <div className={styles.bannerSection} key={banner.id}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.sectionTitle}>Slide {index + 1}</div>
                            </div>

                            <div className={styles.formGrid}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Heading</label>
                                        <input
                                            className={styles.input}
                                            value={banner.title}
                                            onChange={(e) => handleTextChange(banner.id, 'title', e.target.value)}
                                            placeholder="e.g. Timeless Elegance"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Subheading</label>
                                        <textarea
                                            className={styles.textarea}
                                            value={banner.subtitle}
                                            onChange={(e) => handleTextChange(banner.id, 'subtitle', e.target.value)}
                                            placeholder="Discover our new collection..."
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>CTA Button Text</label>
                                            <input
                                                className={styles.input}
                                                value={banner.ctaText}
                                                onChange={(e) => handleTextChange(banner.id, 'ctaText', e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Link Target</label>
                                            <input
                                                className={styles.input}
                                                value={banner.ctaLink}
                                                onChange={(e) => handleTextChange(banner.id, 'ctaLink', e.target.value)}
                                                placeholder="/shop/category..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className={styles.formGroup} style={{ height: '100%' }}>
                                        <label className={styles.label} style={{ marginBottom: '0.5rem' }}>Hero Image Background</label>
                                        {previewSrc ? (
                                            <div className={styles.previewContainer}>
                                                <img src={previewSrc} alt={`Slide ${index + 1}`} className={styles.previewImg} />
                                                <button type="button" className={styles.changeImgBtn} onClick={() => triggerFileInput(banner.id)}>
                                                    Change Image
                                                </button>
                                                {newImages[banner.id] && (
                                                    <div className={styles.overlayInfo}>Unsaved new image</div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className={styles.uploadArea} onClick={() => triggerFileInput(banner.id)}>
                                                <svg className={styles.uploadIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                    <polyline points="17 8 12 3 7 8"></polyline>
                                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                                </svg>
                                                <p style={{ fontSize: '0.875rem', color: '#666' }}>Click to upload banner image</p>
                                                <p style={{ fontSize: '0.75rem', color: '#999' }}>Recommended: 1920x1080px (WEBP/JPG)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className={styles.actions}>
                    <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving Changes...' : 'Publish Content'}
                    </button>
                </div>
            </div>
        </div>
    );
}
