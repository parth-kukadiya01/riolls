'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/adminAuth';
import styles from './ProductForm.module.css';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

const GOLD_OPTIONS = ['Yellow Gold', 'Rose Gold', 'White Gold', ''];

const COLLECTION_OPTIONS = ['Celestine Collection', 'Aurora Series', 'Tempest Line'];
const OCCASION_OPTIONS = ['Bridal & Engagement', 'Anniversary Gifts', 'High Jewellery'];

export default function ProductForm({ initialData = null, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '', slug: '', categoryId: '', price: '',
        price9k: '', price14k: '', price18k: '', price22k: '',
        metal: '', stone: '', badge: '', description: '', stoneDetail: '',
        isFeatured: false, isActive: true, sortOrder: 0,
        engravingAvailable: true, maxEngravingLength: 25,
        minStoneSize: 0.5, maxStoneSize: 3.0,
        deliveryInfo: 'Free insured worldwide delivery within 7-10 working days.',
        careInstructions: 'Store in the provided pouch. Clean gently with a soft cloth.',
        availableMetals: '',
        weight: '',
        additionalCharge: '0'
    });

    // Image logic
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Fetch categories for the dropdown
        adminFetch('/categories').then(res => res.json()).then(data => {
            if (data.success && data.data) {
                setCategories(data.data);
                if (!initialData && data.data.length > 0) {
                    setFormData(f => ({ ...f, categoryId: data.data[0]._id }));
                }
            }
        });

        if (initialData) {
            setFormData({
                name: initialData.name || '',
                slug: initialData.slug || '',
                categoryId: initialData.category?._id || '',
                price: initialData.price === null ? '' : String(initialData.price),
                price9k: initialData.price9k === null ? '' : String(initialData.price9k),
                price14k: initialData.price14k === null ? '' : String(initialData.price14k),
                price18k: initialData.price18k === null ? '' : String(initialData.price18k),
                price22k: initialData.price22k === null ? '' : String(initialData.price22k),
                metal: initialData.metal || '',
                stone: initialData.stone || '',
                badge: initialData.badge || '',
                description: initialData.description || '',
                stoneDetail: initialData.stoneDetail || '',
                isFeatured: initialData.isFeatured || false,
                isActive: initialData.isActive ?? true,
                sortOrder: initialData.sortOrder || 0,
                engravingAvailable: initialData.engravingAvailable ?? true,
                maxEngravingLength: initialData.maxEngravingLength || 25,
                minStoneSize: initialData.minStoneSize || 0.5,
                maxStoneSize: initialData.maxStoneSize || 3.0,
                deliveryInfo: initialData.deliveryInfo || '',
                careInstructions: initialData.careInstructions || '',
                availableMetals: initialData.availableMetals ? initialData.availableMetals.join(', ') : '',
                weight: initialData.weight === null ? '' : String(initialData.weight),
                additionalCharge: initialData.additionalCharge === null ? '0' : String(initialData.additionalCharge)
            });

            if (initialData.images) {
                setExistingImages(initialData.images);
            }
        }
    }, [initialData]);

    useEffect(() => {
        const metal = formData.metal;
        let syncedPrice = '';
        if (metal === '9k') syncedPrice = formData.price9k;
        else if (metal === '14k') syncedPrice = formData.price14k;
        else if (metal === '18k') syncedPrice = formData.price18k;
        else if (metal === '22k') syncedPrice = formData.price22k;

        if (syncedPrice && syncedPrice !== formData.price) {
            setFormData(prev => ({ ...prev, price: syncedPrice }));
        }
    }, [formData.metal, formData.price9k, formData.price14k, formData.price18k, formData.price22k]);

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
            const filesArray = Array.from(e.dataTransfer.files);
            setNewImages(prev => [...prev, ...filesArray]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...filesArray]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const generateSlug = () => {
        if (!formData.name) return;
        setFormData(f => ({ ...f, slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    };

    const toggleMetal = (metal: string) => {
        const currentMetals = formData.availableMetals.split(',').map(m => m.trim()).filter(Boolean);
        const hasMetal = currentMetals.includes(metal);
        let newMetals;
        if (hasMetal) {
            newMetals = currentMetals.filter(m => m !== metal);
        } else {
            newMetals = [...currentMetals, metal];
        }
        setFormData({ ...formData, availableMetals: newMetals.join(', ') });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.categoryId && categories.length > 0) {
            setError('Please select a category');
            setLoading(false);
            return;
        }

        try {
            if (isEdit) {
                // Edit uses PUT with JSON, but wait...
                // If we have new images, converting mixed multipart and JSON is tough.
                // Looking at products.py `update_product` accepts `body: dict`. It does not accept Form(...) so no file uploads directly to PUT.
                // Wait! Let's check `backend/app/routers/products.py` update_product signature.
                // It says: `async def update_product(product_id: str, body: dict, _=Depends(get_current_admin)):`
                // Which means the PUT expects a JSON body, NOT multipart/form-data.
                // And for POST `/admin/products`:
                // `async def create_product(name: str = Form(...), ..., images: List[UploadFile] = File(default=[]), ...)`
                // So creation uses multipart/form-data.
                // If it's an edit, we upload images via a separate route or send them?
                // `products.py` has no separate upload route? No, `main.py` has `app.include_router(upload.router, prefix="/api/v1/upload")`.
                // If it's `isEdit`, we should upload new images first via `/api/v1/upload` if it exists, OR just pass what we can.
                // Let's assume the user will need to re-upload if they want to change using PUT? 
                // Ah, `app/routers/upload.py` probably contains a standalone upload endpoint. We can upload images there, get URLs, then PUT the JSON body.

                // If we have new images to upload during an edit, we upload them first to /upload
                let uploadedImageUrls: string[] = [];
                if (newImages.length > 0) {
                    const imgForm = new FormData();
                    newImages.forEach(file => imgForm.append('images', file));
                    imgForm.append('folder', 'products');

                    const uploadRes = await adminFetch('/upload', { method: 'POST', body: imgForm });
                    if (!uploadRes.ok) {
                        throw new Error('Failed to upload new images');
                    }
                    const uploadData = await uploadRes.json();
                    uploadedImageUrls = uploadData.data?.urls || [];
                }

                // Actually, I can construct the payload:
                const payload = {
                    ...formData,
                    price: formData.price ? parseFloat(formData.price) : null,
                    price9k: formData.price9k ? parseFloat(formData.price9k) : null,
                    price14k: formData.price14k ? parseFloat(formData.price14k) : null,
                    price18k: formData.price18k ? parseFloat(formData.price18k) : null,
                    price22k: formData.price22k ? parseFloat(formData.price22k) : null,
                    sortOrder: parseInt(String(formData.sortOrder)),
                    maxEngravingLength: parseInt(String(formData.maxEngravingLength)),
                    minStoneSize: parseFloat(String(formData.minStoneSize)),
                    maxStoneSize: parseFloat(String(formData.maxStoneSize)),
                    weight: formData.weight ? parseFloat(formData.weight) : null,
                    additionalCharge: formData.additionalCharge ? parseFloat(formData.additionalCharge) : 0,
                    availableMetals: formData.availableMetals.split(',').map(m => m.trim()).filter(Boolean),
                    images: [...existingImages, ...uploadedImageUrls] // Combine existing and newly uploaded URLs
                };

                const res = await adminFetch(`/admin/products/${initialData._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to update product');

            } else {
                // CREATE - uses multipart/form-data
                const submitData = new FormData();
                submitData.append('name', formData.name);
                submitData.append('slug', formData.slug);
                submitData.append('categoryId', formData.categoryId || categories[0]?._id);
                if (formData.price) submitData.append('price', formData.price);
                if (formData.price9k) submitData.append('price9k', formData.price9k);
                if (formData.price14k) submitData.append('price14k', formData.price14k);
                if (formData.price18k) submitData.append('price18k', formData.price18k);
                if (formData.price22k) submitData.append('price22k', formData.price22k);
                submitData.append('metal', formData.metal || '18k Gold');
                submitData.append('stone', formData.stone || 'Diamond');
                if (formData.badge) submitData.append('badge', formData.badge);
                submitData.append('description', formData.description || '.');
                submitData.append('stoneDetail', formData.stoneDetail || '.');
                submitData.append('isFeatured', String(formData.isFeatured));
                submitData.append('isActive', String(formData.isActive));
                submitData.append('sortOrder', String(formData.sortOrder));
                submitData.append('engravingAvailable', String(formData.engravingAvailable));
                submitData.append('maxEngravingLength', String(formData.maxEngravingLength));
                submitData.append('minStoneSize', String(formData.minStoneSize));
                submitData.append('maxStoneSize', String(formData.maxStoneSize));
                submitData.append('deliveryInfo', formData.deliveryInfo);
                submitData.append('careInstructions', formData.careInstructions);
                if (formData.weight) submitData.append('weight', formData.weight);
                if (formData.additionalCharge) submitData.append('additionalCharge', formData.additionalCharge);

                const metals = formData.availableMetals.split(',').map(m => m.trim()).filter(Boolean);
                metals.forEach(m => submitData.append('availableMetals', m));

                newImages.forEach(file => {
                    submitData.append('images', file);
                });

                const res = await adminFetch(`/admin/products`, {
                    method: 'POST',
                    body: submitData // Fetch will omit Content-Type, allowing boundary to be set automatically
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to create product');
            }

            router.push('/admin/products');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.grid}>
                {/* Basic Info */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Product Name *</label>
                    <input className={styles.input} required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} onBlur={generateSlug} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Slug *</label>
                    <input className={styles.input} required value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Category *</label>
                    <select className={styles.select} value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div className={styles.optionGroupLabel} style={{ marginBottom: '1rem' }}>Pricing Strategy</div>
                    <div className={styles.formGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price (Main) $</label>
                            <input className={styles.input} type="text" placeholder="POA" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value.replace(/[^0-9.]/g, '') })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price (9k) $</label>
                            <input className={styles.input} type="text" value={formData.price9k} onChange={e => setFormData({ ...formData, price9k: e.target.value.replace(/[^0-9.]/g, '') })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price (14k) $</label>
                            <input className={styles.input} type="text" value={formData.price14k} onChange={e => setFormData({ ...formData, price14k: e.target.value.replace(/[^0-9.]/g, '') })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price (18k) $</label>
                            <input className={styles.input} type="text" value={formData.price18k} onChange={e => setFormData({ ...formData, price18k: e.target.value.replace(/[^0-9.]/g, '') })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price (22k) $</label>
                            <input className={styles.input} type="text" value={formData.price22k} onChange={e => setFormData({ ...formData, price22k: e.target.value.replace(/[^0-9.]/g, '') })} />
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.label}>Description *</label>
                    <textarea className={styles.textarea} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>

                {/* Attributes */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Primary Metal *</label>
                    <select
                        className={styles.input}
                        required
                        value={formData.metal}
                        onChange={e => setFormData({ ...formData, metal: e.target.value })}
                    >
                        <option value="">Select Metal</option>
                        <option value="9k">9k</option>
                        <option value="14k">14k</option>
                        <option value="18k">18k</option>
                        <option value="22k">22k</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Primary Stone *</label>
                    <select
                        className={styles.input}
                        required
                        value={formData.stone}
                        onChange={e => setFormData({ ...formData, stone: e.target.value })}
                    >
                        <option value="">Select Stone</option>
                        <option value="Diamond">Diamond</option>
                        <option value="Lab Diamond">Lab Diamond</option>
                        <option value="Moissanite">Moissanite</option>
                        <option value="CZ">CZ</option>
                    </select>
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label className={styles.label}>Stone Detail</label>
                    <textarea
                        className={styles.textarea}
                        style={{ minHeight: '80px' }}
                        value={formData.stoneDetail}
                        onChange={e => setFormData({ ...formData, stoneDetail: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Available Metals (comma separated)</label>
                    <input
                        className={styles.input}
                        value={formData.availableMetals}
                        onChange={e => setFormData({ ...formData, availableMetals: e.target.value })}
                        placeholder="18k Yellow Gold"
                    />
                    <div className={styles.metalOptions}>
                        {GOLD_OPTIONS.map(metal => (
                            <span
                                key={metal}
                                className={`${styles.metalTag} ${formData.availableMetals.split(',').map(m => m.trim()).includes(metal) ? styles.metalTagActive : ''}`}
                                onClick={() => toggleMetal(metal)}
                            >
                                {metal}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Badge & Collections</label>
                    <select
                        className={styles.input}
                        value={formData.badge}
                        onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    >
                        <option value="">None</option>
                        <option value="New In">New In</option>
                        <option value="Last Piece">Last Piece</option>
                        <option value="Best Seller">Best Seller</option>
                    </select>
                    <div className={styles.optionGroup}>
                        <div className={styles.optionGroupLabel}>Collections</div>
                        <div className={styles.metalOptions}>
                            {COLLECTION_OPTIONS.map(opt => (
                                <span
                                    key={opt}
                                    className={`${styles.metalTag} ${formData.badge === opt ? styles.metalTagActive : ''}`}
                                    onClick={() => setFormData({ ...formData, badge: formData.badge === opt ? '' : opt })}
                                >
                                    {opt}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.optionGroup}>
                        <div className={styles.optionGroupLabel}>By Occasion</div>
                        <div className={styles.metalOptions}>
                            {OCCASION_OPTIONS.map(opt => (
                                <span
                                    key={opt}
                                    className={`${styles.metalTag} ${formData.badge === opt ? styles.metalTagActive : ''}`}
                                    onClick={() => setFormData({ ...formData, badge: formData.badge === opt ? '' : opt })}
                                >
                                    {opt}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Specifics */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Min Stone Size (ct)</label>
                    <input className={styles.input} type="text" value={formData.minStoneSize} onChange={e => setFormData({ ...formData, minStoneSize: Number(e.target.value.replace(/[^0-9.]/g, '')) })} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Max Stone Size (ct)</label>
                    <input className={styles.input} type="text" value={formData.maxStoneSize} onChange={e => setFormData({ ...formData, maxStoneSize: Number(e.target.value.replace(/[^0-9.]/g, '')) })} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Metal Weight (g)</label>
                    <input className={styles.input} type="text" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value.replace(/[^0-9.]/g, '') })} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Additional Charge ($)</label>
                    <input className={styles.input} type="text" value={formData.additionalCharge} onChange={e => setFormData({ ...formData, additionalCharge: e.target.value.replace(/[^0-9.]/g, '') })} />
                </div>

                {/* Toggles */}
                <div className={styles.formGroup} style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}>
                    {/* Replaced by Featured tag above, but keeping for layout if needed or just remove */}
                    <label className={styles.toggleLabel}>
                        <input type="checkbox" className={styles.toggleInput} checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} />
                        Featured Product
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.toggleLabel}>
                        <input type="checkbox" className={styles.toggleInput} checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} />
                        Active (Visible on website)
                    </label>
                </div>

                {/* Image Upload Area */}
                <div className={styles.fullWidth}>
                    <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>
                        {isEdit ? 'Add More Product Images' : 'Product Images'}
                    </label>
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
                        <p className={styles.uploadText}>Click or drag & drop images here</p>
                        <p className={styles.uploadHint}>High quality JPG, PNG, WEBP</p>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>

                    {newImages.length > 0 && (
                        <div className={styles.previewGrid}>
                            {newImages.map((file, idx) => (
                                <div key={idx} className={styles.imagePreview}>
                                    <img src={URL.createObjectURL(file)} className={styles.previewImg} alt="preview" />
                                    <button type="button" className={styles.removeImgBtn} onClick={(e) => { e.stopPropagation(); removeNewImage(idx); }}>×</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {isEdit && existingImages.length > 0 && (
                    <div className={styles.fullWidth}>
                        <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>Current Images</label>
                        <div className={styles.previewGrid}>
                            {existingImages.map((img, idx) => (
                                <div key={idx} className={styles.imagePreview}>
                                    <img src={img} className={styles.previewImg} alt="existing" />
                                    <button type="button" className={styles.removeImgBtn} onClick={() => removeExistingImage(idx)}>×</button>
                                </div>
                            ))}
                        </div>
                        <p className={styles.uploadHint} style={{ marginTop: '0.5rem' }}>
                            Upload new images above to add more. Remove current images to delete them completely.
                        </p>
                    </div>
                )}

                <div className={styles.fullWidth} style={{ marginTop: '1.5rem' }}>
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={() => router.push('/admin/products')}>Cancel</button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Product')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
