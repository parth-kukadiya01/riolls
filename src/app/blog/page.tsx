'use client';

import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog';
import styles from './page.module.css';

const CATEGORIES = ['All', 'Guides', 'Behind the Craft', 'Inspiration', 'News'];

export default function BlogPage() {
    const [featured, ...rest] = BLOG_POSTS;

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
            <section className={styles.featuredSection}>
                <Link href={`/blog/${featured.slug}`} className={styles.featured}>
                    <div className={styles.featuredImg} style={{ background: featured.gradient }} />
                    <div className={styles.featuredBody}>
                        <span className={styles.catTag}>{featured.category}</span>
                        <h2 className={styles.featuredTitle}>{featured.title}</h2>
                        <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                        <div className={styles.meta}>
                            <span>{featured.author}</span>
                            <span className={styles.dot}>·</span>
                            <span>{featured.date}</span>
                            <span className={styles.dot}>·</span>
                            <span>{featured.readTime}</span>
                        </div>
                        <span className={styles.readMore}>Read Article →</span>
                    </div>
                </Link>
            </section>

            {/* Category tabs */}
            <section className={styles.allSection}>
                <div className={styles.catTabs}>
                    {CATEGORIES.map(c => (
                        <span key={c} className={`${styles.catTab} ${c === 'All' ? styles.catTabActive : ''}`}>{c}</span>
                    ))}
                </div>

                <div className={styles.grid}>
                    {rest.map(post => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
                            <div className={styles.cardImg} style={{ background: post.gradient }} />
                            <div className={styles.cardBody}>
                                <span className={styles.catTag}>{post.category}</span>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <div className={styles.meta}>
                                    <span>{post.date}</span>
                                    <span className={styles.dot}>·</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter strip */}
            <section className={styles.newsletter}>
                <h2 className={styles.newsletterH2}>Never miss a story.</h2>
                <p className={styles.newsletterSub}>New articles, collection drops, and exclusive atelier access — delivered to your inbox monthly.</p>
                <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                    <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
                    <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                </form>
            </section>
        </>
    );
}
