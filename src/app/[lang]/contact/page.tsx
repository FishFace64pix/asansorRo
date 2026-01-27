import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.contact.title} | ${translations.common.companyName}`,
        description: translations.contact.subtitle,
    };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero */}
            <PageHero
                title={translations.contact.title}
                subtitle={translations.contact.subtitle}
                backgroundImage="/images/elevator-bg.jpg"
            />

            {/* Contact Form & Info */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left: Contact Form */}
                        <div>
                            <ContactForm translations={translations} />
                        </div>

                        {/* Right: Contact Info */}
                        <div>
                            <h3 className="mb-8">{translations.footer.contactInfo}</h3>
                            <ContactInfo translations={translations} />

                            {/* Map Placeholder */}
                            <div className="mt-8 card overflow-hidden" style={{ height: '300px' }}>
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🗺️</div>
                                        <p>Google Maps Integration</p>
                                        <p className="text-sm">(To be added)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
