import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHero } from '@/components/shared/PageHero';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { FAQ } from '@/components/services/FAQ';
import { CTASection } from '@/components/sections/CTASection';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.services.maintenance.title} | ${translations.common.companyName}`,
        description: translations.services.maintenance.description,
    };
}

export default async function MaintenancePage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);
    const service = translations.services.maintenance;

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero */}
            <PageHero
                title={service.hero.title}
                subtitle={service.hero.subtitle}
                backgroundImage="/images/maintenance.jpg"
            />

            {/* Overview */}
            <section className="section">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary-900">
                            {service.overview.title}
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {service.overview.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <ProcessSteps
                title={service.process.title}
                steps={service.process.steps}
            />

            {/* Features */}
            <ServiceFeatures
                title={service.features.title}
                features={service.features.items}
            />

            {/* FAQ */}
            <FAQ
                title={service.faq.title}
                items={service.faq.items}
            />

            {/* CTA */}
            <CTASection translations={translations} locale={lang} />
        </MainLayout>
    );
}

