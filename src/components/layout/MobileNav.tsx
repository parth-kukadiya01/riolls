'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './MobileNav.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: Props) {
    const { totalItems, openCart } = useCart();
    const [expandedSection, setExpandedSection] = useState<string | null>('shop');

    const toggle = (section: string) => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
                onClick={onClose}
            />

            {/* Overlay */}
            <nav className={`${styles.overlay} ${isOpen ? styles.open : ''}`} aria-label="Mobile navigation">
                <div className={styles.header}>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <span className={styles.headerLogo}>RIOLLS JEWELS</span>
                    <button className={styles.cartIcon} onClick={() => { onClose(); openCart(); }} aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </button>
                </div>

                <div className={styles.items}>
                    {/* Shop acc */}
                    <div className={styles.item}>
                        <div className={styles.mainLink} onClick={() => toggle('shop')}>
                            Shop
                            <span className={`${styles.accIcon} ${expandedSection === 'shop' ? styles.open : ''}`}>+</span>
                        </div>
                        {expandedSection === 'shop' && (
                            <div className={styles.subItems}>
                                <Link href="/shop?cat=rings" className={styles.subLink} onClick={onClose}>Rings</Link>
                                <Link href="/shop?cat=necklaces" className={styles.subLink} onClick={onClose}>Necklaces</Link>
                                <Link href="/shop?cat=earrings" className={styles.subLink} onClick={onClose}>Earrings</Link>
                                <Link href="/shop?cat=bracelets" className={styles.subLink} onClick={onClose}>Bracelets</Link>
                                <Link href="/shop" className={styles.subLink} onClick={onClose}>All Jewellery</Link>
                            </div>
                        )}
                    </div>

                    {/* Collections acc */}
                    <div className={styles.item}>
                        <div className={styles.mainLink} onClick={() => toggle('col')}>
                            Collections
                            <span className={`${styles.accIcon} ${expandedSection === 'col' ? styles.open : ''}`}>+</span>
                        </div>
                        {expandedSection === 'col' && (
                            <div className={styles.subItems}>
                                <Link href="#" className={styles.subLink} onClick={onClose}>Celestine Collection</Link>
                                <Link href="#" className={styles.subLink} onClick={onClose}>Aurora Series</Link>
                                <Link href="#" className={styles.subLink} onClick={onClose}>Bridal</Link>
                            </div>
                        )}
                    </div>

                    <div className={styles.item}>
                        <Link href="/ai-studio/step-1" className={`${styles.mainLink} ${styles.gold}`} onClick={onClose}>
                            AI Studio ✦
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link href="/bespoke" className={styles.mainLink} onClick={onClose}>Bespoke</Link>
                    </div>
                    <div className={styles.item}>
                        <Link href="#" className={styles.mainLink} onClick={onClose}>Our Story</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.utils}>
                        <Link href="/search" className={styles.utilLink} onClick={onClose}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search
                        </Link>
                    </div>
                    <span className={styles.social}>Instagram &nbsp;·&nbsp; Pinterest</span>
                </div>
            </nav>
        </>
    );
}
