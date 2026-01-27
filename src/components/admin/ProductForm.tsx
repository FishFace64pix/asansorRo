'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductFormProps {
    initialData?: Product;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: { tr: '', en: '', ro: '' },
        slug: '',
        category: 'residential',
        capacity: 630,
        speed: 1.0,
        floors: 8,
        power: '5.5 kW',
        dimensions: { width: 1100, depth: 1400, height: 2200 },
        warranty: '2 yıl',
        description: { tr: '', en: '', ro: '' },
        features: { tr: [], en: [], ro: [] },
        images: [],
        brochureUrl: '',
        ...initialData,
    });

    // Helper for features input (convert array to newline separated string)
    const [featuresInput, setFeaturesInput] = useState({
        tr: initialData?.features?.tr.join('\n') || '',
        en: initialData?.features?.en.join('\n') || '',
        ro: initialData?.features?.ro.join('\n') || '',
    });

    // Helper for images input
    const [imagesInput, setImagesInput] = useState(initialData?.images?.join('\n') || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare data
            const submitData = {
                ...formData,
                features: {
                    tr: featuresInput.tr.split('\n').filter(s => s.trim()),
                    en: featuresInput.en.split('\n').filter(s => s.trim()),
                    ro: featuresInput.ro.split('\n').filter(s => s.trim()),
                },
                images: imagesInput.split('\n').filter(s => s.trim()),
            };

            const url = isEdit ? `/api/products/${initialData?.id}` : '/api/products';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });

            if (!res.ok) throw new Error('Failed to save product');

            router.push('/admin/products');
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
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                    </h1>
                    <p className="text-gray-500 mt-1">Ürün bilgilerini doldurun</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                {/* Basic Info */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Temel Bilgiler</h2>
                    <div className="grid gap-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">İsim (TR)</label>
                                <input
                                    type="text"
                                    value={formData.name?.tr}
                                    onChange={(e) => handleChange('name', e.target.value, 'tr')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">İsim (EN)</label>
                                <input
                                    type="text"
                                    value={formData.name?.en}
                                    onChange={(e) => handleChange('name', e.target.value, 'en')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">İsim (RO)</label>
                                <input
                                    type="text"
                                    value={formData.name?.ro}
                                    onChange={(e) => handleChange('name', e.target.value, 'ro')}
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
                                    placeholder="urun-slug"
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
                                    <option value="freight">Yük</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specs */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Teknik Özellikler</h2>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasite (kg)</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hız (m/s)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.speed}
                                onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Güç</label>
                            <input
                                type="text"
                                value={formData.power}
                                onChange={(e) => handleChange('power', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Genişlik (mm)</label>
                            <input
                                type="number"
                                value={formData.dimensions?.width}
                                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions!, width: parseInt(e.target.value) } }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Derinlik (mm)</label>
                            <input
                                type="number"
                                value={formData.dimensions?.depth}
                                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions!, depth: parseInt(e.target.value) } }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yükseklik (mm)</label>
                            <input
                                type="number"
                                value={formData.dimensions?.height}
                                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: { ...prev.dimensions!, height: parseInt(e.target.value) } }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
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

                {/* Features */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Özellikler (Her satıra bir özellik)</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">TR</label>
                            <textarea
                                value={featuresInput.tr}
                                onChange={(e) => setFeaturesInput(prev => ({ ...prev, tr: e.target.value }))}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">EN</label>
                            <textarea
                                value={featuresInput.en}
                                onChange={(e) => setFeaturesInput(prev => ({ ...prev, en: e.target.value }))}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">RO</label>
                            <textarea
                                value={featuresInput.ro}
                                onChange={(e) => setFeaturesInput(prev => ({ ...prev, ro: e.target.value }))}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Görseller</h2>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resim Yolları (Her satıra bir URL)</label>
                    <textarea
                        value={imagesInput}
                        onChange={(e) => setImagesInput(e.target.value)}
                        rows={3}
                        placeholder="/images/example.jpg"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link href="/admin/products" className="px-6 py-3 text-gray-600 hover:text-gray-900">
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
