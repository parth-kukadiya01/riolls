'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userApi, ordersApi, addressesApi, wishlistApi, contactApi } from '@/lib/api';
import ProtectedImage from '@/components/ui/ProtectedImage';
import styles from './page.module.css';

type Tab = 'profile' | 'orders' | 'saved' | 'designs' | 'enquiries' | 'addresses';

const emptyAddress = { label: 'Home', fullName: '', address1: '', address2: '', city: '', postcode: '', country: '', isDefault: false };

export default function ProfilePage() {
    const { user, logout, loading: authLoading, refreshProfile } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [isEditing, setIsEditing] = useState(false);

    // Profile edit form
    const [editForm, setEditForm] = useState({ firstName: '', lastName: '', phone: '' });

    // Data for tabs
    const [orders, setOrders] = useState<any[]>([]);
    const [designs, setDesigns] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [tabLoading, setTabLoading] = useState(false);

    // Per-design inline inquiry state
    const [inquiryOpen, setInquiryOpen] = useState<Record<string, boolean>>({});
    const [inquiryMsg, setInquiryMsg] = useState<Record<string, string>>({});
    const [inquirySent, setInquirySent] = useState<Record<string, boolean>>({});

    // Address form state
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressForm, setAddressForm] = useState(emptyAddress);
    const [addressSaving, setAddressSaving] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [authLoading, user, router]);

    // Pre-fill edit form when user loads
    useEffect(() => {
        if (user) {
            setEditForm({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone ?? '',
            });
        }
    }, [user]);

    // Load tab data
    // ─── Tab data loading ──────────────────────────────────────────────
    const [lastFetch, setLastFetch] = useState<Record<string, number>>({});

    const fetchActiveTab = async (tab = activeTab, force = false) => {
        if (!user) return;
        // Debounce: skip if fetched within last 30s unless forced
        const now = Date.now();
        if (!force && lastFetch[tab] && now - lastFetch[tab] < 30_000) return;

        setTabLoading(true);
        try {
            if (tab === 'orders') {
                const res: any = await ordersApi.list();
                setOrders(Array.isArray(res.data) ? res.data : []);
            } else if (tab === 'saved') {
                const res: any = await wishlistApi.get();
                setWishlist(Array.isArray(res.data) ? res.data : []);
            } else if (tab === 'designs') {
                const res: any = await userApi.getDesigns();
                setDesigns(res.data ?? []);
            } else if (tab === 'enquiries') {
                const res: any = await userApi.getEnquiries();
                setEnquiries(res.data ?? []);
            } else if (tab === 'addresses') {
                const res: any = await addressesApi.list();
                setAddresses(res.data ?? []);
            }
            setLastFetch(prev => ({ ...prev, [tab]: Date.now() }));
        } catch (err) {
            console.error(`Failed to load ${tab}:`, err);
        } finally {
            setTabLoading(false);
        }
    };

    // Fetch on tab switch
    useEffect(() => {
        fetchActiveTab(activeTab, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, user]);

    // Auto-refresh when returning to this browser tab (e.g. from AI Studio)
    useEffect(() => {
        const onVisible = () => {
            if (document.visibilityState === 'visible') {
                fetchActiveTab(activeTab, false);
            }
        };
        document.addEventListener('visibilitychange', onVisible);
        return () => document.removeEventListener('visibilitychange', onVisible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, user]);


    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        await userApi.updateProfile(editForm);
        await refreshProfile();
        setIsEditing(false);
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddressSaving(true);
        try {
            await addressesApi.add(addressForm);
            const res: any = await addressesApi.list();
            setAddresses(res.data ?? []);
            setShowAddressForm(false);
            setAddressForm(emptyAddress);
        } catch (err) {
            console.error('Failed to add address:', err);
        } finally {
            setAddressSaving(false);
        }
    };

    const handleDeleteAddress = async (id: string) => {
        if (!confirm('Remove this address?')) return;
        try {
            await addressesApi.remove(id);
            setAddresses(prev => prev.filter((a: any) => a._id !== id));
        } catch (err) {
            console.error('Failed to delete address:', err);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (authLoading || !user) {
        return <div style={{ paddingTop: 'var(--nav-height)', textAlign: 'center', padding: '4rem' }}>Loading…</div>;
    }

    const formatPrice = (p: number) => `£ ${p.toLocaleString('en-GB')}`;
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Account Overview</h2>
                        {isEditing ? (
                            <form className={styles.editForm} onSubmit={handleSaveProfile}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>First Name</label>
                                    <input type="text" className={styles.input} value={editForm.firstName}
                                        onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Last Name</label>
                                    <input type="text" className={styles.input} value={editForm.lastName}
                                        onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input type="tel" className={styles.input} value={editForm.phone}
                                        onChange={e => setEditForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9+\s-]/g, '') }))} />
                                </div>
                                <div className={styles.formActions}>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.cardGroup}>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>Personal Details</h3>
                                        <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Name</span>
                                            <span className={styles.value}>{user.firstName} {user.lastName}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Email</span>
                                            <span className={styles.value}>{user.email}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Phone</span>
                                            <span className={styles.value}>{user.phone || '—'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'orders':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Order History</h2>
                        {tabLoading ? (
                            <p>Loading orders…</p>
                        ) : orders.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You haven&apos;t placed any orders yet.</p>
                                <Link href="/shop" className={styles.shopBtn}>Explore Collections</Link>
                            </div>
                        ) : (
                            <div className={styles.ordersList}>
                                {orders.map((o: any) => (
                                    <div key={o._id} className={styles.card}>
                                        {/* Order header */}
                                        <div className={styles.cardHeader}>
                                            <div>
                                                <h3 className={styles.cardTitle}>Order #{o.orderNumber}</h3>
                                                <span style={{ fontSize: '12px', color: 'var(--stone)' }}>{formatDate(o.createdAt)}</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: '11px', textTransform: 'capitalize', padding: '3px 10px', background: o.status === 'delivered' ? '#ecfdf5' : o.status === 'cancelled' ? '#fef2f2' : '#fef9ec', color: o.status === 'delivered' ? '#065f46' : o.status === 'cancelled' ? '#991b1b' : '#92400e', borderRadius: '20px', fontFamily: 'var(--font-sc)', letterSpacing: '0.1em' }}>{o.status}</span>
                                                <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px', fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}>{formatPrice(o.total)}</div>
                                            </div>
                                        </div>

                                        {/* Product items with images */}
                                        {o.items && o.items.length > 0 && (
                                            <div className={styles.orderItems}>
                                                {o.items.map((item: any, i: number) => (
                                                    <div key={i} className={styles.orderItem}>
                                                        <div className={styles.orderItemImg}>
                                                            {item.productImage ? (
                                                                <ProtectedImage
                                                                    src={item.productImage}
                                                                    alt={item.productName || 'Product'}
                                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <div style={{ width: '100%', height: '100%', background: 'var(--blush)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✦</div>
                                                            )}
                                                        </div>
                                                        <div className={styles.orderItemInfo}>
                                                            <div className={styles.orderItemName}>{item.productName || 'Jewellery Piece'}</div>
                                                            {item.metal && <div className={styles.orderItemMeta}>{item.metal}</div>}
                                                            {item.purity && <div className={styles.orderItemMeta}>{item.purity}</div>}
                                                            <div className={styles.orderItemMeta}>Qty: {item.quantity ?? 1}</div>
                                                            <div className={styles.orderItemPrice}>{formatPrice(item.price ?? 0)}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );

            case 'saved':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Saved Items</h2>
                        {tabLoading ? (
                            <p>Loading saved items…</p>
                        ) : wishlist.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You haven&apos;t saved any items yet.</p>
                                <Link href="/shop" className={styles.shopBtn}>Explore Collections</Link>
                            </div>
                        ) : (
                            <div className={styles.wishlistGrid}>
                                {wishlist.map((item: any) => {
                                    const product = item.product ?? item;
                                    const productId = product._id ?? item.productId;
                                    const itemKey = item._id ?? productId;

                                    // category and slug can be objects {name, slug} from the API
                                    const categoryObj = product.category;
                                    const categoryName = typeof categoryObj === 'object' && categoryObj !== null
                                        ? (categoryObj.name ?? 'Jewellery')
                                        : (categoryObj || 'Jewellery');
                                    const slugVal = typeof product.slug === 'object' && product.slug !== null
                                        ? product.slug.slug ?? product.slug.name ?? ''
                                        : (product.slug ?? '');
                                    const image = product.images?.[0];

                                    const handleUnsave = async (e: React.MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // Optimistic removal
                                        setWishlist(prev => prev.filter((w: any) => (w._id ?? w.productId) !== itemKey));
                                        try {
                                            await wishlistApi.remove(productId);
                                        } catch {
                                            // Re-fetch on failure
                                            const res = await wishlistApi.get();
                                            if (res.success) setWishlist((res.data as any[]) ?? []);
                                        }
                                    };

                                    return (
                                        <div key={itemKey} className={styles.wishCard}>
                                            {/* Image area — clicking navigates to product */}
                                            <Link href={slugVal ? `/product/${slugVal}` : '/shop'} className={styles.wishImg} style={{ display: 'block', position: 'relative' }}>
                                                {image ? (
                                                    <ProtectedImage
                                                        src={image}
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', background: product.gradient || 'var(--blush)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>✦</div>
                                                )}
                                                {/* Unsave button overlaid top-right */}
                                                <button
                                                    className={styles.wishUnsaveBtn}
                                                    onClick={handleUnsave}
                                                    title="Remove from saved"
                                                    aria-label="Remove from saved"
                                                >
                                                    ♥
                                                </button>
                                            </Link>
                                            {/* Info — also navigates */}
                                            <Link href={slugVal ? `/product/${slugVal}` : '/shop'} className={styles.wishInfo}>
                                                <span className={styles.wishCategory}>{categoryName}</span>
                                                <div className={styles.wishName}>{product.name}</div>
                                                <div className={styles.wishPrice}>
                                                    {product.price != null ? formatPrice(product.price) : 'Price Upon Request'}
                                                </div>
                                                <span className={styles.wishCta}>View Piece →</span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                );


            case 'designs':
                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Saved Designs</h2>
                            <button
                                className={styles.designRefreshBtn}
                                onClick={() => fetchActiveTab('designs', true)}
                                title="Refresh designs"
                                disabled={tabLoading}
                            >
                                {tabLoading ? '…' : '↻ Refresh'}
                            </button>
                        </div>
                        {tabLoading ? (
                            <p>Loading designs…</p>
                        ) : designs.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You have no saved bespoke designs.</p>
                                <Link href="/ai-studio/step-1" className={styles.shopBtn}>Open AI Studio</Link>
                            </div>
                        ) : (
                            <div className={styles.designsList}>
                                {designs.map((d: any) => {
                                    const allImgs: string[] = (
                                        d.allImages?.length ? d.allImages :
                                            d.selectedImage ? [d.selectedImage] : []
                                    );
                                    const [heroImg, alt1, alt2] = allImgs;
                                    const id = d._id;
                                    const isOpen = !!inquiryOpen[id];
                                    const isSent = !!inquirySent[id];

                                    const handleInquiry = async (e: React.FormEvent) => {
                                        e.preventDefault();
                                        try {
                                            await contactApi.submit({
                                                name: `${user!.firstName} ${user!.lastName}`,
                                                email: user!.email,
                                                subject: `Enquiry about Design Request #${d.requestNumber}`,
                                                message: inquiryMsg[id] || `I would like to enquire further about my design request #${d.requestNumber} (${d.pieceType || 'Jewellery'}).`,
                                            });
                                            setInquirySent(p => ({ ...p, [id]: true }));
                                            setInquiryOpen(p => ({ ...p, [id]: false }));
                                        } catch { /* keep open */ }
                                    };

                                    return (
                                        <div key={id} className={styles.designCard}>
                                            {/* ── Bespoke 3-image grid ───────────── */}
                                            <div className={styles.designImgGrid}>
                                                {/* Main selected image */}
                                                <div className={styles.designImgMain}>
                                                    {heroImg ? (
                                                        <ProtectedImage src={heroImg} alt={`Design ${d.requestNumber}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div className={styles.designHeroPlaceholder}>
                                                            <span style={{ fontSize: '40px' }}>✦</span>
                                                            <span style={{ fontFamily: 'var(--font-sc)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--stone)', marginTop: '8px' }}>NO PREVIEW YET</span>
                                                        </div>
                                                    )}
                                                    <span className={`${styles.designBadge} ${d.status === 'completed' ? styles.badgeGreen : d.status === 'rejected' ? styles.badgeRed : styles.badgeAmber}`}>
                                                        {d.status}
                                                    </span>
                                                </div>
                                                {/* Images 2 & 3 — alternative AI concepts */}
                                                <div className={styles.designImgAlts}>
                                                    <div className={styles.designImgAlt}>
                                                        {alt1 ? (
                                                            <ProtectedImage src={alt1} alt="Concept 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', background: 'var(--blush)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✦</div>
                                                        )}
                                                    </div>
                                                    <div className={styles.designImgAlt}>
                                                        {alt2 ? (
                                                            <ProtectedImage src={alt2} alt="Concept 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', background: 'var(--blush)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✦</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── Details ───────────────────────── */}
                                            <div className={styles.designDetails}>
                                                <div className={styles.designMeta}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span className={styles.designReqNum}>Request #{d.requestNumber}</span>
                                                        {d.pieceType && <span className={styles.designPieceTag}>{d.pieceType}</span>}
                                                    </div>
                                                    {d.createdAt && <span className={styles.designDate}>{formatDate(d.createdAt)}</span>}
                                                </div>

                                                <div className={styles.designGrid}>
                                                    {d.metal && (
                                                        <div className={styles.designField}>
                                                            <span className={styles.designFieldLabel}>Metal</span>
                                                            <span className={styles.designFieldValue}>{d.finalMetal || d.metal}</span>
                                                        </div>
                                                    )}
                                                    {d.stone && (
                                                        <div className={styles.designField}>
                                                            <span className={styles.designFieldLabel}>Stone</span>
                                                            <span className={styles.designFieldValue}>{d.stone}</span>
                                                        </div>
                                                    )}
                                                    {d.finish && (
                                                        <div className={styles.designField}>
                                                            <span className={styles.designFieldLabel}>Finish</span>
                                                            <span className={styles.designFieldValue}>{d.finish}</span>
                                                        </div>
                                                    )}
                                                    {d.engraving && (
                                                        <div className={styles.designField}>
                                                            <span className={styles.designFieldLabel}>Engraving</span>
                                                            <span className={styles.designFieldValue}>{d.engraving}</span>
                                                        </div>
                                                    )}
                                                    {(d.estimatedPriceLow || d.estimatedPriceHigh) && (
                                                        <div className={styles.designField} style={{ gridColumn: '1 / -1' }}>
                                                            <span className={styles.designFieldLabel}>Estimated Price</span>
                                                            <span className={styles.designFieldValue} style={{ color: 'var(--gold)', fontWeight: 600 }}>
                                                                £{d.estimatedPriceLow?.toLocaleString() ?? '—'} – £{d.estimatedPriceHigh?.toLocaleString() ?? '—'}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {d.notes && (
                                                        <div className={styles.designField} style={{ gridColumn: '1 / -1' }}>
                                                            <span className={styles.designFieldLabel}>Notes</span>
                                                            <span className={styles.designFieldValue} style={{ lineHeight: 1.5 }}>{d.notes}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* ── Inquiry ───────────────────── */}
                                                <div className={styles.designInquiryWrap}>
                                                    {isSent ? (
                                                        <p className={styles.designInquirySent}>✓ Enquiry sent — our team will be in touch within 48 hours.</p>
                                                    ) : isOpen ? (
                                                        <form className={styles.designInquiryForm} onSubmit={handleInquiry}>
                                                            <textarea
                                                                className={styles.designInquiryTextarea}
                                                                rows={3}
                                                                placeholder="Tell us what you'd like to discuss about this design…"
                                                                value={inquiryMsg[id] || ''}
                                                                onChange={e => setInquiryMsg(p => ({ ...p, [id]: e.target.value }))}
                                                            />
                                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                                <button type="button" className={styles.cancelBtn} style={{ fontSize: '12px', padding: '8px 16px' }}
                                                                    onClick={() => setInquiryOpen(p => ({ ...p, [id]: false }))}>Cancel</button>
                                                                <button type="submit" className={styles.saveBtn} style={{ fontSize: '12px', padding: '8px 20px' }}>Send Enquiry</button>
                                                            </div>
                                                        </form>
                                                    ) : (
                                                        <button className={styles.designInquiryBtn}
                                                            onClick={() => setInquiryOpen(p => ({ ...p, [id]: true }))}>
                                                            Make an Enquiry
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                );

            case 'enquiries':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>My Enquiries</h2>
                        {tabLoading ? (
                            <p>Loading enquiries…</p>
                        ) : enquiries.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You have no open enquiries.</p>
                                <Link href="/contact" className={styles.shopBtn}>Contact Us</Link>
                            </div>
                        ) : (
                            <div className={styles.cardGroup}>
                                {enquiries.map((e: any) => (
                                    <div key={e._id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>{e.subject}</h3>
                                            <span style={{ fontSize: '0.8rem', textTransform: 'capitalize', padding: '0.2rem 0.6rem', background: e.status === 'resolved' ? '#ecfdf5' : '#fef2f2', color: e.status === 'resolved' ? '#065f46' : '#991b1b', borderRadius: '4px' }}>
                                                {e.status}
                                            </span>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Date</span>
                                                <span className={styles.value}>{formatDate(e.createdAt)}</span>
                                            </div>
                                            <p style={{ margin: '1rem 0', fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>
                                                {e.message}
                                            </p>
                                            {e.adminNotes && (
                                                <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid var(--gold)', marginTop: '1rem' }}>
                                                    <span className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>Response from Riolls:</span>
                                                    <p style={{ margin: 0, fontSize: '0.875rem' }}>{e.adminNotes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );

            case 'addresses':
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Saved Addresses</h2>
                        </div>

                        {showAddressForm && (
                            <form className={styles.editForm} onSubmit={handleAddAddress} style={{ marginBottom: '2rem', maxWidth: '100%' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Label</label>
                                        <input className={styles.input} value={addressForm.label}
                                            onChange={e => setAddressForm(f => ({ ...f, label: e.target.value }))}
                                            placeholder="e.g. Home, Office" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Full Name</label>
                                        <input className={styles.input} value={addressForm.fullName}
                                            onChange={e => setAddressForm(f => ({ ...f, fullName: e.target.value }))}
                                            required />
                                    </div>
                                    <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                                        <label className={styles.label}>Address Line 1</label>
                                        <input className={styles.input} value={addressForm.address1}
                                            onChange={e => setAddressForm(f => ({ ...f, address1: e.target.value }))}
                                            required />
                                    </div>
                                    <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                                        <label className={styles.label}>Address Line 2 (Optional)</label>
                                        <input className={styles.input} value={addressForm.address2}
                                            onChange={e => setAddressForm(f => ({ ...f, address2: e.target.value }))} />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>City</label>
                                        <input className={styles.input} value={addressForm.city}
                                            onChange={e => setAddressForm(f => ({ ...f, city: e.target.value }))}
                                            required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Postcode</label>
                                        <input className={styles.input} value={addressForm.postcode}
                                            onChange={e => setAddressForm(f => ({ ...f, postcode: e.target.value }))}
                                            required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Country</label>
                                        <input className={styles.input} value={addressForm.country}
                                            onChange={e => setAddressForm(f => ({ ...f, country: e.target.value }))}
                                            required />
                                    </div>
                                    <div className={styles.inputGroup} style={{ justifyContent: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '1.2rem' }}>
                                            <input type="checkbox" checked={addressForm.isDefault}
                                                onChange={e => setAddressForm(f => ({ ...f, isDefault: e.target.checked }))} />
                                            <span className={styles.label} style={{ fontSize: '12px' }}>Set as default</span>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.formActions}>
                                    <button type="button" className={styles.cancelBtn}
                                        onClick={() => { setShowAddressForm(false); setAddressForm(emptyAddress); }}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles.saveBtn} disabled={addressSaving}>
                                        {addressSaving ? 'Saving…' : 'Save Address'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {tabLoading ? (
                            <p>Loading addresses…</p>
                        ) : addresses.length === 0 && !showAddressForm ? (
                            <div className={styles.emptyState}>
                                <p>You have no saved addresses yet.</p>
                                <button className={styles.shopBtn} onClick={() => setShowAddressForm(true)}>Add Your First Address</button>
                            </div>
                        ) : (
                            <div className={styles.cardGroup}>
                                {addresses.map((a: any) => (
                                    <div key={a._id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>{a.label ?? 'Address'}{a.isDefault && ' (Default)'}</h3>
                                            <button className={styles.editBtn} onClick={() => handleDeleteAddress(a._id)}
                                                style={{ color: 'var(--rose)', textDecoration: 'none', cursor: 'pointer' }}>
                                                Remove
                                            </button>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <p className={styles.addressLine}>{a.fullName}</p>
                                            <p className={styles.addressLine}>{a.address1}</p>
                                            {a.address2 && <p className={styles.addressLine}>{a.address2}</p>}
                                            <p className={styles.addressLine}>{a.city}</p>
                                            <p className={styles.addressLine}>{a.postcode}</p>
                                            <p className={styles.addressLine}>{a.country}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className={styles.page} style={{ paddingTop: 'calc(var(--nav-height) + 40px)' }}>
            <div className={styles.container}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.userInfo}>
                        <h1 className={styles.userName}>{user.firstName} {user.lastName}</h1>
                        <p className={styles.userEmail}>{user.email}</p>
                    </div>

                    <nav className={styles.nav}>
                        {(['profile', 'orders', 'saved', 'designs', 'enquiries', 'addresses'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? styles.navLinkActive : styles.navLink}
                                onClick={() => { setActiveTab(tab); setIsEditing(false); }}
                            >
                                {tab === 'profile' ? 'My Profile'
                                    : tab === 'orders' ? 'Order History'
                                        : tab === 'saved' ? 'Saved Items'
                                            : tab === 'designs' ? 'Saved Designs'
                                                : tab === 'enquiries' ? 'Enquiries'
                                                    : 'Addresses'}
                            </button>
                        ))}
                        <button className={styles.signOut} onClick={handleLogout}>Sign Out</button>
                    </nav>
                </aside>

                {/* Main */}
                <main className={styles.main}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
