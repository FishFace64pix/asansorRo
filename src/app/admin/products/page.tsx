'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react';
import { Product } from '@/data/products';

export default function ProductsManagement() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
                    <p className="text-gray-500 mt-1">Tüm ürünleri görüntüle ve yönet</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Ürün
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ürün</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kategori</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kapasite</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Hız</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Package className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name.tr}</p>
                                                <p className="text-sm text-gray-500">{product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{product.capacity} kg</td>
                                    <td className="px-6 py-4 text-gray-600">{product.speed} m/s</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-600" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Ürün bulunamadı
                    </div>
                )}
            </div>
        </div>
    );
}
