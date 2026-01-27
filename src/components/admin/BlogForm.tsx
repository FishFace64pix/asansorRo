'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { BlogPost } from '@/data/blog';

interface BlogFormProps {
    initialData?: BlogPost;
    isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: { tr: '', en: '', ro: '' },
        slug: '',
        category: 'Technology',
        author: 'Admin',
        excerpt: { tr: '', en: '', ro: '' },
        content: { tr: '', en: '', ro: '' },
        image: '',
        readTime: 5,
        featured: false,
        ...initialData,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/blog/${initialData?.id}` : '/api/blog';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save blog post');

            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('Save error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any, subfield?: string) => {
        if (subfield) {
            setFormData(prev => ({
                ...prev,
                [field]: { ...(prev as any)[field], [subfield]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
                    </h1>
                    <p className="text-gray-500 mt-1">Yazı bilgilerini doldurun</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Temel Bilgiler</h2>
                    <div className="grid gap-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık (TR)</label>
                                <input
                                    type="text"
                                    value={formData.title?.tr}
                                    onChange={(e) => handleChange('title', e.target.value, 'tr')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık (EN)</label>
                                <input
                                    type="text"
                                    value={formData.title?.en}
                                    onChange={(e) => handleChange('title', e.target.value, 'en')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık (RO)</label>
                                <input
                                    type="text"
                                    value={formData.title?.ro}
                                    onChange={(e) => handleChange('title', e.target.value, 'ro')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                    placeholder="blog-yazisi-slug"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="technology">Teknoloji</option>
                                    <option value="maintenance">Bakım</option>
                                    <option value="safety">Güvenlik</option>
                                    <option value="guide">Rehber</option>
                                    <option value="news">Haberler</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Yazar</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => handleChange('author', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                    placeholder="/images/blog/example.jpg"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Okuma Süresi (dk)</label>
                                <input
                                    type="number"
                                    value={formData.readTime}
                                    onChange={(e) => handleChange('readTime', parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => handleChange('featured', e.target.checked)}
                                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Öne Çıkan Yazı</label>
                        </div>
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Özet</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Özet (TR)</label>
                            <textarea
                                value={formData.excerpt?.tr}
                                onChange={(e) => handleChange('excerpt', e.target.value, 'tr')}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Özet (EN)</label>
                            <textarea
                                value={formData.excerpt?.en}
                                onChange={(e) => handleChange('excerpt', e.target.value, 'en')}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Özet (RO)</label>
                            <textarea
                                value={formData.excerpt?.ro}
                                onChange={(e) => handleChange('excerpt', e.target.value, 'ro')}
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">İçerik (HTML destekli)</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik (TR)</label>
                            <textarea
                                value={formData.content?.tr}
                                onChange={(e) => handleChange('content', e.target.value, 'tr')}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik (EN)</label>
                            <textarea
                                value={formData.content?.en}
                                onChange={(e) => handleChange('content', e.target.value, 'en')}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">İçerik (RO)</label>
                            <textarea
                                value={formData.content?.ro}
                                onChange={(e) => handleChange('content', e.target.value, 'ro')}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link href="/admin/blog" className="px-6 py-3 text-gray-600 hover:text-gray-900">
                        İptal
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
