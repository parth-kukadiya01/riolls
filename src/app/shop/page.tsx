'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/lib/products';
import type { Category, Metal, Stone, Product } from '@/lib/products';
import styles from './page.module.css';

const METALS: Metal[] = ['yellow-gold', 'white-gold', 'rose-gold', 'platinum'];
const STONES: Stone[] = ['diamond', 'ruby', 'sapphire', 'emerald', 'pearl'];
const CATS: Category[] = ['rings', 'necklaces', 'earrings', 'bracelets'];

function ShopContent() {
    const sp = useSearchParams();

    const [filters, setFilters] = useState<{
        cat: Category | null;
        metal: Metal | null;
        stone: Stone | null;
        minPrice: number;
        maxPrice: number;
    }>({
        cat: (sp.get('cat') as Category) || null,
        metal: null,
        stone: (sp.get('stone') as Stone) || null,
        minPrice: 0,
        maxPrice: 20000,
    });
    const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setFilters(f => ({ ...f, cat: (sp.get('cat') as Category) || null }));
    }, [sp]);

    let filtered: Product[] = PRODUCTS.filter(p => {
        if (filters.cat && p.category !== filters.cat) return false;
        if (filters.metal && p.metal !== filters.metal) return false;
        if (filters.stone && p.stone !== filters.stone) return false;
        if (p.price !== null && (p.price < filters.minPrice || p.price > filters.maxPrice)) return false;
        return true;
    });

    if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => (a.price ?? 99999) - (b.price ?? 99999));
    if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    const toggle = <K extends keyof typeof filters>(key: K, val: (typeof filters)[K]) => {
        setFilters(f => ({ ...f, [key]: f[key] === val ? null : val }));
    };

    const clear = () => setFilters({ cat: null, metal: null, stone: null, minPrice: 0, maxPrice: 20000 });

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
                        {CATS.map(c => (
                            <label key={c} className={styles.filterItem}>
                                <input type="checkbox" checked={filters.cat === c} onChange={() => toggle('cat', c)} />
                                <span style={{ textTransform: 'capitalize' }}>{c}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Metal</span>
                        {METALS.map(m => (
                            <label key={m} className={styles.filterItem}>
                                <input type="checkbox" checked={filters.metal === m} onChange={() => toggle('metal', m)} />
                                <span style={{ textTransform: 'capitalize' }}>{m.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterGroup}>
                        <span className={styles.filterLabel}>Stone</span>
                        {STONES.map(s => (
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
                            <span className={styles.resultCount}>{filtered.length} pieces</span>
                        </div>
                        <select
                            className={styles.sortSelect}
                            value={sort}
                            onChange={e => setSort(e.target.value as typeof sort)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
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
                    {filtered.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No pieces match your filters.</p>
                            <button className={styles.clearBtn} onClick={clear}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
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
