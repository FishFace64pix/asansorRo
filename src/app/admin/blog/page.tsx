'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, FileText, Eye, Calendar } from 'lucide-react';
import { BlogPost } from '@/data/blog';

export default function BlogManagement() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch blog posts', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete blog post', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const filteredPosts = posts.filter(post =>
        post.title.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
                    <p className="text-gray-500 mt-1">Tüm blog yazılarını görüntüle ve yönet</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Yazı
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Yazı ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Blog Posts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    {/* Thumbnail */}
                                    <div
                                        className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"
                                        style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    />

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold mb-2">
                                                    {post.category}
                                                </span>
                                                <h3 className="font-bold text-gray-900 mb-1">{post.title.tr}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt.tr}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <Link
                                                    href={`/ro/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Önizle"
                                                >
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                </Link>
                                                <Link
                                                    href={`/admin/blog/${post.id}/edit`}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-600" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(post.date)}
                                            </span>
                                            <span>{post.author}</span>
                                            <span>{post.readTime} dk okuma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredPosts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Blog yazısı bulunamadı
                    </div>
                )}
            </div>
        </div>
    );
}
