import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import CreationProcess from '@/components/home/CreationProcess';
import { PRODUCTS } from '@/lib/products';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Riolls Jewels — Luxury Handcrafted Jewellery',
    description: 'Luxury handcrafted jewellery — Rings, Necklaces, Earrings from the Riolls Jewels atelier.',
};

export default function HomePage() {
    const featuredProducts = PRODUCTS.slice(0, 5);

    return (
        <>
            {/* ── Hero ─────────────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <div className={styles.heroContent}>
                    <div className={styles.heroEyebrow}>
                        <span className={styles.heroLine} />
                        <span className={styles.heroEyebrowText}>Est. London, 1998</span>
                        <span className={styles.heroLine} />
                    </div>
                    <h1 className={styles.heroH1}>
                        Where your<br />
                        <em>story becomes</em><br />
                        stone.
                    </h1>
                    <p className={styles.heroSub}>
                        Bespoke and collection jewellery, handcrafted by a single goldsmith.<br />
                        No factory. No shortcuts. Just mastery.
                    </p>
                    <div className={styles.heroCtas}>
                        <Link href="/shop" className={styles.ctaDark}>Explore Collections</Link>
                        <Link href="/ai-studio/step-1" className={styles.ctaGhost}>AI Studio ✦</Link>
                    </div>
                </div>
                {/* Floating diamond */}
                <div className={styles.heroDiamond}>
                    <svg width="200" height="240" viewBox="0 0 200 240" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.6">
                        <polygon points="100,8 192,62 165,232 35,232 8,62" />
                        <polygon points="100,8 165,62 100,95 35,62" fill="rgba(201,169,110,0.08)" />
                        <line x1="35" y1="62" x2="165" y2="62" />
                        <line x1="100" y1="95" x2="35" y2="232" />
                        <line x1="100" y1="95" x2="165" y2="232" />
                    </svg>
                </div>
                <div className={styles.heroScroll}>
                    <span className={styles.heroScrollLine} />
                    <span className={styles.heroScrollText}>Scroll to discover</span>
                </div>
            </section>

            {/* ── Collections Strip ─────────────────── */}
            <section className={styles.collections}>
                <div className={styles.sectionHeader}>
                    <span className={styles.eyebrow}>The Collections</span>
                    <h2 className={styles.sectionH2}>A world of jewellery awaits.</h2>
                </div>
                <div className={styles.collectionsGrid}>
                    {[
                        { name: 'Rings', count: '48 pieces', grad: 'radial-gradient(ellipse at 50% 40%,#3d2b14,#1a1208)', slug: 'rings' },
                        { name: 'Necklaces', count: '31 pieces', grad: 'radial-gradient(ellipse at 50% 40%,#1a2420,#0a1210)', slug: 'necklaces' },
                        { name: 'Earrings', count: '26 pieces', grad: 'radial-gradient(ellipse at 50% 40%,#2a1e2e,#130e17)', slug: 'earrings' },
                        { name: 'Bracelets', count: '19 pieces', grad: 'radial-gradient(ellipse at 50% 40%,#2d2416,#141008)', slug: 'bracelets' },
                        { name: 'High Jewellery', count: '8 pieces', grad: 'radial-gradient(ellipse at 50% 40%,#1a1a10,#0a0a06)', slug: null },
                    ].map(col => (
                        <Link
                            key={col.name}
                            href={col.slug ? `/shop?cat=${col.slug}` : '/shop'}
                            className={styles.collectionCard}
                            style={{ background: col.grad }}
                        >
                            <div className={styles.collectionLabel}>
                                <span className={styles.collectionName}>{col.name}</span>
                                <span className={styles.collectionCount}>{col.count}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Featured Products ─────────────────── */}
            <section className={styles.featured}>
                <div className={styles.sectionHeader}>
                    <span className={styles.eyebrow}>New In</span>
                    <h2 className={styles.sectionH2}>Editor&apos;s selection.</h2>
                </div>
                <div className={styles.productsGrid}>
                    {featuredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
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
                    <span className={styles.eyebrow} style={{ color: 'rgba(245,240,232,0.5)' }}>AI Design Studio</span>
                    <h2 className={styles.aiH2}>Design the piece<br />you&apos;ve always imagined.</h2>
                    <p className={styles.aiBannerBody}>Our AI studio takes you step-by-step from your vision to a precise design brief — which our goldsmiths then bring to life in gold and gemstone.</p>
                    <Link href="/ai-studio/step-1" className={styles.aiCta}>Begin Your Design ✦</Link>
                </div>
                <div className={styles.aiBannerRight}>
                    <div className={styles.aiRings}>
                        <div className={styles.aiRing1} />
                        <div className={styles.aiRing2} />
                        <div className={styles.aiRing3} />
                        <div className={styles.aiDiamond}>
                            <svg width="64" height="76" viewBox="0 0 64 76" fill="rgba(201,169,110,0.18)" stroke="#C9A96E" strokeWidth="0.6">
                                <polygon points="32,4 62,22 52,72 12,72 2,22" />
                                <polygon points="32,4 52,22 32,34 12,22" />
                                <line x1="12" y1="22" x2="52" y2="22" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Bespoke CTA ───────────────────────── */}
            <section className={styles.bespokeCta}>
                <span className={styles.eyebrow}>Bespoke Jewellery</span>
                <h2 className={styles.sectionH2}>Commission something<br />made only for you.</h2>
                <p className={styles.bespokeBody}>Every Riolls Jewels bespoke piece is created by a single goldsmith — one pair of hands, one vision, one heirloom.</p>
                <Link href="/bespoke" className={styles.bespokeBtn}>Discover Bespoke</Link>
            </section>
        </>
    );
}
