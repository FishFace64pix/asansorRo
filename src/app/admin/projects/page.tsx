'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, FolderKanban } from 'lucide-react';
import { Project } from '@/data/projects';

export default function ProjectsManagement() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete project', error);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusColors: Record<string, string> = {
        completed: 'bg-green-100 text-green-700',
        'in-progress': 'bg-yellow-100 text-yellow-700',
        planned: 'bg-blue-100 text-blue-700',
    };

    const statusLabels: Record<string, string> = {
        completed: 'Tamamlandı',
        'in-progress': 'Devam Ediyor',
        planned: 'Planlı',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Proje Yönetimi</h1>
                    <p className="text-gray-500 mt-1">Tüm projeleri görüntüle ve yönet</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Proje
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Proje ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                            {/* Image */}
                            <div
                                className="h-40 bg-gray-200 relative"
                                style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
                                    {statusLabels[project.status]}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1">{project.title.tr}</h3>
                                <p className="text-sm text-gray-500 mb-3">{project.location}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">{project.elevatorCount} asansör</span>
                                    <span className="text-gray-500">{project.year}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex border-t border-gray-100">
                                <Link
                                    href={`/admin/projects/${project.id}/edit`}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Düzenle
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Sil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredProjects.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                    Proje bulunamadı
                </div>
            )}
        </div>
    );
}
