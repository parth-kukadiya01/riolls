'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

type Tab = 'profile' | 'orders' | 'designs' | 'addresses';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [isEditing, setIsEditing] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Account Overview</h2>

                        {isEditing ? (
                            <form className={styles.editForm} onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Full Name</label>
                                    <input type="text" className={styles.input} defaultValue="Jane Doe" required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email Address</label>
                                    <input type="email" className={styles.input} defaultValue="jane.doe@example.com" required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Phone Number</label>
                                    <input type="tel" className={styles.input} defaultValue="+44 7700 900077" />
                                </div>
                                <div className={styles.formActions}>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.cardGroup}>
                                {/* Personal Details Card */}
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>Personal Details</h3>
                                        <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Name</span>
                                            <span className={styles.value}>Jane Doe</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Email</span>
                                            <span className={styles.value}>jane.doe@example.com</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Phone</span>
                                            <span className={styles.value}>+44 7700 900077</span>
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
                        <div className={styles.ordersList}>
                            <div className={styles.emptyState}>
                                <p>You haven't placed any orders yet.</p>
                                <Link href="/shop" className={styles.shopBtn}>Explore Collections</Link>
                            </div>
                        </div>
                    </>
                );
            case 'designs':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Saved Designs</h2>
                        <div className={styles.ordersList}>
                            <div className={styles.emptyState}>
                                <p>You have no saved bespoke designs or AI Studio creations.</p>
                                <Link href="/ai-studio/step-1" className={styles.shopBtn}>Open AI Studio</Link>
                            </div>
                        </div>
                    </>
                );
            case 'addresses':
                return (
                    <>
                        <h2 className={styles.sectionTitle}>Saved Addresses</h2>
                        <div className={styles.cardGroup}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>Default Address</h3>
                                    <button className={styles.editBtn}>Edit</button>
                                </div>
                                <div className={styles.cardBody}>
                                    <p className={styles.addressLine}>Jane Doe</p>
                                    <p className={styles.addressLine}>123 Mayfair Boulevard</p>
                                    <p className={styles.addressLine}>London</p>
                                    <p className={styles.addressLine}>W1J 8DD</p>
                                    <p className={styles.addressLine}>United Kingdom</p>
                                </div>
                            </div>
                            <div className={styles.card} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderStyle: 'dashed' }}>
                                <span className={styles.addAddressText}>+ Add New Address</span>
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.page} style={{ paddingTop: 'calc(var(--nav-height) + 40px)' }}>
            <div className={styles.container}>
                {/* Sidebar / Nav */}
                <aside className={styles.sidebar}>
                    <div className={styles.userInfo}>
                        <h1 className={styles.userName}>Jane Doe</h1>
                        <p className={styles.userEmail}>jane.doe@example.com</p>
                    </div>

                    <nav className={styles.nav}>
                        <button
                            className={activeTab === 'profile' ? styles.navLinkActive : styles.navLink}
                            onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
                        >
                            My Profile
                        </button>
                        <button
                            className={activeTab === 'orders' ? styles.navLinkActive : styles.navLink}
                            onClick={() => { setActiveTab('orders'); setIsEditing(false); }}
                        >
                            Order History
                        </button>
                        <button
                            className={activeTab === 'designs' ? styles.navLinkActive : styles.navLink}
                            onClick={() => { setActiveTab('designs'); setIsEditing(false); }}
                        >
                            Saved Designs
                        </button>
                        <button
                            className={activeTab === 'addresses' ? styles.navLinkActive : styles.navLink}
                            onClick={() => { setActiveTab('addresses'); setIsEditing(false); }}
                        >
                            Addresses
                        </button>
                        <Link href="/login" className={styles.signOut}>Sign Out</Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className={styles.main}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
