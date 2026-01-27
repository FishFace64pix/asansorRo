'use client';

import { useEffect, useState, use } from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { BlogPost } from '@/data/blog';

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/blog`)
            .then(res => res.json())
            .then((data: BlogPost[]) => {
                const found = data.find(p => p.id === id);
                setPost(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!post) return <div>Blog yazısı bulunamadı</div>;

    return <BlogForm initialData={post} isEdit />;
}
