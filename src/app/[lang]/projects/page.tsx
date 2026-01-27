import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
// import { projects } from '@/data/projects'; // Remove static import
import { Project } from '@/data/projects'; // Keep type import
import { readJSON } from '@/lib/db';
import { Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.nav.projects} - ${translations.common.companyName}`,
        description: translations.projects.subtitle,
    };
}

export const dynamic = 'force-dynamic';

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    residential: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    commercial: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    industrial: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    hospital: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

const categoryLabels: Record<string, Record<string, string>> = {
    residential: { ro: 'Rezidențial', en: 'Residential', tr: 'Konut' },
    commercial: { ro: 'Comercial', en: 'Commercial', tr: 'Ticari' },
    industrial: { ro: 'Industrial', en: 'Industrial', tr: 'Endüstriyel' },
    hospital: { ro: 'Spital', en: 'Hospital', tr: 'Hastane' },
};

export default async function ProjectsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    // Fetch projects dynamically
    let projects: Project[] = [];
    try {
        projects = await readJSON<Project>('projects.json');
    } catch (error) {
        console.error('Failed to load projects:', error);
        projects = [];
    }

    // Calculate dynamic stats
    const totalProjects = projects.length;
    const residentialCount = projects.filter(p => p.category === 'residential').length;
    const commercialCount = projects.filter(p => p.category === 'commercial').length;
    const industrialHospitalCount = projects.filter(p => p.category === 'industrial' || p.category === 'hospital').length;

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {translations.projects.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {translations.projects.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-gray-50">
                <div className="container">
                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { label: lang === 'tr' ? 'Toplam Proje' : lang === 'ro' ? 'Total Proiecte' : 'Total Projects', value: totalProjects + '+' },
                            { label: lang === 'tr' ? 'Konut' : lang === 'ro' ? 'Rezidențial' : 'Residential', value: residentialCount + '+' },
                            { label: lang === 'tr' ? 'Ticari' : lang === 'ro' ? 'Comercial' : 'Commercial', value: commercialCount + '+' },
                            { label: lang === 'tr' ? 'Endüstriyel & Hastane' : lang === 'ro' ? 'Industrial & Spital' : 'Industrial & Hospital', value: industrialHospitalCount + '+' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                                <div className="text-3xl font-bold text-primary-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    {projects.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => {
                                const colors = categoryColors[project.category] || categoryColors.residential;
                                return (
                                    <article
                                        key={project.id}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title[lang]}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Building2 className="w-16 h-16 text-primary-300" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Category Badge */}
                                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                                                {categoryLabels[project.category]?.[lang] || project.category}
                                            </div>

                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500 text-white">
                                                    ⭐ Featured
                                                </div>
                                            )}

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-bold text-white line-clamp-2">
                                                    {project.title[lang]}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {project.description[lang]}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{project.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{project.year}</span>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                                <div className="text-center flex-1">
                                                    <div className="text-lg font-bold text-primary-900">{project.elevatorCount}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {lang === 'tr' ? 'Asansör' : lang === 'ro' ? 'Ascensoare' : 'Elevators'}
                                                    </div>
                                                </div>
                                                <div className="text-center flex-1">
                                                    <div className="text-lg font-bold text-primary-900">{project.floors}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {lang === 'tr' ? 'Kat' : lang === 'ro' ? 'Etaje' : 'Floors'}
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex items-center justify-end">
                                                    <Link
                                                        href={`/${lang}/projects/${project.slug}`}
                                                        className="inline-flex items-center gap-1 text-accent-600 hover:text-accent-700 font-medium text-sm group/link"
                                                    >
                                                        {translations.common.viewDetails}
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-xl text-gray-500 mb-2">
                                {lang === 'tr' ? 'Henüz proje eklenmemiş.' : lang === 'ro' ? 'Nu au fost adăugate proiecte încă.' : 'No projects added yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-primary-900">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {lang === 'tr' ? 'Projeniz için Teklif Alın' : lang === 'ro' ? 'Obțineți o Ofertă pentru Proiectul Dumneavoastră' : 'Get a Quote for Your Project'}
                        </h2>
                        <p className="text-gray-300 mb-8">
                            {lang === 'tr' ? 'Deneyimli ekibimizle projenizi hayata geçirin.' : lang === 'ro' ? 'Realizați proiectul dvs. cu echipa noastră experimentată.' : 'Bring your project to life with our experienced team.'}
                        </p>
                        <Link
                            href={`/${lang}/contact`}
                            className="btn btn-primary btn-lg"
                        >
                            {translations.common.contactUs}
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
