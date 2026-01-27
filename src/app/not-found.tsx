'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-lg">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <span className="text-[180px] md:text-[220px] font-bold text-white/5 leading-none select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
                            404
                        </span>
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Pagina nu a fost găsită
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Ne pare rău, dar pagina pe care o căutați nu există sau a fost mutată.
                    Vă rugăm să verificați adresa URL sau să reveniți la pagina principală.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/ro"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-600/20"
                    >
                        <Home className="w-5 h-5" />
                        Pagina Principală
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-800/50 hover:bg-primary-800 text-white border border-primary-700/50 hover:border-primary-600 rounded-lg font-semibold backdrop-blur-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Înapoi
                    </button>
                </div>

                {/* Links */}
                <div className="mt-12 pt-8 border-t border-primary-800/50">
                    <p className="text-gray-500 text-sm mb-4">Pagini utile:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/ro/products" className="text-gray-400 hover:text-accent-400 transition-colors">
                            Produse
                        </Link>
                        <Link href="/ro/services" className="text-gray-400 hover:text-accent-400 transition-colors">
                            Servicii
                        </Link>
                        <Link href="/ro/projects" className="text-gray-400 hover:text-accent-400 transition-colors">
                            Proiecte
                        </Link>
                        <Link href="/ro/contact" className="text-gray-400 hover:text-accent-400 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
