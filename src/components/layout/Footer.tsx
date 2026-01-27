'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';

export interface FooterProps {
    locale: Locale;
    translations: any;
}

export const Footer: React.FC<FooterProps> = ({ locale, translations }) => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: translations.nav.home, href: `/${locale}` },
        { label: translations.nav.about, href: `/${locale}/corporate/about` },
        { label: translations.nav.products, href: `/${locale}/products` },
        { label: translations.nav.projects, href: `/${locale}/projects` },
        { label: translations.nav.blog, href: `/${locale}/blog` },
    ];

    const services = [
        { label: translations.nav.installation, href: `/${locale}/services/installation` },
        { label: translations.nav.maintenance, href: `/${locale}/services/maintenance` },
        { label: translations.nav.modernization, href: `/${locale}/services/modernization` },
    ];

    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <div className="mb-6 relative h-16 w-48">
                            <img
                                src="/images/logo.png"
                                alt={translations.common.companyName}
                                className="h-full w-auto object-contain bg-white/10 rounded-lg p-2"
                            />
                        </div>
                        <p className="text-gray-300 mb-6">
                            {translations.footer.company.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-all hover-lift"
                                aria-label="Facebook"
                            >
                                F
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-all hover-lift"
                                aria-label="Instagram"
                            >
                                I
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-all hover-lift"
                                aria-label="LinkedIn"
                            >
                                L
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-white">
                            {translations.footer.quickLinks}
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-white">
                            {translations.footer.services}
                        </h4>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.href}>
                                    <Link
                                        href={service.href}
                                        className="text-gray-300 hover:text-accent transition-colors"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-white">
                            {translations.footer.contactInfo}
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>
                                    Bulevardul Pipera nr 23,<br />
                                    Voluntari 077191
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:0725545452" className="hover:text-accent transition-colors">
                                    0725 545 452
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <a href="mailto:info@asansor.ro" className="hover:text-accent transition-colors">
                                    info@asansor.ro
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>🕐</span>
                                <span>{translations.contact.info.hoursValue}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>
                            {translations.footer.copyright.replace('2024', currentYear.toString())}
                        </p>
                        <div className="flex gap-6">
                            <Link href={`/${locale}/privacy`} className="hover:text-accent transition-colors">
                                {translations.footer.privacy}
                            </Link>
                            <Link href={`/${locale}/terms`} className="hover:text-accent transition-colors">
                                {translations.footer.terms}
                            </Link>
                            <Link href={`/${locale}/gdpr`} className="hover:text-accent transition-colors">
                                {translations.footer.gdpr}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
