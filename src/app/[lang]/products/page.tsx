import React from 'react';
import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductsPageClient } from '@/components/products/ProductsPageClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.products.title} | ${translations.common.companyName}`,
        description: translations.products.subtitle,
    };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return (
        <MainLayout locale={lang} translations={translations}>
            <ProductsPageClient locale={lang} translations={translations} />
        </MainLayout>
    );
}
