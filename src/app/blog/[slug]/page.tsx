import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterForm from './NewsletterForm';
import styles from './page.module.css';

const API_URL = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function getPost(slug: string) {
    try {
        const res = await fetch(`${API_URL}/blog/${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Article Not Found' };
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `https://riolls.com/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url: `https://riolls.com/blog/${post.slug}`,
            ...(post.image && { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] }),
            ...(post.date && { publishedTime: post.date }),
            ...(post.updatedAt && { modifiedTime: post.updatedAt }),
            ...(post.author?.name && { authors: [post.author.name] }),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            ...(post.image && { images: [post.image] }),
        },
    };
}

function formatDate(iso?: string) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

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

            {/* Newsletter — client component (needs form state) */}
            <NewsletterForm />

            {/* Back link */}
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Link href="/blog" style={{ fontFamily: 'var(--font-sc)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--charcoal)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                    ← All Articles
                </Link>
            </div>
        </>
    );
}
