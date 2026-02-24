'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminAuth';
import styles from './page.module.css';

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    category: string;
    coverImage: string;
    isPublished: boolean;
    createdAt: string;
}

export default function AdminBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            // Using public endpoint for listing (which might not include drafts unless we use an admin specific one?
            // Wait, backend router public GET `/blog` only returns published=True unless we specify otherwise?
            // Actually, looking at `blog.py`, `GET /blog` does not check `isPublished` in the DB query? 
            // Oh, I'll just use `/blog` and filter. If available, I'll add `&search=`
            // Actually, backend has no search on blog yet. We'll just fetch all.
            let url = `/blog?page=${page}&limit=12`;
            const res = await adminFetch(url);
            const json = await res.json();

            if (res.ok) {
                let items = json.data || [];
                if (search) {
                    items = items.filter((p: any) => p.title.toLowerCase().includes(search.toLowerCase()));
                }
                setPosts(items);
                if (json.pagination) setTotalPages(json.pagination.totalPages);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPosts();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchPosts]);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const res = await adminFetch(`/blog/admin/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
            } else {
                const json = await res.json();
                alert(json.message || 'Failed to delete post');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Journal</h1>
                    <p className={styles.subtitle}>Manage blog posts, guides, and inspiration articles.</p>
                </div>
                <Link href="/admin/blog/new" className={styles.addBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Post
                </Link>
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    className={styles.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && posts.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No posts found.</td></tr>
                        ) : (
                            posts.map(post => (
                                <tr key={post._id}>
                                    <td>
                                        <div className={styles.postInfo}>
                                            <img
                                                src={post.coverImage || 'https://via.placeholder.com/60'}
                                                alt={post.title}
                                                className={styles.postImage}
                                            />
                                            <div>
                                                <div className={styles.postTitle}>{post.title}</div>
                                                <div className={styles.postCategory}>{post.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`${styles.badge} ${post.isPublished ? styles.published : styles.draft}`}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/blog/${post._id}`} className={styles.actionBtn} title="Edit Post">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </Link>
                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteHover}`}
                                                onClick={() => handleDelete(post._id, post.title)}
                                                title="Delete Post"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageBtn}
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Prev
                        </button>
                        <span style={{ fontSize: '0.875rem', color: '#666' }}>Page {page} of {totalPages}</span>
                        <button
                            className={styles.pageBtn}
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
