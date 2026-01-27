import { Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
    return [
        { lang: 'ro' as const },
        { lang: 'en' as const },
        { lang: 'tr' as const },
    ];
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}) {
    await params;
    return children;
}

