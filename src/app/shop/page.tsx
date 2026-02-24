'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { productsApi, categoriesApi } from '@/lib/api';
import styles from './page.module.css';

function ShopContent() {
    const sp = useSearchParams();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    // Dynamic Filter Options
    const [dbCategories, setDbCategories] = useState<{ name: string, slug: string }[]>([]);
    const [dbMetals, setDbMetals] = useState<string[]>([]);
    const [dbStones, setDbStones] = useState<string[]>([]);

    const [filters, setFilters] = useState<{
        cat: string | null;
        metal: string | null;
        stone: string | null;
        maxPrice: number;
    }>({
        cat: (sp.get('cat')) || null,
        metal: null,
        stone: (sp.get('stone')) || null,
        maxPrice: 20000,
    });
    const [sort, setSort] = useState<'featured' | 'price' | '-price'>('featured');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Re-read category from URL params
    useEffect(() => {
        setFilters(f => ({ ...f, cat: sp.get('cat') || null }));
    }, [sp]);

    // Fetch categories on mount
    useEffect(() => {
        categoriesApi.list().then((res: any) => {
            const items = res.data ?? [];
            setDbCategories(items.map((i: any) => ({ name: i.name, slug: i.slug || i.name.toLowerCase().replace(/\s+/g, '-') })));
        }).catch(() => { });
    }, []);

    // Fetch products whenever filters / sort / page change
    useEffect(() => {
        setLoading(true);
        const params: Record<string, string | number> = { page, limit: 24, sort };
        if (filters.cat) params.category = filters.cat;
        if (filters.metal) params.metal = filters.metal;
        if (filters.stone) params.stone = filters.stone;
        if (filters.maxPrice < 20000) params.maxPrice = filters.maxPrice;

        productsApi
            .list(params)
            .then((res: any) => {
                const items = res.data?.items ?? [];
                setProducts(items);
                setTotal(res.data?.total ?? 0);

                // If no specific metal/stone filter is active, extract the available ones dynamically
                if (!filters.metal && !filters.stone) {
                    const metals = Array.from(new Set(items.map((p: any) => p.metal).filter(Boolean)));
                    const stones = Array.from(new Set(items.map((p: any) => p.stone).filter(Boolean)));
                    if (metals.length) setDbMetals(metals as string[]);
                    if (stones.length) setDbStones(stones as string[]);
                }
            })
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [filters, sort, page]);

    const toggle = <K extends keyof typeof filters>(key: K, val: (typeof filters)[K]) =>
        setFilters(f => ({ ...f, [key]: f[key] === val ? null : val }));

    const clear = () =>
        setFilters({ cat: null, metal: null, stone: null, maxPrice: 20000 });

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <span>Home</span><span className={styles.sep}>/</span>
                <span>Shop</span>
                {filters.cat && <><span className={styles.sep}>/</span><span style={{ textTransform: 'capitalize' }}>{filters.cat}</span></>}
            </div>

            <div className={styles.layout}>
                {/* Sidebar */}
                <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <span className={styles.sidebarTitle}>Filters</span>
                        <button className={styles.clearAll} onClick={clear}>Clear All</button>
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Category</span>
                        {dbCategories.map(c => (
                            <label key={c.slug} className={styles.filterItem}>
                                <input type="checkbox" checked={filters.cat === c.slug} onChange={() => toggle('cat', c.slug)} />
                                <span style={{ textTransform: 'capitalize' }}>{c.name}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Metal</span>
                        {dbMetals.map((m: string) => (
                            <label key={m} className={styles.filterItem}>
                                <input type="checkbox" checked={filters.metal === m} onChange={() => toggle('metal', m)} />
                                <span style={{ textTransform: 'capitalize' }}>{m.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Stone</span>
                        {dbStones.map((s: string) => (
                            <label key={s} className={styles.filterItem}>
                                <input type="checkbox" checked={filters.stone === s} onChange={() => toggle('stone', s)} />
                                <span style={{ textTransform: 'capitalize' }}>{s}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Price Range</span>
                        <input
                            type="range"
                            min={0} max={20000} step={500}
                            value={filters.maxPrice}
                            onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
                            className={styles.priceRange}
                        />
                        <span className={styles.priceRangeLabel}>
                            Up to £{filters.maxPrice.toLocaleString()}
                        </span>
                    </div>
                </aside>

                {/* Main */}
                <div className={styles.main}>
                    {/* Toolbar */}
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarLeft}>
                            <button className={styles.filterToggle} onClick={() => setSidebarOpen(o => !o)}>
                                {sidebarOpen ? '✕ Filters' : '⊞ Filters'}
                            </button>
                            <span className={styles.resultCount}>{loading ? '…' : `${total} pieces`}</span>
                        </div>
                        <select
                            className={styles.sortSelect}
                            value={sort}
                            onChange={e => setSort(e.target.value as typeof sort)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price">Price: Low → High</option>
                            <option value="-price">Price: High → Low</option>
                        </select>
                    </div>

                    {/* Active filter chips */}
                    {(filters.cat || filters.metal || filters.stone) && (
                        <div className={styles.chips}>
                            {filters.cat && <span className={styles.chip} onClick={() => setFilters(f => ({ ...f, cat: null }))} style={{ textTransform: 'capitalize' }}>{filters.cat} ✕</span>}
                            {filters.metal && <span className={styles.chip} onClick={() => setFilters(f => ({ ...f, metal: null }))} style={{ textTransform: 'capitalize' }}>{filters.metal.replace('-', ' ')} ✕</span>}
                            {filters.stone && <span className={styles.chip} onClick={() => setFilters(f => ({ ...f, stone: null }))} style={{ textTransform: 'capitalize' }}>{filters.stone} ✕</span>}
                        </div>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className={styles.emptyState}><p>Loading collection…</p></div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No pieces match your filters.</p>
                            <button className={styles.clearBtn} onClick={clear}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {products.map((p: any) => (
                                <ProductCard key={p._id} product={{
                                    id: p._id,
                                    slug: p.slug,
                                    name: p.name,
                                    category: p.category?.slug ?? p.category ?? '',
                                    price: p.price,
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

                    {/* Pagination */}
                    {!loading && total > 24 && (
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
                            <span style={{ lineHeight: '2' }}>Page {page} of {Math.ceil(total / 24)}</span>
                            <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 24)}>Next →</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense>
            <ShopContent />
        </Suspense>
    );
}
