import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { readJSON } from '@/lib/db';
import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { FeaturesCards } from '@/components/sections/FeaturesCards';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProjectsSlider } from '@/components/sections/ProjectsSlider';
import { ReferencesSlider } from '@/components/sections/ReferencesSlider';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTASection } from '@/components/sections/CTASection';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.common.companyName} - ${translations.nav.home}`,
        description: translations.hero.subtitle,
    };
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    const [projects, partners] = await Promise.all([
        readJSON('projects.json').catch(() => []),
        readJSON('partners.json').catch(() => []),
    ]);

    return (
        <MainLayout locale={lang} translations={translations}>
            <Hero translations={translations} locale={lang} projectCount={projects.length} />
            <FeaturesCards translations={translations} projectCount={projects.length} />
            <ServicesPreview translations={translations} locale={lang} />
            <WhyChooseUs translations={translations} projectCount={projects.length} />
            <ProjectsSlider translations={translations} locale={lang} projectCount={projects.length} projects={projects} />
            <ReferencesSlider translations={translations} partners={partners} />
            <BlogPreview translations={translations} locale={lang} />
            <CTASection translations={translations} locale={lang} />
        </MainLayout>
    );
}
