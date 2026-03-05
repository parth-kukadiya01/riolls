'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import styles from './page.module.css';

// Simple debounce helper
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    const fetchResults = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        try {
            setLoading(true);
            const res: any = await productsApi.search(searchQuery, 1, 12);
            setResults(res.data || []);
        } catch (err) {
            console.error('Search error:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResults(debouncedQuery);
    }, [debouncedQuery, fetchResults]);

    return (
        <div className={styles.page} style={{ paddingTop: 'var(--nav-height)' }}>
            <div className={styles.searchWrap}>
                <div className={styles.searchBox}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search rings, necklaces, sapphire…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className={styles.input}
                    />
                    {query && (
                        <button className={styles.clear} onClick={() => setQuery('')}>✕</button>
                    )}
                </div>
            </div>

            {query.trim() === '' && (
                <div className={styles.suggestions}>
                    <span className={styles.suggestLabel}>Popular searches</span>
                    <div className={styles.chips}>
                        {['Engagement Rings', 'Diamond Necklaces', 'Gold Bracelets', 'Sapphire Earrings', 'Bespoke'].map(s => (
                            <button key={s} className={styles.chip} onClick={() => setQuery(s)}>{s}</button>
                        ))}
                    </div>
                </div>
            )}

            {query.trim().length > 0 && (
                <div className={styles.results}>
                    <div className={styles.resultsHeader}>
                        {loading ? (
                            <span className={styles.resultsCount}>Searching...</span>
                        ) : (
                            <span className={styles.resultsCount}>
                                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                            </span>
                        )}
                        <Link href="/shop" className={styles.viewAll}>View all products →</Link>
                    </div>

                    {!loading && results.length > 0 ? (
                        <div className={styles.grid}>
                            {results.map(p => <ProductCard key={p._id || p.id} product={p} />)}
                        </div>
                    ) : !loading ? (
                        <div className={styles.empty}>
                            <p className={styles.emptyText}>No results for &ldquo;{query}&rdquo;</p>
                            <p className={styles.emptySub}>Try searching for a category, metal, or gemstone.</p>
                            <Link href="/shop" className={styles.shopBtn}>Browse All Jewellery</Link>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
