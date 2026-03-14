'use client';

import Link from 'next/link';
import Image from 'next/image';
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
            <header className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ''}`}>
                <nav className={styles.nav}>
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
                                <Link href="/contact">Book a Consultation</Link>
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

                <div className={styles.secondaryNav}>
                    <ul className={styles.secondaryLinks}>
                        <li onMouseEnter={() => openMega('engagement')} onMouseLeave={closeMega}>
                            <Link href="/shop?cat=engagement-rings" className={`${styles.secondaryLinkItem} ${activeMega === 'engagement' ? styles.active : ''}`}>ENGAGEMENT RINGS</Link>
                        </li>
                        <li onMouseEnter={() => openMega('wedding')} onMouseLeave={closeMega}>
                            <Link href="/shop?cat=wedding-rings" className={`${styles.secondaryLinkItem} ${activeMega === 'wedding' ? styles.active : ''}`}>WEDDING RINGS</Link>
                        </li>
                        <li onMouseEnter={() => openMega('jewelry')} onMouseLeave={closeMega}>
                            <Link href="/shop?cat=jewelry" className={`${styles.secondaryLinkItem} ${activeMega === 'jewelry' ? styles.active : ''}`}>JEWELRY</Link>
                        </li>
                        <li onMouseEnter={() => openMega('mens')} onMouseLeave={closeMega}>
                            <Link href="/shop?cat=mens" className={`${styles.secondaryLinkItem} ${activeMega === 'mens' ? styles.active : ''}`}>MEN'S</Link>
                        </li>
                        <li onMouseEnter={() => openMega('gifts')} onMouseLeave={closeMega}>
                            <Link href="/shop?cat=gifts" className={`${styles.secondaryLinkItem} ${activeMega === 'gifts' ? styles.active : ''}`}>GIFTS</Link>
                        </li>
                    </ul>

                    {/* Secondary Mega: Engagement Rings */}
                    {activeMega === 'engagement' && (
                        <div className={styles.megaSecondary} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                            <div className={styles.megaSecondaryGrid} data-cols="5">
                                {/* Col 1 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Shop By Shape</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?shape=round" className={styles.megaIconLink}><Image src="/icons/menu/Round.svg" alt="Round" width={24} height={24} className={styles.megaIcon} />Round</Link>
                                            <Link href="/shop?shape=oval" className={styles.megaIconLink}><Image src="/icons/menu/Oval.svg" alt="Oval" width={24} height={24} className={styles.megaIcon} />Oval</Link>
                                            <Link href="/shop?shape=emerald" className={styles.megaIconLink}><Image src="/icons/menu/Emerald.svg" alt="Emerald" width={24} height={24} className={styles.megaIcon} />Emerald</Link>
                                            <Link href="/shop?shape=princess" className={styles.megaIconLink}><Image src="/icons/menu/Princess.svg" alt="Princess" width={24} height={24} className={styles.megaIcon} />Princess</Link>
                                            <Link href="/shop?shape=pear" className={styles.megaIconLink}><Image src="/icons/menu/Pear.svg" alt="Pear" width={24} height={24} className={styles.megaIcon} />Pear</Link>
                                            <Link href="/shop?shape=cushion" className={styles.megaIconLink}><Image src="/icons/menu/Cushion.svg" alt="Cushion" width={24} height={24} className={styles.megaIcon} />Cushion</Link>
                                            <Link href="/shop?shape=marquise" className={styles.megaIconLink}><Image src="/icons/menu/Marquise.svg" alt="Marquise" width={24} height={24} className={styles.megaIcon} />Marquise</Link>
                                            <Link href="/shop?shape=radiant" className={styles.megaIconLink}><Image src="/icons/menu/Radiant.svg" alt="Radiant" width={24} height={24} className={styles.megaIcon} />Radiant</Link>
                                            <Link href="/shop?shape=elongated-cushion" className={styles.megaIconLink}><Image src="/icons/menu/Elongated-Cushion.svg" alt="Elongated Cushion" width={24} height={24} className={styles.megaIcon} />Elongated Cushion</Link>
                                        </div>
                                    </div>
                                    <Link href="/shop?cat=engagement-rings" className={styles.megaActionButton}>EXPLORE ENGAGEMENT RINGS</Link>
                                </div>
                                {/* Col 2 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Shop By Style</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?style=solitaire" className={styles.megaIconLink}><Image src="/icons/menu/Solitaire.svg" alt="Solitaire" width={24} height={24} className={styles.megaIcon} />Solitaire</Link>
                                            <Link href="/shop?style=hidden-halo" className={styles.megaIconLink}><Image src="/icons/menu/Hidden-halo.svg" alt="Hidden Halo" width={24} height={24} className={styles.megaIcon} />Hidden Halo</Link>
                                            <Link href="/shop?style=straight" className={styles.megaIconLink}><Image src="/icons/menu/Straight.svg" alt="Straight" width={24} height={24} className={styles.megaIcon} />Straight</Link>
                                            <Link href="/shop?style=three-stone" className={styles.megaIconLink}><Image src="/icons/menu/3-stone.svg" alt="Three Stone" width={24} height={24} className={styles.megaIcon} />Three Stone</Link>
                                            <Link href="/shop?style=halo" className={styles.megaIconLink}><Image src="/icons/menu/Halo.svg" alt="Halo" width={24} height={24} className={styles.megaIcon} />Halo</Link>
                                            <Link href="/shop?style=double-halo" className={styles.megaIconLink}><Image src="/icons/menu/Double-halo.svg" alt="Double Halo" width={24} height={24} className={styles.megaIcon} />Double Halo</Link>
                                            <Link href="/shop?style=split-shank" className={styles.megaIconLink}><Image src="/icons/menu/Split-Shank.svg" alt="Split Shank" width={24} height={24} className={styles.megaIcon} />Split Shank</Link>
                                            <Link href="/shop?style=three-stone-halo" className={styles.megaIconLink}><Image src="/icons/menu/3-stone-halo.svg" alt="Three Stone Halo" width={24} height={24} className={styles.megaIcon} />Three Stone Halo</Link>
                                            <Link href="/shop?style=wide-band" className={styles.megaIconLink}><Image src="/icons/menu/Wide-band.svg" alt="Wide Band" width={24} height={24} className={styles.megaIcon} />Wide Band</Link>
                                            <Link href="/shop?style=toi-et-moi" className={styles.megaIconLink}><Image src="/icons/menu/toi-et-moi.svg" alt="Toi et Moi" width={24} height={24} className={styles.megaIcon} />Toi et Moi</Link>
                                            <Link href="/shop?style=cluster" className={styles.megaIconLink}><Image src="/icons/menu/Cluster-v1.svg" alt="Cluster" width={24} height={24} className={styles.megaIcon} />Cluster</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Col 3 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Shop By Metal</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?metalColor=white-gold" className={styles.megaIconLink}><Image src="/icons/menu/White-Gold.svg" alt="White Gold" width={24} height={24} className={styles.megaIcon} />White Gold</Link>
                                            <Link href="/shop?metalColor=yellow-gold" className={styles.megaIconLink}><Image src="/icons/menu/Yellow-Gold.svg" alt="Yellow Gold" width={24} height={24} className={styles.megaIcon} />Yellow Gold</Link>
                                            <Link href="/shop?metalColor=rose-gold" className={styles.megaIconLink}><Image src="/icons/menu/Rose-Gold.svg" alt="Rose Gold" width={24} height={24} className={styles.megaIcon} />Rose Gold</Link>
                                            <Link href="/shop?metal=platinum" className={styles.megaIconLink}><Image src="/icons/menu/Platinum.svg" alt="Platinum" width={24} height={24} className={styles.megaIcon} />Platinum</Link>
                                            <Link href="/shop?metal=two-tone" className={styles.megaIconLink}><Image src="/icons/menu/Mixed-Metals.svg" alt="Two Tone" width={24} height={24} className={styles.megaIcon} />Two Tone</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Featured Collections</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=remount">Remount Engagement Rings</Link>
                                            <Link href="/shop?stone=sapphire&cat=engagement-rings">Sapphire Engagement Rings</Link>
                                            <Link href="/shop?collection=unique">Unique Engagement Rings</Link>
                                            <Link href="/shop?stone=gemstone&cat=engagement-rings">Gemstone Engagement Rings</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Col 4 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Premium Collections</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=classic">Classic</Link>
                                            <Link href="/shop?collection=contemporary">Contemporary</Link>
                                            <Link href="/shop?collection=vintage-inspired">Vintage Inspired</Link>
                                            <Link href="/shop?collection=lotus">Lotus</Link>
                                            <Link href="/shop?collection=starlight">Starlight</Link>
                                            <Link href="/shop?collection=floral-nouveau">Floral Nouveau</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Knowledge</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/education/engagement-ring-guide">Engagement Ring Guide</Link>
                                            <Link href="/education/how-to-choose-diamond">How to Choose a Diamond</Link>
                                            <Link href="/education/diamond-clarity-chart">Diamond Clarity Chart</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Ad */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1773423990/Honoring_Heritage_Craftsmanship_version_1_iltnsk.png" alt="Lotus of Love" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>Lotus of Love</span>
                                    <Link href="/shop?collection=lotus" className={styles.megaAdLink}>Discover the Lotus Collection</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Secondary Mega: Wedding Rings */}
                    {activeMega === 'wedding' && (
                        <div className={styles.megaSecondary} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                            <div className={styles.megaSecondaryGrid} data-cols="4">
                                {/* Col 1 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Women's</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=wedding-rings&style=classic">Classic Wedding Rings</Link>
                                            <Link href="/shop?cat=wedding-rings&style=curved">Curved Wedding Bands</Link>
                                            <Link href="/shop?cat=wedding-rings&style=eternity">Eternity Wedding Bands</Link>
                                            <Link href="/shop?cat=wedding-rings&style=anniversary">Anniversary Rings</Link>
                                            <Link href="/shop?cat=wedding-rings&style=enhancers">Ring Enhancers</Link>
                                            <Link href="/shop?cat=wedding-rings&style=open">Open Wedding Bands</Link>
                                            <Link href="/shop?cat=wedding-rings&style=stackable">Stackable Wedding Rings</Link>
                                            <Link href="/shop?cat=wedding-rings" className={styles.viewAll}>Shop All</Link>
                                        </div>
                                    </div>
                                    <Link href="/shop?cat=wedding-rings" className={styles.megaActionButton}>EXPLORE WEDDING RINGS</Link>
                                </div>
                                {/* Col 2 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Men's</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=mens-wedding-bands&metalColor=gold">Gold Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-wedding-bands&stone=diamond">Diamond Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-wedding-bands&style=alternative">Alternative Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-engagement-rings">Men's Engagement Rings</Link>
                                            <Link href="/shop?cat=mens-promise-rings">Men's Promise Rings</Link>
                                            <Link href="/shop?cat=mens-bands" className={styles.viewAll}>Shop All</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Col 3 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Featured Collections</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=unique-wedding-rings">Unique Wedding Rings</Link>
                                            <Link href="/shop?collection=sapphire-wedding-rings">Sapphire Wedding Rings</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Ad */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771999550/aleksandr-dalakian-dgXGLijwNOI-unsplash_zzfl3x.jpg" alt="Wedding Ring Enhancers" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>Wedding Ring Enhancers</span>
                                    <Link href="/shop?cat=wedding-rings&style=enhancers" className={styles.megaAdLink}>Discover Now</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Secondary Mega: Men's */}
                    {activeMega === 'mens' && (
                        <div className={styles.megaSecondary} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                            <div className={styles.megaSecondaryGrid} data-cols="5">
                                {/* Col 1 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Men's Jewelry</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=mens-necklaces">Necklaces</Link>
                                            <Link href="/shop?cat=mens-pendants">Pendants</Link>
                                            <Link href="/shop?cat=mens-bracelets">Bracelets</Link>
                                            <Link href="/shop?cat=mens-cufflinks">Cufflinks</Link>
                                            <Link href="/shop?cat=mens-rings">Rings</Link>
                                            <Link href="/shop?cat=mens-earrings">Earrings</Link>
                                            <Link href="/shop?cat=mens-money-clips">Money Clips</Link>
                                            <Link href="/shop?cat=mens" className={styles.viewAll}>Shop All</Link>
                                        </div>
                                    </div>
                                    <Link href="/shop?cat=mens" className={styles.megaActionButton}>EXPLORE ALL MEN'S JEWELRY</Link>
                                </div>
                                {/* Col 2 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Men's Bands</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=mens-bands&metalColor=gold">Gold Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-bands&stone=diamond">Diamond Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-bands&style=alternative">Alternative Wedding Bands</Link>
                                            <Link href="/shop?cat=mens-engagement-rings">Men's Engagement Rings</Link>
                                            <Link href="/shop?cat=mens-promise-rings">Men's Promise Rings</Link>
                                            <Link href="/shop?cat=mens-bands" className={styles.viewAll}>Shop All</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Col 3 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Featured Collections</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=facets">Facets</Link>
                                            <Link href="/shop?collection=classic">Classic</Link>
                                            <Link href="/shop?collection=geo">Geo</Link>
                                            <Link href="/shop?collection=contemporary">Contemporary</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Col 4 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Shop By Metal</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?metalColor=yellow-gold&cat=mens" className={styles.megaIconLink}><Image src="/icons/menu/Yellow-Gold.svg" alt="Yellow Gold" width={24} height={24} className={styles.megaIcon} />Yellow Gold</Link>
                                            <Link href="/shop?metalColor=silver&cat=mens" className={styles.megaIconLink}><Image src="/icons/menu/Silver.svg" alt="Silver" width={24} height={24} className={styles.megaIcon} />Silver</Link>
                                            <Link href="/shop?metalColor=mixed-metal&cat=mens" className={styles.megaIconLink}><Image src="/icons/menu/Mixed-Metals.svg" alt="Mixed Metal" width={24} height={24} className={styles.megaIcon} />Mixed Metal</Link>
                                            <Link href="/shop?metalColor=rose-gold&cat=mens" className={styles.megaIconLink}><Image src="/icons/menu/Rose-Gold.svg" alt="Rose Gold" width={24} height={24} className={styles.megaIcon} />Rose Gold</Link>
                                            <Link href="/shop?metalColor=white-gold&cat=mens" className={styles.megaIconLink}><Image src="/icons/menu/White-Gold.svg" alt="White Gold" width={24} height={24} className={styles.megaIcon} />White Gold</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Ad */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771998506/nataliya-melnychuk-oO0JAOJhquk-unsplash_mhgefc.jpg" alt="New Pendants and Medallions" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>New Pendants and Medallions</span>
                                    <Link href="/shop?cat=mens-pendants" className={styles.megaAdLink}>Discover Now</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Secondary Mega: Jewelry */}
                    {activeMega === 'jewelry' && (
                        <div className={styles.megaSecondary} onMouseEnter={keepMega} onMouseLeave={closeMega}>
                            <div className={styles.megaSecondaryGrid} data-cols="6">
                                {/* Col 1 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Rings</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=rings&style=statement">Statement Rings</Link>
                                            <Link href="/shop?cat=rings&style=promise">Promise Rings</Link>
                                            <Link href="/shop?cat=rings&style=stackable">Stackable Rings</Link>
                                            <Link href="/shop?cat=rings&style=cocktail">Cocktail Rings</Link>
                                            <Link href="/shop?cat=rings&style=birthstone">Birthstone Rings</Link>
                                            <Link href="/shop?cat=rings" className={styles.viewAll}>Shop All Rings</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Collections</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=gaby">Gaby</Link>
                                            <Link href="/shop?collection=lusso">Lusso</Link>
                                            <Link href="/shop?collection=contemporary">Contemporary</Link>
                                            <Link href="/shop?collection=easy-stackables">Easy Stackables</Link>
                                            <Link href="/shop?collection=bujukan">Bujukan</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 2 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Earrings</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=earrings&style=stud">Stud Earrings</Link>
                                            <Link href="/shop?cat=earrings&style=hoop">Hoop Earrings</Link>
                                            <Link href="/shop?cat=earrings&style=cuffs">Ear Cuffs</Link>
                                            <Link href="/shop?cat=earrings&style=drop">Drop Earrings</Link>
                                            <Link href="/shop?cat=earrings&style=birthstone">Birthstone Earrings</Link>
                                            <Link href="/shop?cat=earrings" className={styles.viewAll}>Shop All Earrings</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Gemstones</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?stone=diamond">Diamond Jewelry</Link>
                                            <Link href="/shop?stone=gemstone">Gemstone Jewelry</Link>
                                            <Link href="/shop?stone=birthstone">Birthstone Jewelry</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 3 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Bracelets</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=bracelets&style=tennis">Tennis Bracelets</Link>
                                            <Link href="/shop?cat=bracelets&style=clover">Clover Bracelets</Link>
                                            <Link href="/shop?cat=bracelets&style=beaded">Beaded Bracelets</Link>
                                            <Link href="/shop?cat=bracelets&style=bangle">Bangle Bracelets</Link>
                                            <Link href="/shop?cat=bracelets&style=birthstone">Birthstone Bracelets</Link>
                                            <Link href="/shop?cat=bracelets" className={styles.viewAll}>Shop All Bracelets</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Featured</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?badge=new-arrivals">New Arrivals</Link>
                                            <Link href="/shop?badge=award-winners">Award Winners</Link>
                                            <Link href="/shop?badge=enamel">Enamel Jewelry</Link>
                                            <Link href="/shop?badge=initial">Initial Jewelry</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 4 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Necklaces</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?cat=necklaces&style=cross">Cross Necklaces</Link>
                                            <Link href="/shop?cat=necklaces&style=initial">Initial Necklaces</Link>
                                            <Link href="/shop?cat=necklaces&style=pendant">Pendant Necklaces</Link>
                                            <Link href="/shop?cat=necklaces&style=charm">Charm Necklaces</Link>
                                            <Link href="/shop?cat=necklaces&style=birthstone">Birthstone Necklaces</Link>
                                            <Link href="/shop?cat=necklaces" className={styles.viewAll}>Shop All Necklaces</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 5 */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Shop By Material</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?metalColor=yellow-gold" className={styles.megaIconLink}><Image src="/icons/menu/Yellow-Gold.svg" alt="Yellow Gold" width={24} height={24} className={styles.megaIcon} />Yellow Gold</Link>
                                            <Link href="/shop?metalColor=rose-gold" className={styles.megaIconLink}><Image src="/icons/menu/Rose-Gold.svg" alt="Rose Gold" width={24} height={24} className={styles.megaIcon} />Rose Gold</Link>
                                            <Link href="/shop?metalColor=white-gold" className={styles.megaIconLink}><Image src="/icons/menu/White-Gold.svg" alt="White Gold" width={24} height={24} className={styles.megaIcon} />White Gold</Link>
                                            <Link href="/shop?metal=silver" className={styles.megaIconLink}><Image src="/icons/menu/Silver.svg" alt="Silver" width={24} height={24} className={styles.megaIcon} />Silver</Link>
                                            <Link href="/shop?metalColor=mixed-metal" className={styles.megaIconLink}><Image src="/icons/menu/Mixed-Metals.svg" alt="Mixed Metal" width={24} height={24} className={styles.megaIcon} />Mixed Metal</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 6 / Right Ad */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1771997169/buddy-an-bUQZomnihtI-unsplash_gfm2y4.jpg" alt="Woman wearing jewelry" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>Which Gabriel Woman Are You?</span>
                                    <Link href="/quiz" className={styles.megaAdLink}>Take the Quiz</Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeMega === 'gifts' && (
                        <div
                            className={styles.megaSecondary}
                            onMouseEnter={keepMega}
                            onMouseLeave={closeMega}
                        >
                            <div className={styles.megaSecondaryGrid} data-cols="gifts">
                                {/* Col 1: Birthstones */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Birthstone Jewelry</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?stone=garnet" className={styles.megaIconLink}><Image src="/icons/menu/jan.png" alt="January Garnet" width={20} height={20} className={styles.megaIcon} />JAN - Garnet</Link>
                                            <Link href="/shop?stone=amethyst" className={styles.megaIconLink}><Image src="/icons/menu/feb.png" alt="February Amethyst" width={20} height={20} className={styles.megaIcon} />FEB - Amethyst</Link>
                                            <Link href="/shop?stone=aquamarine" className={styles.megaIconLink}><Image src="/icons/menu/march.png" alt="March Aquamarine" width={20} height={20} className={styles.megaIcon} />MAR - Aquamarine</Link>
                                            <Link href="/shop?stone=diamond" className={styles.megaIconLink}><Image src="/icons/menu/apr.png" alt="April Diamond" width={20} height={20} className={styles.megaIcon} />APR - Diamond</Link>
                                            <Link href="/shop?stone=emerald" className={styles.megaIconLink}><Image src="/icons/menu/may.png" alt="May Emerald" width={20} height={20} className={styles.megaIcon} />MAY - Emerald</Link>
                                            <Link href="/shop?stone=pearl" className={styles.megaIconLink}><Image src="/icons/menu/june.png" alt="June Pearl" width={20} height={20} className={styles.megaIcon} />JUN - Pearl</Link>
                                            <Link href="/shop?stone=ruby" className={styles.megaIconLink}><Image src="/icons/menu/jul.png" alt="July Ruby" width={20} height={20} className={styles.megaIcon} />JUL - Ruby</Link>
                                            <Link href="/shop?stone=peridot" className={styles.megaIconLink}><Image src="/icons/menu/aug.png" alt="August Peridot" width={20} height={20} className={styles.megaIcon} />AUG - Peridot</Link>
                                            <Link href="/shop?stone=sapphire" className={styles.megaIconLink}><Image src="/icons/menu/sep.png" alt="September Sapphire" width={20} height={20} className={styles.megaIcon} />SEP - Sapphire</Link>
                                            <Link href="/shop?stone=tourmaline" className={styles.megaIconLink}><Image src="/icons/menu/Oct-Pink-Tourmaline.png" alt="October Tourmaline" width={20} height={20} className={styles.megaIcon} />OCT - Pink Tourmaline</Link>
                                            <Link href="/shop?stone=citrine" className={styles.megaIconLink}><Image src="/icons/menu/nov.png" alt="November Citrine" width={20} height={20} className={styles.megaIcon} />NOV - Citrine</Link>
                                            <Link href="/shop?stone=blue-topaz" className={styles.megaIconLink}><Image src="/icons/menu/dec.png" alt="December Blue Topaz" width={20} height={20} className={styles.megaIcon} />DEC - Topaz</Link>
                                            <Link href="/shop?stone=birthstone" className={styles.viewAll}>Shop All</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 2: Price & Giving Back */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Price</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?maxPrice=500">Under $500</Link>
                                            <Link href="/shop?minPrice=500&maxPrice=1000">$500 to $1000</Link>
                                            <Link href="/shop?minPrice=1000&maxPrice=2500">$1000 to $2500</Link>
                                            <Link href="/shop?minPrice=2500">$2500 and more</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Giving Back Jewelry Collection</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?collection=st-jude">St. Jude Silver Heart of Hope Pendant</Link>
                                            <Link href="/shop?collection=erp">EGPAF Silver Twisted Bar Necklace</Link>
                                            <Link href="/shop?collection=oar">OAR Silver Huggie Earrings</Link>
                                            <Link href="/shop?collection=maw">Make-A-Wish Silver Bracelet</Link>
                                            <Link href="/shop?collection=casa">CASA/GAL Round Pendant Necklace</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 3: Occasions & Discover */}
                                <div className={styles.megaGroup}>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Occasions</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?gift=for-her">Gifts for Her</Link>
                                            <Link href="/shop?gift=for-him">Gifts for Him</Link>
                                            <Link href="/shop?gift=anniversary">Anniversary</Link>
                                            <Link href="/shop?gift=graduation-her">Graduation Gifts for Her</Link>
                                            <Link href="/shop?gift=graduation-him">Graduation Gifts for Him</Link>
                                        </div>
                                    </div>
                                    <div className={styles.megaGroupInner}>
                                        <span className={styles.megaGroupTitle}>Discover</span>
                                        <div className={styles.megaGroupList}>
                                            <Link href="/shop?badge=initials">Gifts by Initials</Link>
                                            <Link href="/shop?badge=zodiac">Gifts by Zodiac</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 4: Ad 1 */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772111538/men-gift_v2_f8wz3u.jpg" alt="Thoughtful Gifts" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>Thoughtful Gifts, Done Right.</span>
                                    <Link href="/shop?gift=for-him" className={styles.megaAdLink}>Shop Gifts for Him</Link>
                                </div>

                                {/* Col 5: Ad 2 */}
                                <div className={styles.megaAd}>
                                    <img src="https://res.cloudinary.com/dl6cdbdzl/image/upload/v1772111538/women-gift_v2_j4p4p4.jpg" alt="Make Her Heart Skip a Beat" className={styles.megaAdImg} />
                                    <span className={styles.megaAdTitle}>Make Her Heart Skip a Beat.</span>
                                    <Link href="/shop?gift=for-her" className={styles.megaAdLink}>Shop Gifts for Her</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </header>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}
