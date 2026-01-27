'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { Partner } from '@/data/references';

interface PartnerFormProps {
    initialData?: Partner;
    isEdit?: boolean;
}

export default function PartnerForm({ initialData, isEdit = false }: PartnerFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Partner>>({
        name: '',
        logo: '',
        website: '',
        ...initialData,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/partners/${initialData?.id}` : '/api/partners';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save partner');

            router.push('/admin/references');
            router.refresh();
        } catch (error) {
            console.error('Save error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/references" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEdit ? 'İş Ortağını Düzenle' : 'Yeni İş Ortağı'}
                    </h1>
                    <p className="text-gray-500 mt-1">İş ortağı bilgilerini doldurun</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Firma Adı</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                        <input
                            type="text"
                            value={formData.logo}
                            onChange={(e) => handleChange('logo', e.target.value)}
                            placeholder="/images/partners/company.svg"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Web Sitesi</label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500"
                        />
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
