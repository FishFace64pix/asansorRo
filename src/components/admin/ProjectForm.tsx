'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectFormProps {
    initialData?: Project;
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: { tr: '', en: '', ro: '' },
        slug: '',
        category: 'residential',
        location: '',
        year: new Date().getFullYear(),
        client: '',
        elevatorCount: 1,
        floors: 1,
        featured: false,
        status: 'completed',
        image: '',
        gallery: [],
        description: { tr: '', en: '', ro: '' },
        ...initialData,
    });

    const [galleryInput, setGalleryInput] = useState(initialData?.gallery?.join('\n') || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = {
                ...formData,
                gallery: galleryInput.split('\n').filter(s => s.trim()),
            };

            const url = isEdit ? `/api/projects/${initialData?.id}` : '/api/projects';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });

            if (!res.ok) throw new Error('Failed to save project');

            router.push('/admin/projects');
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
                <Link href="/admin/projects" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
                    </h1>
                    <p className="text-gray-500 mt-1">Proje bilgilerini doldurun</p>
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık (EN)</label>
                                <input
                                    type="text"
                                    value={formData.title?.en}
                                    onChange={(e) => handleChange('title', e.target.value, 'en')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık (RO)</label>
                                <input
                                    type="text"
                                    value={formData.title?.ro}
                                    onChange={(e) => handleChange('title', e.target.value, 'ro')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                    placeholder="project-slug"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                >
                                    <option value="residential">Konut</option>
                                    <option value="commercial">Ticari</option>
                                    <option value="industrial">Endüstriyel</option>
                                    <option value="hospital">Hastane</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Konum</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Müşteri</label>
                                <input
                                    type="text"
                                    value={formData.client}
                                    onChange={(e) => handleChange('client', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
                                <input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => handleChange('year', parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Asansör Sayısı</label>
                                <input
                                    type="number"
                                    value={formData.elevatorCount}
                                    onChange={(e) => handleChange('elevatorCount', parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kat Sayısı</label>
                                <input
                                    type="number"
                                    value={formData.floors}
                                    onChange={(e) => handleChange('floors', parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                >
                                    <option value="completed">Tamamlandı</option>
                                    <option value="in-progress">Devam Ediyor</option>
                                    <option value="planned">Planlı</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={(e) => handleChange('featured', e.target.checked)}
                                className="w-4 h-4 text-accent-600 rounded focus:ring-accent-500"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Öne Çıkan Proje</label>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Açıklama</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">TR</label>
                            <textarea
                                value={formData.description?.tr}
                                onChange={(e) => handleChange('description', e.target.value, 'tr')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">EN</label>
                            <textarea
                                value={formData.description?.en}
                                onChange={(e) => handleChange('description', e.target.value, 'en')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">RO</label>
                            <textarea
                                value={formData.description?.ro}
                                onChange={(e) => handleChange('description', e.target.value, 'ro')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Görseller</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ana Görsel URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => handleChange('image', e.target.value)}
                                placeholder="/images/projects/project-1.jpg"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Galeri Görselleri (Her satıra bir URL)</label>
                            <textarea
                                value={galleryInput}
                                onChange={(e) => setGalleryInput(e.target.value)}
                                rows={3}
                                placeholder="/images/projects/project-1-1.jpg"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link href="/admin/projects" className="px-6 py-3 text-gray-600 hover:text-gray-900">
                        İptal
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
