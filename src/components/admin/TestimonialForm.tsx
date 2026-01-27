'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Testimonial } from '@/data/references';

interface TestimonialFormProps {
    initialData?: Testimonial;
    isEdit?: boolean;
}

export default function TestimonialForm({ initialData, isEdit = false }: TestimonialFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: '',
        company: '',
        avatar: '',
        rating: 5,
        position: { tr: '', en: '', ro: '' },
        content: { tr: '', en: '', ro: '' },
        ...initialData,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/testimonials/${initialData?.id}` : '/api/testimonials';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save testimonial');

            // Force tab to testimonials
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('tab', 'testimonials');

            router.push('/admin/references');
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
                <Link href="/admin/references" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'Müşteri Yorumunu Düzenle' : 'Yeni Müşteri Yorumu'}
                    </h1>
                    <p className="text-gray-500 mt-1">Müşteri yorumu bilgilerini doldurun</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Kişi Bilgileri</h2>
                    <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şirket</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => handleChange('company', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                                <input
                                    type="text"
                                    value={formData.avatar}
                                    onChange={(e) => handleChange('avatar', e.target.value)}
                                    placeholder="/images/testimonials/avatar.jpg"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Puan (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={formData.rating}
                                    onChange={(e) => handleChange('rating', parseInt(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon (TR)</label>
                                <input
                                    type="text"
                                    value={formData.position?.tr}
                                    onChange={(e) => handleChange('position', e.target.value, 'tr')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon (EN)</label>
                                <input
                                    type="text"
                                    value={formData.position?.en}
                                    onChange={(e) => handleChange('position', e.target.value, 'en')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pozisyon (RO)</label>
                                <input
                                    type="text"
                                    value={formData.position?.ro}
                                    onChange={(e) => handleChange('position', e.target.value, 'ro')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Yorum İçeriği</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yorum (TR)</label>
                            <textarea
                                value={formData.content?.tr}
                                onChange={(e) => handleChange('content', e.target.value, 'tr')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yorum (EN)</label>
                            <textarea
                                value={formData.content?.en}
                                onChange={(e) => handleChange('content', e.target.value, 'en')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yorum (RO)</label>
                            <textarea
                                value={formData.content?.ro}
                                onChange={(e) => handleChange('content', e.target.value, 'ro')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <Link href="/admin/references" className="px-6 py-3 text-gray-600 hover:text-gray-900">
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
