'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Search, Building2, MessageSquare, Star, Pencil } from 'lucide-react';
import { Partner, Testimonial } from '@/data/references';

export default function ReferencesManagement() {
    const [activeTab, setActiveTab] = useState<'partners' | 'testimonials'>('partners');
    const [partners, setPartners] = useState<Partner[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        Promise.all([fetchPartners(), fetchTestimonials()]).finally(() => setLoading(false));
    }, []);

    const fetchPartners = async () => {
        try {
            const res = await fetch('/api/partners');
            if (res.ok) setPartners(await res.json());
        } catch (error) {
            console.error('Failed to fetch partners', error);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/testimonials');
            if (res.ok) setTestimonials(await res.json());
        } catch (error) {
            console.error('Failed to fetch testimonials', error);
        }
    };

    const filteredPartners = partners.filter(partner =>
        partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTestimonials = testimonials.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string, type: 'partner' | 'testimonial') => {
        if (!confirm('Silmek istediğinize emin misiniz?')) return;

        const endpoint = type === 'partner' ? `/api/partners/${id}` : `/api/testimonials/${id}`;

        try {
            const res = await fetch(endpoint, { method: 'DELETE' });
            if (res.ok) {
                if (type === 'partner') {
                    setPartners(partners.filter(p => p.id !== id));
                } else {
                    setTestimonials(testimonials.filter(t => t.id !== id));
                }
            }
        } catch (error) {
            console.error(`Failed to delete ${type}`, error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Referans Yönetimi</h1>
                    <p className="text-gray-500 mt-1">İş ortakları ve müşteri yorumlarını yönet</p>
                </div>
                <Link
                    href={`/admin/references/new/${activeTab === 'partners' ? 'partner' : 'testimonial'}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Ekle
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    <button
                        onClick={() => setActiveTab('partners')}
                        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'partners'
                            ? 'border-accent-600 text-accent-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <Building2 className="w-4 h-4" />
                        İş Ortakları
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'testimonials'
                            ? 'border-accent-600 text-accent-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Müşteri Yorumları
                    </button>
                </nav>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                ) : activeTab === 'partners' ? (
                    // Partners List
                    <div className="divide-y divide-gray-100">
                        {filteredPartners.map((partner) => (
                            <div key={partner.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                        <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-accent-600">
                                            {partner.website || '-'}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/references/partner/${partner.id}/edit`}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(partner.id, 'partner')}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filteredPartners.length === 0 && <div className="p-8 text-center text-gray-500">Kayıt bulunamadı.</div>}
                    </div>
                ) : (
                    // Testimonials List
                    <div className="divide-y divide-gray-100">
                        {filteredTestimonials.map((testimonial) => (
                            <div key={testimonial.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                                <span className="text-sm text-gray-500">• {testimonial.position.tr}</span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600 mb-2">{testimonial.company}</p>
                                            <p className="text-gray-600 text-sm italic">"{testimonial.content.tr}"</p>
                                            <div className="flex items-center gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/references/testimonial/${testimonial.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(testimonial.id, 'testimonial')}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredTestimonials.length === 0 && <div className="p-8 text-center text-gray-500">Kayıt bulunamadı.</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
