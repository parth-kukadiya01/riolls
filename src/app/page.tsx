'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import CreationProcess from '@/components/home/CreationProcess';
import { productsApi, categoriesApi } from '@/lib/api';
import styles from './page.module.css';

// Gradient fallbacks keyed by category slug
const CAT_GRADS: Record<string, string> = {
    rings: 'radial-gradient(ellipse at 50% 40%,#3d2b14,#1a1208)',
    necklaces: 'radial-gradient(ellipse at 50% 40%,#1a2420,#0a1210)',
    earrings: 'radial-gradient(ellipse at 50% 40%,#2a1e2e,#130e17)',
    bracelets: 'radial-gradient(ellipse at 50% 40%,#2d2416,#141008)',
    'high-jewellery': 'radial-gradient(ellipse at 50% 40%,#1a1a10,#0a0a06)',
    default: 'radial-gradient(ellipse at 50% 40%,#2a2520,#121009)',
};

// No fallback categories — real DB data only

export default function HomePage() {
    const [collections, setCollections] = useState<any[]>([]);
    const [featuredProducts, setFeatured] = useState<any[]>([]);
    const [loadedCats, setLoadedCats] = useState(false);
    const [loadedProducts, setLoadedProducts] = useState(false);

    // Fetch categories with product counts
    useEffect(() => {
        categoriesApi
            .list()
            .then((res: any) => {
                const cats: any[] = res.data ?? [];
                if (cats.length > 0) {
                    setCollections(cats);
                }
            })
            .catch(() => { })
            .finally(() => setLoadedCats(true));
    }, []);

    // Fetch featured / new-in products
    useEffect(() => {
        productsApi
            .list({ page: 1, limit: 5, sort: '-createdAt' })
            .then((res: any) => {
                const items: any[] = Array.isArray(res.data) ? res.data : [];
                if (items.length > 0) {
                    setFeatured(items.map((p: any) => ({
                        id: p._id,
                        _id: p._id,
                        slug: p.slug,
                        name: p.name,
                        category: p.category?.slug ?? p.category ?? '',
                        price: p.price,
                        metal: p.metal ?? '',
                        stone: p.stone ?? '',
                        badge: p.badge,
                        description: p.description ?? '',
                        stone_detail: p.stoneDetail ?? '',
                        gradient: 'linear-gradient(145deg,#ddd5c4,#c8bba8)',
                        gradient_hover: 'linear-gradient(145deg,#c8b89a,#b8a880)',
                        is_wishlisted: p.isWishlisted,
                        images: p.images,
                    })));
                }
            })
            .catch(() => { })
            .finally(() => setLoadedProducts(true));
    }, []);

    return (
        <>
            {/* ── Hero ─────────────────────────────── */}
            <section className={styles.hero}>
                {/* Cinematic video loop background */}
                <video
                    className={styles.heroVideo}
                    src="https://res.cloudinary.com/dl6cdbdzl/video/upload/v1772650014/14788078_2560_1440_30fps_ilmluc.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster=""
                />
                {/* Gradient overlay for legibility */}
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.heroEyebrow}>
                        <span className={styles.heroLineLight} />
                        <span className={styles.heroEyebrowTextLight}>A Legacy of Trust &amp; Excellence • Est. Surat, 2008</span>
                        <span className={styles.heroLineLight} />
                    </div>
                    <h1 className={styles.heroH1Video}>
                        Where your legacy becomes <br />
                        <em>timeless.</em>
                    </h1>
                    <p className={styles.heroSubVideo}>
                        Exquisite bespoke and collection jewellery, meticulously handcrafted with uncompromising quality.<br />
                        Dedicated to absolute mastery, honoring your trust with every masterpiece.
                    </p>
                    <div className={styles.heroCtas}>
                        <Link href="/shop" className={styles.ctaGold}>Explore Collections</Link>
                        <Link href="/ai-studio/step-1" className={styles.ctaGhostLight}>AI Studio ✦</Link>
                    </div>
                </div>
                {/* Floating diamond */}
                {/* <div className={styles.heroDiamond}>
                    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" stroke="rgba(201,169,110,0.45)" strokeWidth="0.8">
                        <polygon points="100,8 192,62 165,232 35,232 8,62" />
                        <polygon points="100,8 165,62 100,95 35,62" fill="rgba(201,169,110,0.12)" />
                        <line x1="35" y1="62" x2="165" y2="62" />
                        <line x1="100" y1="95" x2="35" y2="232" />
                        <line x1="100" y1="95" x2="165" y2="232" />
                    </svg>
                </div> */}
                {/* Scroll indicator */}
                {/* <div className={styles.heroScroll}>
                    <span className={styles.heroScrollLine} />
                    <span className={styles.heroScrollText}>Scroll to discover</span>
                </div> */}
            </section>

            {/* ── Collections Strip ─────────────────── */}
            <section className={styles.collections}>
                <div className={styles.sectionHeader}>
                    <span className={styles.eyebrow}>Curated Elegance</span>
                    <h2 className={styles.sectionH2}>Discover an exquisite realm of fine jewellery.</h2>
                </div>
                <div className={styles.collectionsGrid}>
                    {!loadedCats ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.6, padding: '2rem' }}>Loading collections…</p>
                    ) : collections.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
                            Our collection is being updated. <Link href="/shop">Browse all pieces →</Link>
                        </p>
                    ) : collections.map(col => {
                        const slug = col.slug ?? col.name?.toLowerCase().replace(/\s+/g, '-');
                        const grad = CAT_GRADS[slug] ?? CAT_GRADS.default;
                        const count = col.productCount != null
                            ? `${col.productCount} piece${col.productCount !== 1 ? 's' : ''}`
                            : col.count ?? '';
                        return (
                            <Link
                                key={col.name ?? col._id}
                                href={slug ? `/shop?cat=${slug}` : '/shop'}
                                className={styles.collectionCard}
                                style={{ background: col.image ? `url(${col.image}) center/cover` : grad }}
                            >
                                <div className={styles.collectionLabel}>
                                    <span className={styles.collectionName}>{col.name}</span>
                                    {count && <span className={styles.collectionCount}>{count}</span>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ── Featured Products ─────────────────── */}
            <section className={styles.featured}>
                <div className={styles.sectionHeader}>
                    <span className={styles.eyebrow}>Exclusive Acquisitions</span>
                    <h2 className={styles.sectionH2}>The Pinnacle of Craftsmanship.</h2>
                </div>
                <div className={styles.productsGrid}>
                    {!loadedProducts ? (
                        // Skeleton placeholders while loading
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} style={{ height: '380px', background: 'linear-gradient(145deg,#ede8e2,#e2dbd3)', borderRadius: '4px', opacity: 0.5 }} />
                        ))
                    ) : featuredProducts.length > 0 ? (
                        featuredProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))
                    ) : (
                        <p style={{ opacity: 0.5, gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                            Our collection is being updated. <Link href="/shop">Browse all pieces →</Link>
                        </p>
                    )}
                </div>
                <div className={styles.viewAllWrap}>
                    <Link href="/shop" className={styles.viewAll}>View All Jewellery →</Link>
                </div>
            </section>

            {/* ── Creation Process ──────────────────── */}
            <CreationProcess />

            {/* ── AI Studio Banner ──────────────────── */}
            <section className={styles.aiBanner}>
                <div className={styles.aiBannerLeft}>
                    <span className={styles.eyebrow} style={{ color: 'rgba(245,240,232,0.5)' }}>Intelligent Craftsmanship</span>
                    <h2 className={styles.aiH2}>Envision the masterpiece<br />you deserve.</h2>
                    <p className={styles.aiBannerBody}>Experience the future of high jewellery. Let our AI studio guide you in translating your finest visions into a precise design brief — meticulously brought to life by our master goldsmiths.</p>
                    <Link href="/ai-studio/step-1" className={styles.aiCta}>Begin Your Legacy ✦</Link>
                </div>
                {/* Cinematic video panel */}
                <div className={styles.aiBannerRight}>
                    <video
                        className={styles.aiBannerVideo}
                        src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    />
                    <div className={styles.aiBannerVideoOverlay} />
                    {/* Subtle diamond watermark over video */}
                    <div className={styles.aiDiamondOverVideo}>
                        <svg width="64" height="76" viewBox="0 0 64 76" fill="rgba(201,169,110,0.15)" stroke="rgba(201,169,110,0.6)" strokeWidth="0.8">
                            <polygon points="32,4 62,22 52,72 12,72 2,22" />
                            <polygon points="32,4 52,22 32,34 12,22" />
                            <line x1="12" y1="22" x2="52" y2="22" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* ── Bespoke CTA ───────────────────────── */}
            <section className={styles.bespokeCta}>
                {/* Cinematic dark video background */}
                <video
                    className={styles.bespokeVideo}
                    src="https://res.cloudinary.com/dl6cdbdzl/video/upload/v1772650014/14788078_2560_1440_30fps_ilmluc.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
                <div className={styles.bespokeOverlay} />
                <div className={styles.bespokeContent}>
                    <span className={styles.eyebrowLight}>The Ultimate Expression</span>
                    <h2 className={styles.sectionH2Light}>Commission a masterpiece,<br />uniquely yours.</h2>
                    <p className={styles.bespokeBodyLight}>At Riolls Jewels, every bespoke creation is an intimate collaboration. Handcrafted with paramount respect for your vision, resulting in a timeless heirloom of unparalleled luxury.</p>
                    <Link href="/bespoke" className={styles.bespokeBtnGold}>Commission Your Masterpiece</Link>
                </div>
            </section>
        </>
    );
}
