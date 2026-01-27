import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
// import { partners, testimonials } from '@/data/references'; // Remove static import
import { Partner, Testimonial } from '@/data/references'; // Keep type import
import { readJSON } from '@/lib/db';
import { Quote, Star, Building, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.nav.references} - ${translations.common.companyName}`,
        description: translations.references.subtitle,
    };
}

export const dynamic = 'force-dynamic';

export default async function ReferencesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    // Fetch data dynamically
    let partners: Partner[] = [];
    let testimonials: Testimonial[] = [];

    try {
        const [partnersData, testimonialsData] = await Promise.all([
            readJSON<Partner>('partners.json'),
            readJSON<Testimonial>('testimonials.json')
        ]);
        partners = partnersData;
        testimonials = testimonialsData;
    } catch (error) {
        console.error('Failed to load references data:', error);
    }

    // Fetch project count for stats
    let totalProjects = 0;
    try {
        const projects = await readJSON('projects.json');
        totalProjects = projects.length;
    } catch {
        totalProjects = 0;
    }

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {translations.references.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {translations.references.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                            {lang === 'tr' ? 'İş Ortaklarımız' : lang === 'ro' ? 'Partenerii Noștri' : 'Our Partners'}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {lang === 'tr'
                                ? 'Romanya\'nın önde gelen inşaat ve gayrimenkul şirketleriyle çalışıyoruz.'
                                : lang === 'ro'
                                    ? 'Colaborăm cu cele mai importante companii de construcții și imobiliare din România.'
                                    : 'We collaborate with Romania\'s leading construction and real estate companies.'}
                        </p>
                    </div>

                    {/* Partners Grid */}
                    {partners.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {partners.map((partner) => (
                                <a
                                    key={partner.id}
                                    href={partner.website || '#'}
                                    target={partner.website ? '_blank' : undefined}
                                    rel={partner.website ? 'noopener noreferrer' : undefined}
                                    className="group relative bg-gray-50 rounded-xl p-6 flex items-center justify-center h-28 border border-gray-100 hover:border-accent-300 hover:bg-accent-50 transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        {/* Fallback to text if no logo, or wrap img */}
                                        {partner.logo ? (
                                            <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <Building className="w-8 h-8 text-gray-400 group-hover:text-accent-600 transition-colors" />
                                        )}

                                        {/* If no logo, show name. If logo, maybe hide name or show in tooltip? 
                                            Let's keep name below for now as in original design 
                                        */}
                                        {!partner.logo && (
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-accent-700 text-center">
                                                {partner.name}
                                            </span>
                                        )}
                                    </div>
                                    {partner.website && (
                                        <ExternalLink className="absolute top-2 right-2 w-3 h-3 text-gray-300 group-hover:text-accent-500 transition-colors" />
                                    )}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-500">
                                {lang === 'tr' ? 'Henüz iş ortağı eklenmemiş.' : lang === 'ro' ? 'Nu au fost adăugați parteneri încă.' : 'No partners added yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                            {lang === 'tr' ? 'Müşterilerimiz Ne Diyor?' : lang === 'ro' ? 'Ce Spun Clienții Noștri?' : 'What Our Clients Say?'}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {lang === 'tr'
                                ? 'Müşterilerimizin memnuniyeti bizim için her şeyden önemli.'
                                : lang === 'ro'
                                    ? 'Satisfacția clienților noștri este cea mai importantă pentru noi.'
                                    : 'Our clients\' satisfaction is the most important thing to us.'}
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    {testimonials.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial) => (
                                <article
                                    key={testimonial.id}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                                >
                                    {/* Quote Icon */}
                                    <Quote className="w-10 h-10 text-accent-400 mb-4" />

                                    {/* Content */}
                                    <p className="text-gray-600 leading-relaxed mb-6 italic">
                                        &ldquo;{testimonial.content[lang]}&rdquo;
                                    </p>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
                                        ))}
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0">
                                            {testimonial.avatar ? (
                                                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span>{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-primary-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {testimonial.position[lang]} • {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                            <p className="text-gray-500">
                                {lang === 'tr' ? 'Henüz müşteri yorumu eklenmemiş.' : lang === 'ro' ? 'Nu au fost adăugate testimoniale încă.' : 'No testimonials added yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="section bg-primary-900">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: totalProjects + '+', label: lang === 'tr' ? 'Tamamlanan Proje' : lang === 'ro' ? 'Proiecte Finalizate' : 'Completed Projects' },
                            { value: '98%', label: lang === 'tr' ? 'Müşteri Memnuniyeti' : lang === 'ro' ? 'Satisfacția Clienților' : 'Client Satisfaction' },
                            { value: '15+', label: lang === 'tr' ? 'Yıllık Deneyim' : lang === 'ro' ? 'Ani de Experiență' : 'Years of Experience' },
                            { value: partners.length + '+', label: lang === 'tr' ? 'İş Ortağı' : lang === 'ro' ? 'Parteneri' : 'Partners' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

// Helper to fetch approximate project count if possible for Trust Indicators, 
// otherwise hardcode or fetch separately.
// For now, let's also fetch projects count briefly or just hardcode/use a rough number if we don't want to import Project type here.
// Best approach: Fetch projects length too.

async function getProjectCount() {
    try {
        const projects = await readJSON('projects.json');
        return projects.length;
    } catch {
        return 0;
    }
}
