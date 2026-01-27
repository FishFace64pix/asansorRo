import { Locale, defaultLocale } from './config';

type TranslationKeys = {
    [key: string]: string | TranslationKeys;
};

const translationCache: Partial<Record<Locale, any>> = {};

export async function getTranslations(locale: Locale): Promise<any> {
    if (translationCache[locale]) {
        return translationCache[locale]!;
    }

    try {
        const translations = await import(`@/data/translations/${locale}.json`);
        translationCache[locale] = translations.default;
        return translations.default;
    } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        // Fallback to default locale
        if (locale !== defaultLocale) {
            return getTranslations(defaultLocale);
        }
        return {};
    }
}

export function getNestedTranslation(
    translations: TranslationKeys,
    key: string
): string {
    const keys = key.split('.');
    let result: any = translations;

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key;
        }
    }

    return typeof result === 'string' ? result : key;
}

// Helper function to get a translation by key
export function t(translations: TranslationKeys, key: string): string {
    return getNestedTranslation(translations, key);
}
