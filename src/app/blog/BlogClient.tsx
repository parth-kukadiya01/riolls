'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogApi, newsletterApi } from '@/lib/api';
import styles from './page.module.css';

export default function BlogClient() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activecat, setActiveCat] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        setLoading(true);
        const params: Record<string, string> = {};
        if (activecat !== 'All') params.category = activecat;
        blogApi
            .list(params as any)
            .then((res: any) => {
                const items = Array.isArray(res.data) ? res.data : [];
                setPosts(items);
                // Extract unique categories dynamically from the loaded posts if 'All' is selected
                if (activecat === 'All') {
                    const uniqueCats = Array.from(new Set(items.map((p: any) => p.category).filter(Boolean)));
                    setCategories(['All', ...(uniqueCats as string[])]);
                }
            })
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, [activecat]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        try {
            await newsletterApi.subscribe(email);
            setSubscribed(true);
            setEmail('');
        } catch { }
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const [featured, ...rest] = posts;

    return (
        <>
            {/* Hero */}
            <section className={styles.hero} style={{ paddingTop: 'var(--nav-height)' }}>
                <div className={styles.heroBrow}>
                    <span className={styles.heroLine} />
                    <span className={styles.heroBrowText}>The Journal</span>
                </div>
                <h1 className={styles.heroH1}>Stories from the atelier.</h1>
                <p className={styles.heroSub}>Expert guides, craft essays, and inspiration — written by our goldsmiths and in-house editors.</p>
            </section>

            {/* Featured */}
            {!loading && featured && (
                <section className={styles.featuredSection}>
                    <Link href={`/blog/${featured.slug}`} className={styles.featured}>
                        <div className={styles.featuredImg} style={{ background: featured.image ? `url(${featured.image}) center/cover` : 'linear-gradient(135deg,#F5EAE7,#EDD8D1)' }} />
                        <div className={styles.featuredBody}>
                            <span className={styles.catTag}>{featured.category}</span>
                            <h2 className={styles.featuredTitle}>{featured.title}</h2>
                            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                            <div className={styles.meta}>
                                <span>{featured.author?.name ?? featured.authorName}</span>
                                <span className={styles.dot}>·</span>
                                <span>{formatDate(featured.date)}</span>
                                <span className={styles.dot}>·</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <span className={styles.readMore}>Read Article →</span>
                        </div>
                    </Link>
                </section>
            )}

            {/* Category tabs */}
            <section className={styles.allSection}>
                <div className={styles.catTabs}>
                    {categories.map(c => (
                        <span
                            key={c}
                            className={`${styles.catTab} ${activecat === c ? styles.catTabActive : ''}`}
                            onClick={() => setActiveCat(c)}
                            style={{ cursor: 'pointer' }}
                        >{c}</span>
                    ))}
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>Loading articles…</p>
                ) : (
                    <div className={styles.grid}>
                        {rest.map((post: any) => (
                            <Link key={post._id} href={`/blog/${post.slug}`} className={styles.card}>
                                <div className={styles.cardImg} style={{ background: post.image ? `url(${post.image}) center/cover` : 'linear-gradient(135deg,#E8EEF5,#D4E0ED)' }} />
                                <div className={styles.cardBody}>
                                    <span className={styles.catTag}>{post.category}</span>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                    <div className={styles.meta}>
                                        <span>{formatDate(post.date)}</span>
                                        <span className={styles.dot}>·</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter strip */}
            {/* <section className={styles.newsletter}>
                <h2 className={styles.newsletterH2}>Never miss a story.</h2>
                <p className={styles.newsletterSub}>New articles, collection drops, and exclusive atelier access — delivered to your inbox monthly.</p>
                {subscribed ? (
                    <p style={{ color: '#7a6a5a', fontStyle: 'italic' }}>Thank you for subscribing!</p>
                ) : (
                    <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className={styles.newsletterInput}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                    </form>
                )}
            </section> */}
        </>
    );
}
