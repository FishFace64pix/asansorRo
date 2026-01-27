'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Locale } from '@/lib/i18n/config';

export interface HeaderProps {
    locale: Locale;
    translations: any;
}

export const Header: React.FC<HeaderProps> = ({ locale, translations }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            label: translations.nav.corporate,
            href: `/${locale}/corporate`,
            submenu: [
                { label: translations.nav.about, href: `/${locale}/corporate/about` },
                { label: translations.nav.subsidiaries, href: `/${locale}/corporate/subsidiaries` },
            ],
        },
        {
            label: translations.nav.services,
            href: `/${locale}/services`,
            submenu: [
                { label: translations.nav.installation, href: `/${locale}/services/installation` },
                { label: translations.nav.maintenance, href: `/${locale}/services/maintenance` },
                { label: translations.nav.modernization, href: `/${locale}/services/modernization` },
            ],
        },
        { label: translations.nav.products, href: `/${locale}/products` },
        { label: translations.nav.projects, href: `/${locale}/projects` },
        { label: translations.nav.references, href: `/${locale}/references` },
        { label: translations.nav.blog, href: `/${locale}/blog` },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
        >
            {/* Top Bar */}
            <div className={`transition-all ${isScrolled ? 'bg-primary text-white py-2' : 'bg-primary text-white py-3'}`}>
                <div className="container">
                    <div className="flex justify-between items-center text-sm">
                        {/* Contact Info */}
                        <div className="hidden md:flex items-center gap-6">
                            <a href="tel:0725545452" className="flex items-center gap-2 hover:text-accent transition-colors">
                                <span>📞</span>
                                <span>0725 545 452</span>
                            </a>
                            <a href="mailto:info@asansor.ro" className="flex items-center gap-2 hover:text-accent transition-colors">
                                <span>✉️</span>
                                <span>info@asansor.ro</span>
                            </a>
                        </div>

                        {/* Language Switcher & Social */}
                        <div className="flex items-center gap-4 ml-auto">
                            <div className="hidden sm:flex items-center gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                    Facebook
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                    Instagram
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                            <LanguageSwitcher currentLocale={locale} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className={`transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
                <div className="container">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href={`/${locale}`} className="flex items-center gap-2">
                            <div className={`font-bold transition-all ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                                {isScrolled ? (
                                    <span className="gradient-text">{translations.common.companyName}</span>
                                ) : (
                                    <span className="text-white">{translations.common.companyName}</span>
                                )}
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.href} className="relative group">
                                    <Link
                                        href={link.href}
                                        className={`font-medium transition-all ${isScrolled
                                            ? 'text-gray-700 hover:text-secondary'
                                            : 'text-white hover:text-accent'
                                            } ${isActive(link.href) ? 'border-b-2 border-accent' : ''}`}
                                    >
                                        {link.label}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.submenu && (
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <div className="py-2">
                                                {link.submenu.map((sublink) => (
                                                    <Link
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-secondary transition-colors"
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Contact CTA */}
                            <Link
                                href={`/${locale}/contact`}
                                className="btn btn-primary btn-sm"
                            >
                                {translations.nav.contact}
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className={`lg:hidden text-2xl transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t shadow-lg animate-fade-in-down">
                    <div className="container py-4">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <div key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block font-medium text-gray-700 hover:text-secondary py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.submenu && (
                                        <div className="pl-4 flex flex-col gap-2 mt-2">
                                            {link.submenu.map((sublink) => (
                                                <Link
                                                    key={sublink.href}
                                                    href={sublink.href}
                                                    className="text-sm text-gray-600 hover:text-secondary py-1"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {sublink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href={`/${locale}/contact`}
                                className="btn btn-primary mt-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {translations.nav.contact}
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};
