'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import MobileNav from './MobileNav';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const { totalItems, openCart } = useCart();
    const { user, loading: authLoading } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (pathname?.startsWith('/admin')) return null;
    if (pathname?.startsWith('/ai-studio')) return null;

    const openMega = (id: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveMega(id);
    };

    const closeMega = () => {
        closeTimer.current = setTimeout(() => setActiveMega(null), 180);
    };

    const keepMega = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };

    return (
        <>
            <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--rose)" strokeWidth="1.2">
                        <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" />
                        <polygon points="8,4 12,6.5 12,9.5 8,12 4,9.5 4,6.5" fill="rgba(139,92,82,0.15)" />
                    </svg>
                    <span className={styles.logoText}>RIOLLS JEWELS</span>
                </Link>

                {/* Desktop Links */}
                <ul className={styles.links}>
                    <li onMouseEnter={() => openMega('shop')} onMouseLeave={closeMega}>
                        <span className={styles.linkItem}>Shop <span className={styles.chevron}>▾</span></span>
                    </li>
                    <li onMouseEnter={() => openMega('collections')} onMouseLeave={closeMega}>
                        <span className={styles.linkItem}>Collections <span className={styles.chevron}>▾</span></span>
                    </li>
                    <li><Link href="/ai-studio/step-1" className={styles.roseLink}>AI Studio <span className={styles.star}>✦</span></Link></li>
                    <li><Link href="/bespoke">Bespoke</Link></li>
                    <li onMouseEnter={() => openMega('journal')} onMouseLeave={closeMega}>
                        <Link href="/blog" className={styles.linkItem} style={{ textDecoration: 'none' }}>Journal <span className={styles.chevron}>▾</span></Link>
                    </li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>

                {/* Icons */}
                <div className={styles.icons}>
                    <Link href="/search" className={styles.icon} aria-label="Search">
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </Link>
                    {/* Account icon — shows Profile when logged in, Login when logged out */}
                    {!authLoading && (
                        user ? (
                            <Link href="/profile" className={styles.icon} aria-label="My Account" title={`${user.firstName} ${user.lastName}`}>
                                <span style={{
                                    width: '28px', height: '28px',
                                    borderRadius: '50%',
                                    background: 'var(--charcoal)',
                                    color: 'var(--white)',
                                    fontSize: '11px',
                                    letterSpacing: '0.05em',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-sc)',
                                }}>
                                    {user.firstName[0]}{user.lastName[0]}
                                </span>
                            </Link>
                        ) : (
                            <Link href="/login" className={styles.icon} aria-label="Account">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>
                        )
                    )}
                    <button className={styles.icon} aria-label="Cart" onClick={openCart}>
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </button>
                    {/* Mobile hamburger */}
                    <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Open menu">
                        <span /><span /><span />
                    </button>
                </div>

                {/* Mega: Shop */}
                {activeMega === 'shop' && (
                    <div className={styles.mega} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Jewellery</span>
                            <Link href="/shop">All Jewellery</Link>
                            <Link href="/shop?cat=rings">Rings</Link>
                            <Link href="/shop?cat=necklaces">Necklaces</Link>
                            <Link href="/shop?cat=earrings">Earrings</Link>
                            <Link href="/shop?cat=bracelets">Bracelets</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Stones</span>
                            <Link href="/shop?stone=diamond">Diamonds</Link>
                            <Link href="/shop?stone=ruby">Rubies</Link>
                            <Link href="/shop?stone=sapphire">Sapphires</Link>
                            <Link href="/shop?stone=emerald">Emeralds</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Services</span>
                            <Link href="/bespoke">Bespoke Commission</Link>
                            <Link href="/ai-studio/step-1">AI Design Studio</Link>
                            {/* <Link href="/search">Search</Link> */}
                        </div>
                        <div className={styles.megaImg} style={{ backgroundImage: 'url("https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999550/aleksandr-dalakian-dgXGLijwNOI-unsplash_zzfl3x.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <span className={styles.megaImgCaption}>The Celestine Collection</span>
                        </div>
                    </div>
                )}

                {/* Mega: Collections */}
                {activeMega === 'collections' && (
                    <div className={styles.mega} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Featured</span>
                            <Link href="/shop?badge=Celestine Collection">Celestine Collection</Link>
                            <Link href="/shop?badge=Aurora Series">Aurora Series</Link>
                            <Link href="/shop?badge=Tempest Line">Tempest Line</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>By Occasion</span>
                            <Link href="/shop?badge=Bridal %26 Engagement">Bridal &amp; Engagement</Link>
                            <Link href="/shop?badge=Anniversary Gifts">Anniversary Gifts</Link>
                            <Link href="/shop?badge=High Jewellery">High Jewellery</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>New &amp; Limited</span>
                            <Link href="/shop?badge=New In">New In</Link>
                            <Link href="/shop?badge=Last Piece">Last Pieces</Link>
                            <Link href="/shop?badge=Best Seller">Best Sellers</Link>
                        </div>
                        <div className={styles.megaImg} style={{ backgroundImage: 'url("https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771997169/buddy-an-bUQZomnihtI-unsplash_gfm2y4.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <span className={styles.megaImgCaption}>The Aurora Collection</span>
                        </div>
                    </div>
                )}

                {/* Mega: Journal */}
                {activeMega === 'journal' && (
                    <div className={styles.mega} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>The Journal</span>
                            <Link href="/blog">All Articles</Link>
                            <Link href="/blog?category=Guides">Guides</Link>
                            <Link href="/blog?category=Behind the Craft">Behind the Craft</Link>
                            <Link href="/blog?category=Inspiration">Inspiration</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Community</span>
                            <Link href="/reviews">Customer Reviews</Link>
                            <Link href="/reviews#write">Write a Review</Link>
                            <Link href="/bespoke">Book a Consultation</Link>
                        </div>
                        <div className={styles.megaCol}>
                            <span className={styles.megaTitle}>Quick Links</span>
                            <Link href="/shop">Shop All</Link>
                            <Link href="/ai-studio/step-1">AI Studio</Link>
                            {/* <Link href="/search">Search</Link> */}
                        </div>
                        <div className={styles.megaImg} style={{ backgroundImage: 'url("https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771998506/nataliya-melnychuk-oO0JAOJhquk-unsplash_mhgefc.jpg")' }}>
                            <span className={styles.megaImgCaption}>Stories from the Atelier</span>
                        </div>
                    </div>
                )}
            </nav>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}
