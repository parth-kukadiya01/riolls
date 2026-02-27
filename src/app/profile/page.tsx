'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userApi, ordersApi, addressesApi } from '@/lib/api';
import styles from './page.module.css';

type Tab = 'profile' | 'orders' | 'designs' | 'enquiries' | 'addresses';

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
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [tabLoading, setTabLoading] = useState(false);

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
    useEffect(() => {
        if (!user) return;
        setTabLoading(true);
        const load = async () => {
            try {
                if (activeTab === 'orders') {
                    const res: any = await ordersApi.list();
                    setOrders(Array.isArray(res.data) ? res.data : []);
                } else if (activeTab === 'designs') {
                    const res: any = await userApi.getDesigns();
                    setDesigns(res.data ?? []);
                } else if (activeTab === 'enquiries') {
                    const res: any = await userApi.getEnquiries();
                    setEnquiries(res.data ?? []);
                } else if (activeTab === 'addresses') {
                    const res: any = await addressesApi.list();
                    setAddresses(res.data ?? []);
                }
            } catch (err) {
                console.error(`Failed to load ${activeTab}:`, err);
            } finally {
                setTabLoading(false);
            }
        };
        load();
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
                                        onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
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
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>Order #{o.orderNumber}</h3>
                                            <span style={{ fontSize: '0.8rem', textTransform: 'capitalize', padding: '0.2rem 0.6rem', background: '#f4ede4', borderRadius: '4px' }}>{o.status}</span>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Date</span>
                                                <span className={styles.value}>{formatDate(o.createdAt)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Total</span>
                                                <span className={styles.value}>{formatPrice(o.total)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Items</span>
                                                <span className={styles.value}>{o.items?.length ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );

            case 'designs':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Saved Designs</h2>
                        {tabLoading ? (
                            <p>Loading designs…</p>
                        ) : designs.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You have no saved bespoke designs.</p>
                                <Link href="/ai-studio/step-1" className={styles.shopBtn}>Open AI Studio</Link>
                            </div>
                        ) : (
                            <div className={styles.cardGroup}>
                                {designs.map((d: any) => (
                                    <div key={d._id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>#{d.requestNumber}</h3>
                                            <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{d.status}</span>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}><span className={styles.label}>Type</span><span className={styles.value}>{d.pieceType}</span></div>
                                            <div className={styles.infoRow}><span className={styles.label}>Metal</span><span className={styles.value}>{d.metal}</span></div>
                                            <div className={styles.infoRow}><span className={styles.label}>Est. Price</span><span className={styles.value}>£{d.estimatedPriceLow?.toLocaleString()} – £{d.estimatedPriceHigh?.toLocaleString()}</span></div>

                                            {/* AI Generated / Reference Images */}
                                            {d.styleProfile?.referenceImages && d.styleProfile.referenceImages.length > 0 && (
                                                <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                    <span className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>AI Generated / Reference Images</span>
                                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                        {d.styleProfile.referenceImages.map((img: string, i: number) => (
                                                            <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                                                                <img src={img} alt="Design reference" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
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
                        {(['profile', 'orders', 'designs', 'enquiries', 'addresses'] as Tab[]).map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? styles.navLinkActive : styles.navLink}
                                onClick={() => { setActiveTab(tab); setIsEditing(false); }}
                            >
                                {tab === 'profile' ? 'My Profile' : tab === 'orders' ? 'Order History' : tab === 'designs' ? 'Saved Designs' : tab === 'enquiries' ? 'Enquiries' : 'Addresses'}
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
