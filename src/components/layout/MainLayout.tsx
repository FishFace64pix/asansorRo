import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';
import { Locale } from '@/lib/i18n/config';

export interface MainLayoutProps {
    children: React.ReactNode;
    locale: Locale;
    translations: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, locale, translations }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header locale={locale} translations={translations} />
            <main className="flex-grow pt-32 md:pt-36">
                {children}
            </main>
            <Footer locale={locale} translations={translations} />
            <CookieConsent locale={locale} translations={translations} />
        </div>
    );
};
