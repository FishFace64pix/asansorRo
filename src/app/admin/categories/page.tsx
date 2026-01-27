'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Category {
    id: string;
    name: {
        tr: string;
        en: string;
        ro: string;
    };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: { tr: '', en: '', ro: '' },
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = '/api/categories';
            const method = editingCategory ? 'PUT' : 'POST';
            const body = editingCategory
                ? { id: editingCategory.id, name: formData.name }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setIsModalOpen(false);
                setFormData({ name: { tr: '', en: '', ro: '' } });
                setEditingCategory(null);
                fetchCategories();
            }
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/categories?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name });
        setIsModalOpen(true);
    };

    const openModal = () => {
        setEditingCategory(null);
        setFormData({ name: { tr: '', en: '', ro: '' } });
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p>Yükleniyor...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary-900">Kategori Yönetimi</h1>
                    <Button onClick={openModal} className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Yeni Kategori
                    </Button>
                </div>

                {/* Categories List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Türkçe</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İngilizce</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Romence</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.name.tr}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.name.en}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.name.ro}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="text-accent-600 hover:text-accent-800"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-primary-900">
                                        {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        label="Türkçe Ad"
                                        value={formData.name.tr}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: { ...formData.name, tr: e.target.value },
                                            })
                                        }
                                        required
                                    />
                                    <Input
                                        label="İngilizce Ad"
                                        value={formData.name.en}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: { ...formData.name, en: e.target.value },
                                            })
                                        }
                                        required
                                    />
                                    <Input
                                        label="Romence Ad"
                                        value={formData.name.ro}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: { ...formData.name, ro: e.target.value },
                                            })
                                        }
                                        required
                                    />

                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            İptal
                                        </Button>
                                        <Button type="submit" variant="primary">
                                            {editingCategory ? 'Güncelle' : 'Oluştur'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

