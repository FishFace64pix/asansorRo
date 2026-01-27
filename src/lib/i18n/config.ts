export const defaultLocale = 'ro' as const;
export const locales = ['ro', 'en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    ro: 'Română',
    en: 'English',
    tr: 'Türkçe',
};

export const localeFlags: Record<Locale, string> = {
    ro: '🇷🇴',
    en: '🇬🇧',
    tr: '🇹🇷',
};
