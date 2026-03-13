'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { productsApi, categoriesApi } from '@/lib/api';
import styles from './page.module.css';

// Static Filter Options extracted to avoid recreation on every render
const DB_CATEGORIES = [
    { name: 'Rings', slug: 'rings' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Bracelets', slug: 'bracelets' },
    { name: "Men's Collection", slug: 'men-collection' },
];

const DB_METALS = ["9k", "14k", "18k", "22k"];

const DB_METAL_COLORS = ["Rose Gold", "White Gold", "Yellow Gold"];

const DB_STONES = ["Diamond", "Lab Diamond", "Moissanite", "CZ"];

function ShopContent() {
    const sp = useSearchParams();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState<{
        cat: string[];
        metal: string[];
        metalColor: string[];
        stone: string[];
        badge: string[];
        maxPrice: number;
    }>({
        cat: sp.get('cat') ? [sp.get('cat')!] : [],
        metal: [],
        metalColor: [],
        stone: sp.get('stone') ? [sp.get('stone')!] : [],
        badge: sp.get('badge') ? [sp.get('badge')!] : [],
        maxPrice: 20000,
    });

    const [sort, setSort] = useState<'featured' | 'price' | '-price' | '-createdAt' | 'createdAt'>('featured');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openSections, setOpenSections] = useState<string[]>(['category', 'metal-purity', 'metal-colour', 'stone']);

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    // Re-read category and badge from URL params (initial load only)
    useEffect(() => {
        const cat = sp.get('cat') || sp.get('collection') || null;
        const badge = sp.get('badge') || null;
        if (cat || badge) {
            setFilters(f => ({
                ...f,
                cat: cat ? [cat] : f.cat,
                badge: badge ? [badge] : f.badge
            }));
        }
    }, []);

    // Fetch products whenever filters / sort / page change
    useEffect(() => {
        setLoading(true);
        const params: any = { page, limit: 24, sort };

        if (filters.cat.length > 0) params.category = filters.cat.join(',');
        if (filters.metal.length > 0) params.metal = filters.metal.join(',');
        if (filters.metalColor.length > 0) params.metalColor = filters.metalColor.join(',');
        if (filters.stone.length > 0) params.stone = filters.stone.join(',');
        if (filters.badge.length > 0) params.badge = filters.badge.join(',');
        if (filters.maxPrice < 20000) params.maxPrice = filters.maxPrice;

        productsApi
            .list(params)
            .then((res: any) => {
                const items = Array.isArray(res.data) ? res.data : [];
                setProducts(prev => page === 1 ? items : [...prev, ...items]);
                setTotal(res.pagination?.total ?? 0);
            })
            .catch(() => {
                if (page === 1) setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [filters, sort, page]);

    const toggle = <K extends keyof typeof filters>(key: K, val: string) => {
        setFilters(f => {
            const current = f[key] as string[];
            const next = current.includes(val)
                ? current.filter(v => v !== val)
                : [...current, val];
            return { ...f, [key]: next };
        });
    };

    const clear = () => {
        setFilters({ cat: [], metal: [], metalColor: [], stone: [], badge: [], maxPrice: 20000 });
    };

    const METAL_COLORS_MAP: Record<string, string> = {
        "Rose Gold": "linear-gradient(135deg, #e5b3a3, #d49a89)",
        "White Gold": "linear-gradient(135deg, #e8e8e8, #d1d1d1)",
        "Yellow Gold": "linear-gradient(135deg, #f4d03f, #c9a96e)"
    };

    return (
        <div className={styles.page}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <span>Home</span><span className={styles.sep}>/</span>
                <span>Shop</span>
                {filters.cat.length === 1 && <><span className={styles.sep}>/</span><span style={{ textTransform: 'capitalize' }}>{filters.cat[0]}</span></>}
            </div>

            <div className={styles.layout}>
                {/* Sidebar */}
                <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                    {sidebarOpen && <button className={styles.closeSidebar} onClick={() => setSidebarOpen(false)}>✕</button>}

                    <div className={styles.sidebarHeader}>
                        <span className={styles.sidebarTitle}>Filters</span>
                    </div>

                    {/* Category Accordion */}
                    <div className={styles.filterAccordion}>
                        <button className={styles.accordionHeader} onClick={() => toggleSection('category')}>
                            <span className={styles.accordionTitle}>Category</span>
                            <span className={`${styles.accordionIcon} ${openSections.includes('category') ? styles.accordionIconOpen : ''}`}>▼</span>
                        </button>
                        <div className={`${styles.accordionContent} ${openSections.includes('category') ? styles.accordionContentOpen : ''}`}>
                            {DB_CATEGORIES.map(c => (
                                <label key={c.slug} className={styles.filterItem}>
                                    <input type="checkbox" checked={filters.cat.includes(c.slug)} onChange={() => toggle('cat', c.slug)} />
                                    <span style={{ textTransform: 'capitalize' }}>{c.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Metal Purity Accordion */}
                    <div className={styles.filterAccordion}>
                        <button className={styles.accordionHeader} onClick={() => toggleSection('metal-purity')}>
                            <span className={styles.accordionTitle}>Metal Purity</span>
                            <span className={`${styles.accordionIcon} ${openSections.includes('metal-purity') ? styles.accordionIconOpen : ''}`}>▼</span>
                        </button>
                        <div className={`${styles.accordionContent} ${openSections.includes('metal-purity') ? styles.accordionContentOpen : ''}`}>
                            {DB_METALS.map((m: string) => (
                                <label key={m} className={styles.filterItem}>
                                    <input type="checkbox" checked={filters.metal.includes(m)} onChange={() => toggle('metal', m)} />
                                    <span>{m}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Metal Colour Accordion - Visual Swatches */}
                    <div className={styles.filterAccordion}>
                        <button className={styles.accordionHeader} onClick={() => toggleSection('metal-colour')}>
                            <span className={styles.accordionTitle}>Metal Colour</span>
                            <span className={`${styles.accordionIcon} ${openSections.includes('metal-colour') ? styles.accordionIconOpen : ''}`}>▼</span>
                        </button>
                        <div className={`${styles.accordionContent} ${openSections.includes('metal-colour') ? styles.accordionContentOpen : ''}`}>
                            <div className={styles.swatchGrid}>
                                {DB_METAL_COLORS.map((mc: string) => (
                                    <div key={mc} className={styles.swatchItem} onClick={() => toggle('metalColor', mc)}>
                                        <div
                                            className={`${styles.swatch} ${filters.metalColor.includes(mc) ? styles.swatchActive : ''}`}
                                            style={{ background: METAL_COLORS_MAP[mc] || '#ccc' }}
                                            title={mc}
                                        />
                                        <span className={styles.swatchLabel}>{mc.split(' ')[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stone Accordion */}
                    <div className={styles.filterAccordion}>
                        <button className={styles.accordionHeader} onClick={() => toggleSection('stone')}>
                            <span className={styles.accordionTitle}>Stone</span>
                            <span className={`${styles.accordionIcon} ${openSections.includes('stone') ? styles.accordionIconOpen : ''}`}>▼</span>
                        </button>
                        <div className={`${styles.accordionContent} ${openSections.includes('stone') ? styles.accordionContentOpen : ''}`}>
                            {DB_STONES.map((s: string) => (
                                <label key={s} className={styles.filterItem}>
                                    <input type="checkbox" checked={filters.stone.includes(s)} onChange={() => toggle('stone', s)} />
                                    <span>{s}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Collections & Occasions */}
                    <div className={styles.filterAccordion}>
                        <button className={styles.accordionHeader} onClick={() => toggleSection('collections')}>
                            <span className={styles.accordionTitle}>Collections</span>
                            <span className={`${styles.accordionIcon} ${openSections.includes('collections') ? styles.accordionIconOpen : ''}`}>▼</span>
                        </button>
                        <div className={`${styles.accordionContent} ${openSections.includes('collections') ? styles.accordionContentOpen : ''}`}>
                            {['New In', 'Best Seller', 'Bridal & Engagement', 'High Jewellery'].map((b: string) => (
                                <label key={b} className={styles.filterItem}>
                                    <input type="checkbox" checked={filters.badge.includes(b)} onChange={() => toggle('badge', b)} />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup} style={{ marginTop: '32px' }}>
                        <span className={styles.filterLabel}>Price Range</span>
                        <input
                            type="range"
                            min={0} max={20000} step={500}
                            value={filters.maxPrice}
                            onChange={e => {
                                setFilters(f => ({ ...f, maxPrice: +e.target.value }));
                                setPage(1);
                            }}
                            className={styles.priceRange}
                        />
                        <span className={styles.priceRangeLabel}>
                            Up to ${filters.maxPrice.toLocaleString()}
                        </span>
                    </div>

                    <button className={styles.clearAll} onClick={clear} style={{ width: '100%', marginTop: '40px', padding: '12px', border: '1px solid var(--gold)', color: 'var(--gold)' }}>
                        Clear All Filters
                    </button>
                </aside>

                {/* Main */}
                <div className={styles.main}>
                    {/* Toolbar */}
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarLeft}>
                            <button className={styles.filterToggle} onClick={() => setSidebarOpen(true)}>
                                ⊞ Filters
                            </button>
                            <span className={styles.resultCount}>{loading ? 'Checking Pieces...' : `${total} Products`}</span>
                        </div>
                        <select
                            className={styles.sortSelect}
                            value={sort}
                            onChange={e => {
                                setSort(e.target.value as typeof sort);
                                setPage(1);
                            }}
                        >
                            <option value="featured">Recommended</option>
                            <option value="-createdAt">Newest First</option>
                            <option value="price">Price: Low to High</option>
                            <option value="-price">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Active filter chips */}
                    {(filters.cat.length > 0 || filters.metal.length > 0 || filters.metalColor.length > 0 || filters.stone.length > 0 || filters.badge.length > 0) && (
                        <div className={styles.chips}>
                            {filters.cat.map(v => <span key={v} className={styles.chip} onClick={() => toggle('cat', v)}>{v} ✕</span>)}
                            {filters.metal.map(v => <span key={v} className={styles.chip} onClick={() => toggle('metal', v)}>{v} ✕</span>)}
                            {filters.metalColor.map(v => <span key={v} className={styles.chip} onClick={() => toggle('metalColor', v)}>{v} ✕</span>)}
                            {filters.stone.map(v => <span key={v} className={styles.chip} onClick={() => toggle('stone', v)}>{v} ✕</span>)}
                            {filters.badge.map(v => <span key={v} className={styles.chip} onClick={() => toggle('badge', v)}>{v} ✕</span>)}
                        </div>
                    )}

                    {/* Grid */}
                    {loading && products.length === 0 ? (
                        <div className={styles.emptyState}><p>Curating Collection…</p></div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No pieces match your current filters.</p>
                            <button className={styles.clearBtn} onClick={clear}>Clear All Filters</button>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {products.map((p: any) => (
                                <ProductCard key={p._id} product={{
                                    id: p._id,
                                    slug: p.slug,
                                    name: p.name,
                                    category: p.category?.slug ?? p.category ?? '',
                                    price: (filters.metal.includes('9k') ? p.price9k :
                                        filters.metal.includes('14k') ? p.price14k :
                                            filters.metal.includes('18k') ? p.price18k :
                                                filters.metal.includes('22k') ? p.price22k : null) ?? p.price,
                                    metal: p.metal,
                                    stone: p.stone,
                                    badge: p.badge,
                                    description: p.description,
                                    stone_detail: p.stoneDetail,
                                    gradient: 'linear-gradient(145deg,#ddd5c4,#c8bba8)',
                                    gradient_hover: 'linear-gradient(145deg,#c8b89a,#b8a880)',
                                    is_wishlisted: p.isWishlisted,
                                    images: p.images,
                                }} />
                            ))}
                        </div>
                    )}

                    {/* Show More Button */}
                    {products.length < total && (
                        <div className={styles.showMoreContainer}>
                            <button
                                className={styles.showMoreBtn}
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Show More Pieces'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopClient() {
    return (
        <Suspense>
            <ShopContent />
        </Suspense>
    );
}
