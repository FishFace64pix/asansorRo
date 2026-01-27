'use client';

import { useState, useEffect } from 'react';
import { Download, Search, Mail, Phone, Calendar, Paperclip, FileText, X, Trash2 } from 'lucide-react';

interface Quote {
    id: string;
    companyName: string;
    fullName: string;
    phone: string;
    email: string;
    dimensions: string;
    description: string;
    fileUrl: string | null;
    status: string;
    createdAt: string;
}

// Client component olduğu için fs kullanamayız, API üzerinden veri çekmeliyiz.
// Ancak demo için API endpoint oluşturmak yerine server component yapabiliriz veya
// geçici olarak bir data fetcher yazabiliriz. 
// En doğrusu: quotes.json dosyasını okuyan bir API endpoint (GET) yapmak veya Server Component kullanmak.

// Server Component (Async) yapalım.
// Admin sayfası olduğu için SEO öncelikli değil, client side fetching de olur.
// Hızlı çözüm: Server Component olarak dosyayı okuyup render edelim.
// Fakat 'use client' dedik şimdilik, data fetching için useEffect kullanalım
// ve API route'a GET metodu ekleyelim.

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const res = await fetch('/api/contact');
            if (res.ok) {
                const data = await res.json();
                setQuotes(data);
            }
        } catch (error) {
            console.error('Failed to fetch quotes', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch('/api/contact', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) {
                setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const deleteQuote = async (id: string) => {
        if (!confirm('Bu teklifi silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch('/api/contact', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setQuotes(quotes.filter(q => q.id !== id));
                if (selectedQuote?.id === id) setSelectedQuote(null);
            }
        } catch (error) {
            console.error('Failed to delete quote', error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Yeni</span>;
            case 'in_progress':
                return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">İşleniyor</span>;
            case 'completed':
                return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Tamamlandı</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
        }
    };

    const StatusSelect = ({ quote }: { quote: Quote }) => (
        <select
            value={quote.status}
            onChange={(e) => updateStatus(quote.id, e.target.value)}
            className="text-sm border-gray-200 rounded-md focus:ring-accent-500 focus:border-accent-500 py-1 pl-2 pr-8"
        >
            <option value="new">Yeni</option>
            <option value="in_progress">Devam Eden</option>
            <option value="completed">Tamamlandı</option>
        </select>
    );

    const filteredQuotes = quotes.filter(quote =>
        quote.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Teklif Talepleri</h1>
                    <p className="text-gray-500 mt-1">Web sitesinden gelen teklif istekleri</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tekliflerde ara (Firma, İsim, E-posta)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Durum</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Firma / Kişi</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">İletişim</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Dosya</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Tarih</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Yükleniyor...
                                    </td>
                                </tr>
                            ) : filteredQuotes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Henüz teklif talebi bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                filteredQuotes.map((quote) => (
                                    <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <StatusSelect quote={quote} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{quote.companyName}</div>
                                            <div className="text-sm text-gray-500">{quote.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                <Mail className="w-4 h-4" />
                                                <a href={`mailto:${quote.email}`} className="hover:text-accent-600">{quote.email}</a>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                <a href={`tel:${quote.phone}`} className="hover:text-accent-600">{quote.phone}</a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {quote.fileUrl ? (
                                                <a
                                                    href={quote.fileUrl}
                                                    download
                                                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <Paperclip className="w-3.5 h-3.5" />
                                                    İndir
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(quote.createdAt).toLocaleDateString('tr-TR')}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {new Date(quote.createdAt).toLocaleTimeString('tr-TR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedQuote(quote)}
                                                    className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                                                >
                                                    Detaylar
                                                </button>
                                                <button
                                                    onClick={() => deleteQuote(quote.id)}
                                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {selectedQuote && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Teklif Detayları</h3>
                            <button
                                onClick={() => setSelectedQuote(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Firma</label>
                                    <p className="text-gray-900 font-medium mt-1">{selectedQuote.companyName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Yetkili</label>
                                    <p className="text-gray-900 font-medium mt-1">{selectedQuote.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefon</label>
                                    <p className="text-gray-900 font-medium mt-1">{selectedQuote.phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-posta</label>
                                    <p className="text-gray-900 font-medium mt-1">{selectedQuote.email}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Boyutlar</label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg font-mono text-primary-700">
                                    {selectedQuote.dimensions || '-'}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Açıklama</label>
                                <div className="mt-1 p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
                                    {selectedQuote.description || 'Açıklama bulunmuyor.'}
                                </div>
                            </div>

                            {selectedQuote.fileUrl && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ekli Dosya</label>
                                    <div className="mt-2">
                                        <a
                                            href={selectedQuote.fileUrl}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                                        >
                                            <Paperclip className="w-4 h-4" />
                                            Dosyayı İndir
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedQuote(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
