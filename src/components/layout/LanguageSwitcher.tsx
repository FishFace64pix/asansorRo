'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, localeNames, localeFlags } from '@/lib/i18n/config';

export interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
    const pathname = usePathname();

    const switchLocale = (locale: Locale) => {
        // Remove current locale from pathname and add new locale
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === 'ro' || segments[0] === 'en' || segments[0] === 'tr') {
            segments[0] = locale;
        } else {
            segments.unshift(locale);
        }
        return `/${segments.join('/')}`;
    };

    return (
        <div className="flex items-center gap-2">
            {Object.entries(localeNames).map(([code, name]) => {
                const locale = code as Locale;
                const isActive = locale === currentLocale;

                return (
                    <Link
                        key={code}
                        href={switchLocale(locale)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${isActive
                                ? 'bg-white/20 font-semibold'
                                : 'hover:bg-white/10'
                            }`}
                        title={name}
                    >
                        <span>{localeFlags[locale]}</span>
                        <span className="text-sm uppercase">{code}</span>
                    </Link>
                );
            })}
        </div>
    );
};
