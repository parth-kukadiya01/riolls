'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './MobileNav.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export default function MobileNav({ isOpen, onClose }: Props) {
    const { totalItems, openCart } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggle = (section: string) =>
        setExpanded(prev => prev === section ? null : section);

    const handleLogout = () => {
        logout();
        onClose();
        router.push('/');
    };

    return (
        <>
            {/* Backdrop */}
            <div className={`${styles.backdrop} ${isOpen ? styles.open : ''}`} onClick={onClose} />

            {/* Slide-in panel */}
            <nav className={`${styles.overlay} ${isOpen ? styles.open : ''}`} aria-label="Mobile navigation">

                {/* ── Header ── */}
                <div className={styles.header}>
                    <button className={styles.iconBtn} onClick={onClose} aria-label="Close menu">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <Link href="/" className={styles.headerLogo} onClick={onClose}>RIOLLS JEWELS</Link>
                    <button className={styles.iconBtn} onClick={() => { onClose(); openCart(); }} aria-label="Cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </button>
                </div>

                {/* ── Scrollable nav items ── */}
                <div className={styles.items}>

                    {/* AI Studio — featured pill */}
                    <div className={styles.featuredItem}>
                        <Link href="/ai-studio/step-1" className={styles.aiLink} onClick={onClose}>
                            <span className={styles.aiIcon}>✦</span>
                            AI Studio
                            <span className={styles.aiTag}>New</span>
                        </Link>
                    </div>

                    <div className={styles.divider} />

                    {/* Shop */}
                    <div className={styles.item}>
                        <button className={styles.mainLink} onClick={() => toggle('shop')}>
                            <span>Shop</span>
                            <span className={`${styles.chevron} ${expanded === 'shop' ? styles.chevronOpen : ''}`}><Chevron /></span>
                        </button>
                        <div className={`${styles.subItems} ${expanded === 'shop' ? styles.subItemsOpen : ''}`}>
                            <Link href="/shop?cat=rings" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Rings</Link>
                            <Link href="/shop?cat=necklaces" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Necklaces</Link>
                            <Link href="/shop?cat=earrings" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Earrings</Link>
                            <Link href="/shop?cat=bracelets" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Bracelets</Link>
                            <Link href="/shop" className={`${styles.subLink} ${styles.subLinkAll}`} onClick={onClose}>View All →</Link>
                        </div>
                    </div>

                    {/* Collections */}
                    <div className={styles.item}>
                        <button className={styles.mainLink} onClick={() => toggle('col')}>
                            <span>Collections</span>
                            <span className={`${styles.chevron} ${expanded === 'col' ? styles.chevronOpen : ''}`}><Chevron /></span>
                        </button>
                        <div className={`${styles.subItems} ${expanded === 'col' ? styles.subItemsOpen : ''}`}>
                            <Link href="/shop?badge=New+In" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />New In</Link>
                            <Link href="/shop?badge=Last+Piece" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Last Pieces</Link>
                            <Link href="/shop?badge=Best+Seller" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Best Sellers</Link>
                            <Link href="/shop?badge=Bridal" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Bridal &amp; Engagement</Link>
                            <Link href="/shop?badge=High+Jewellery" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />High Jewellery</Link>
                        </div>
                    </div>

                    {/* Bespoke */}
                    <div className={styles.item}>
                        <Link href="/bespoke" className={styles.mainLink} onClick={onClose}><span>Bespoke</span></Link>
                    </div>

                    {/* Journal */}
                    <div className={styles.item}>
                        <button className={styles.mainLink} onClick={() => toggle('journal')}>
                            <span>Journal</span>
                            <span className={`${styles.chevron} ${expanded === 'journal' ? styles.chevronOpen : ''}`}><Chevron /></span>
                        </button>
                        <div className={`${styles.subItems} ${expanded === 'journal' ? styles.subItemsOpen : ''}`}>
                            <Link href="/blog" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />All Articles</Link>
                            <Link href="/blog?category=Guides" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Guides</Link>
                            <Link href="/blog?category=Behind the Craft" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Behind the Craft</Link>
                            <Link href="/blog?category=Inspiration" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Inspiration</Link>
                        </div>
                    </div>

                    {/* Our Story */}
                    <div className={styles.item}>
                        <Link href="/about" className={styles.mainLink} onClick={onClose}><span>Our Story</span></Link>
                    </div>

                    {/* Contact */}
                    <div className={styles.item}>
                        <Link href="/contact" className={styles.mainLink} onClick={onClose}><span>Contact</span></Link>
                    </div>

                    <div className={styles.divider} style={{ marginTop: '6px' }} />

                    {/* Account — accordion (with Sign Out inside) */}
                    {user ? (
                        <div className={styles.item}>
                            <button className={styles.mainLink} onClick={() => toggle('account')}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className={styles.avatarDot}>{user.firstName[0]}{user.lastName[0]}</span>
                                    My Account
                                </span>
                                <span className={`${styles.chevron} ${expanded === 'account' ? styles.chevronOpen : ''}`}><Chevron /></span>
                            </button>
                            <div className={`${styles.subItems} ${expanded === 'account' ? styles.subItemsOpen : ''}`}>
                                <Link href="/profile" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Profile</Link>
                                <Link href="/profile?tab=orders" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />My Orders</Link>
                                <Link href="/profile?tab=wishlist" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Wishlist</Link>
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.subLink} ${styles.signOutLink}`}
                                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', textAlign: 'left' }}
                                >
                                    <span className={styles.subDot} />Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.item}>
                            <button className={styles.mainLink} onClick={() => toggle('account')}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Account
                                </span>
                                <span className={`${styles.chevron} ${expanded === 'account' ? styles.chevronOpen : ''}`}><Chevron /></span>
                            </button>
                            <div className={`${styles.subItems} ${expanded === 'account' ? styles.subItemsOpen : ''}`}>
                                <Link href="/login" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Sign In</Link>
                                <Link href="/signup" className={styles.subLink} onClick={onClose}><span className={styles.subDot} />Create Account</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Bottom bar (social only) ── */}
                <div className={styles.bottom}>
                    <div className={styles.socialRow}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink}>Instagram</a>
                        <span className={styles.socialSep}>·</span>
                        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className={styles.socialLink}>Pinterest</a>
                    </div>
                </div>
            </nav>
        </>
    );
}
