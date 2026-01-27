'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, FolderKanban, FileText, Menu, Home, X, Users, Inbox, LogOut } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/quotes', label: 'Teklifler', icon: Inbox },
    { href: '/admin/products', label: 'Ürünler', icon: Package },
    { href: '/admin/projects', label: 'Projeler', icon: FolderKanban },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/references', label: 'Referanslar', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    // Plain layout for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 bg-primary-900 text-white flex-shrink-0 flex flex-col
                transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-primary-800 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="font-bold text-xl">Admin</span>
                    </Link>
                    <button
                        className="md:hidden p-2 hover:bg-primary-800 rounded-lg"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-accent-600 text-white'
                                            : 'hover:bg-primary-800'
                                            }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-primary-800 space-y-2">
                    <Link
                        href="/ro"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors text-gray-400"
                    >
                        <Home className="w-5 h-5" />
                        Siteye Dön
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-sm">Admin</span>
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
