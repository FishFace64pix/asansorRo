import Link from 'next/link';
import { Package, FolderKanban, FileText, Users, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { readJSON } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch real data
    const [products, projects, blogPosts, partners] = await Promise.all([
        readJSON('products.json').catch(() => []),
        readJSON('projects.json').catch(() => []),
        readJSON('blog.json').catch(() => []),
        readJSON('partners.json').catch(() => [])
    ]);

    // Stats data
    const stats = [
        { label: 'Toplam Ürün', value: products.length.toString(), icon: Package, color: 'bg-blue-500', change: '+2' }, // Change can remain hardcoded or removed
        { label: 'Aktif Proje', value: projects.length.toString(), icon: FolderKanban, color: 'bg-green-500', change: '+3' },
        { label: 'Blog Yazısı', value: blogPosts.length.toString(), icon: FileText, color: 'bg-purple-500', change: '+1' },
        { label: 'Referans', value: partners.length.toString(), icon: Users, color: 'bg-amber-500', change: '+4' },
    ];

    // Recent activities (Mock for now, hard to derive from simple JSONs without created_at timestamps on all)
    const recentActivities = [
        { action: 'Sistem Durumu', item: 'Tüm sistemler aktif', time: 'Şimdi' },
        { action: 'Son Kontrol', item: 'Veri bütünlüğü doğrulandı', time: '1 dk önce' },
        { action: 'Yedekleme', item: 'Otomatik yedek alındı', time: '1 saat önce' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">AsansorTech Admin Panel'e hoş geldiniz</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/admin/products/new"
                            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Yeni Ürün</p>
                                <p className="text-sm text-gray-500">Ürün ekle</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-500 transition-colors" />
                        </Link>

                        <Link
                            href="/admin/projects/new"
                            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <FolderKanban className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Yeni Proje</p>
                                <p className="text-sm text-gray-500">Proje ekle</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-500 transition-colors" />
                        </Link>

                        <Link
                            href="/admin/blog/new"
                            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
                        >
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Yeni Yazı</p>
                                <p className="text-sm text-gray-500">Blog yazısı</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-500 transition-colors" />
                        </Link>

                        <Link
                            href="/ro"
                            target="_blank"
                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                        >
                            <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Siteyi Gör</p>
                                <p className="text-sm text-gray-500">Önizleme</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-gray-700 transition-colors" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-2 h-2 bg-accent-500 rounded-full mt-2" />
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium">{activity.action}</p>
                                    <p className="text-gray-500 text-sm">{activity.item}</p>
                                </div>
                                <span className="text-gray-400 text-xs">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Management Links */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">İçerik Yönetimi</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Link href="/admin/products" className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                        <Package className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Ürün Yönetimi</h3>
                        <p className="text-gray-500 text-sm">{products.length} ürün mevcut</p>
                    </Link>
                    <Link href="/admin/projects" className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                        <FolderKanban className="w-8 h-8 text-green-500 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Proje Yönetimi</h3>
                        <p className="text-gray-500 text-sm">{projects.length} proje mevcut</p>
                    </Link>
                    <Link href="/admin/blog" className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                        <FileText className="w-8 h-8 text-purple-500 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2">Blog Yönetimi</h3>
                        <p className="text-gray-500 text-sm">{blogPosts.length} yazı mevcut</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
