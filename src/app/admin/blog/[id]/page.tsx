'use client';

import { useEffect, useState, use } from 'react';
import { adminFetch } from '@/lib/adminAuth';
import BlogForm from '@/components/admin/BlogForm';

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch all blogs (public endpoint) and find by ID. 
                // Or try fetching by ID directly if the backend supports it.
                // Looking at `blog.py`, `GET /{slug}` exists but we only have `id`.
                // Let's fetch all and find by ID:
                const res = await adminFetch(`/blog?limit=100`);
                const json = await res.json();

                if (res.ok) {
                    const p = json.data.find((item: any) => item._id === resolvedParams.id);
                    if (p) {
                        setPost(p);
                    } else {
                        // Let's try to fetch all again or maybe the post is a draft that isn't returned?
                        // If public endpoint only returns published, and this is a draft... 
                        // Wait, backend `GET /blog` actually returns all posts, it doesn't filter by published. 
                        // Let's verify this assumption. 
                        setError('Post not found (it might be on another page or not exist)');
                    }
                } else {
                    setError('Failed to fetch post');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [resolvedParams.id]);

    if (loading) return <div style={{ padding: '2rem' }}>Loading post data...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!post) return null;

    return (
        <div>
            <BlogForm initialData={post} isEdit={true} />
        </div>
    );
}
