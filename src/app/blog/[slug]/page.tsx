'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { blogApi, newsletterApi } from '@/lib/api';
import styles from './page.module.css';

function Stars({ n }: { n: number }) {
    return <span style={{ color: '#C9A96E', letterSpacing: '2px' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [post, setPost] = useState<any>(null);
    const [status, setStatus] = useState<'loading' | 'found' | 'notfound'>('loading');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        if (!slug) return;
        blogApi
            .getBySlug(slug)
            .then((res: any) => {
                if (res.data) { setPost(res.data); setStatus('found'); }
                else setStatus('notfound');
            })
            .catch(() => setStatus('notfound'));
    }, [slug]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        try { await newsletterApi.subscribe(email); setSubscribed(true); setEmail(''); } catch { }
    };

    const formatDate = (iso?: string) =>
        iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    if (status === 'loading') {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--nav-height) 0 0' }}>
                <div className={styles.skeletonCard} style={{ width: '100%', maxWidth: '720px', height: '60vh', margin: '0 auto' }} />
            </div>
        );
    }

    if (status === 'notfound' || !post) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-height)', gap: '1.5rem', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.5rem', color: 'var(--charcoal)' }}>Article Not Found</h1>
                <p style={{ color: 'var(--stone)' }}>This article may have been moved or removed.</p>
                <Link href="/blog" style={{ color: 'var(--rose)', textDecoration: 'underline' }}>← Back to The Journal</Link>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className={styles.postHero} style={{ paddingTop: 'var(--nav-height)' }}>
                {post.image && (
                    <div className={styles.postHeroImg} style={{ backgroundImage: `url(${post.image})` }} />
                )}
                <div className={styles.postHeroOverlay}>
                    <div className={styles.postHeroContent}>
                        <Link href="/blog" className={styles.backLink}>← The Journal</Link>
                        <span className={styles.catTag}>{post.category}</span>
                        <h1 className={styles.postTitle}>{post.title}</h1>
                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                        <div className={styles.meta}>
                            <span>{post.author?.name ?? post.authorName}</span>
                            <span className={styles.dot}>·</span>
                            <span>{formatDate(post.date)}</span>
                            <span className={styles.dot}>·</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article body */}
            <article className={styles.postBody}>
                <div className={styles.postContent}>
                    {/* Render content — support both HTML and plain paragraphs */}
                    {post.content ? (
                        post.content.startsWith('<') ? (
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        ) : (
                            post.content.split('\n\n').map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                            ))
                        )
                    ) : (
                        <p style={{ color: 'var(--stone)', fontStyle: 'italic' }}>Full article coming soon…</p>
                    )}
                </div>

                {/* Author card */}
                {(post.author?.name || post.authorName) && (
                    <div className={styles.authorCard}>
                        {post.author?.avatar && (
                            <img src={post.author.avatar} alt={post.author.name} className={styles.authorAvatar} />
                        )}
                        <div>
                            <span className={styles.authorLabel}>Written by</span>
                            <span className={styles.authorName}>{post.author?.name ?? post.authorName}</span>
                        </div>
                    </div>
                )}
            </article>

            {/* Newsletter */}
            <section className={styles.newsletter}>
                <h2 className={styles.newsletterH2}>Never miss a story.</h2>
                <p className={styles.newsletterSub}>New articles, collection drops, and exclusive atelier access — delivered monthly.</p>
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
                            autoComplete="email"
                            required
                        />
                        <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                    </form>
                )}
            </section>

            {/* Back link */}
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Link href="/blog" style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--charcoal)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                    ← All Articles
                </Link>
            </div>
        </>
    );
}
