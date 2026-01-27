'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Package, 
    FolderTree, 
    LogOut,
    Menu,
    X 
} from 'lucide-react';
import { useState } from 'react';

export interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/categories', label: 'Kategoriler', icon: FolderTree },
        { href: '/admin/products', label: 'Ürünler', icon: Package },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-primary-900 text-white z-40 transform transition-transform duration-300 ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-accent-600 text-white'
                                            : 'text-gray-300 hover:bg-primary-800 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-gray-600"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <div className="ml-auto flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary-900 flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Siteye Dön</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

