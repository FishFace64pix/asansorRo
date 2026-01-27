import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { readJSON } from '@/lib/db';
import { Project } from '@/data/projects';
import { Building2, MapPin, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const projects = await readJSON<Project>('projects.json');
    const project = projects.find(p => p.slug === slug);
    const translations = await getTranslations(lang);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title[lang]} | ${translations.common.companyName}`,
        description: project.description[lang],
    };
}

const categoryLabels: Record<string, Record<string, string>> = {
    residential: { ro: 'Rezidențial', en: 'Residential', tr: 'Konut' },
    commercial: { ro: 'Comercial', en: 'Commercial', tr: 'Ticari' },
    industrial: { ro: 'Industrial', en: 'Industrial', tr: 'Endüstriyel' },
    hospital: { ro: 'Spital', en: 'Hospital', tr: 'Hastane' },
};

export default async function ProjectDetailPage({ params }: Props) {
    const { lang, slug } = await params;
    const translations = await getTranslations(lang);

    const projects = await readJSON<Project>('projects.json');
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end pb-24 overflow-hidden">
                {/* Background Image/Fallback */}
                <div className="absolute inset-0 z-0">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title[lang]}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                            <Building2 className="w-32 h-32 text-gray-700" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>

                <div className="container relative z-10">
                    <Link
                        href={`/${lang}/projects`}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {lang === 'tr' ? 'Tüm Projeler' : lang === 'ro' ? 'Toate Proiectele' : 'All Projects'}
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/90 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                            {categoryLabels[project.category]?.[lang] || project.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {project.title[lang]}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent-400" />
                                <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-accent-400" />
                                <span>{project.year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-accent-400" />
                                <span>{project.client}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    {lang === 'tr' ? 'Proje Hakkında' : lang === 'ro' ? 'Despre Proiect' : 'About Project'}
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {project.description[lang]}
                                </p>
                            </div>

                            {project.gallery && project.gallery.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        {lang === 'tr' ? 'Galeri' : lang === 'ro' ? 'Galerie' : 'Gallery'}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {project.gallery.map((img, index) => (
                                            <div key={index} className="rounded-xl overflow-hidden h-64 shadow-sm">
                                                <img
                                                    src={img}
                                                    alt={`${project.title[lang]} - ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Project Stats */}
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">
                                    {lang === 'tr' ? 'Proje Detayları' : lang === 'ro' ? 'Detalii Proiect' : 'Project Details'}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                        <span className="text-gray-500">{lang === 'tr' ? 'Asansör Sayısı' : lang === 'ro' ? 'Număr Ascensoare' : 'Elevator Count'}</span>
                                        <span className="font-semibold text-gray-900">{project.elevatorCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                        <span className="text-gray-500">{lang === 'tr' ? 'Kat Sayısı' : lang === 'ro' ? 'Număr Etaje' : 'Floor Count'}</span>
                                        <span className="font-semibold text-gray-900">{project.floors}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                        <span className="text-gray-500">{lang === 'tr' ? 'Durum' : lang === 'ro' ? 'Status' : 'Status'}</span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircle2 className="w-3 h-3" />
                                            {project.status === 'completed'
                                                ? (lang === 'tr' ? 'Tamamlandı' : lang === 'ro' ? 'Finalizat' : 'Completed')
                                                : project.status === 'in-progress'
                                                    ? (lang === 'tr' ? 'Devam Ediyor' : lang === 'ro' ? 'În Desfășurare' : 'In Progress')
                                                    : (lang === 'tr' ? 'Planlanan' : lang === 'ro' ? 'Planificat' : 'Planned')
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-primary-900 rounded-2xl p-8 text-center text-white">
                                <h3 className="text-xl font-bold mb-4">
                                    {lang === 'tr' ? 'Benzer Bir Projeniz mi Var?' : lang === 'ro' ? 'Aveți un Proiect Similar?' : 'Have a Similar Project?'}
                                </h3>
                                <p className="text-primary-200 mb-6 text-sm">
                                    {lang === 'tr' ? 'Uzman ekibimizle iletişime geçin ve projeniz için en iyi çözümü sunalım.' : lang === 'ro' ? 'Contactați echipa noastră de experți și vă vom oferi cea mai bună soluție.' : 'Contact our expert team and let us provide the best solution for your project.'}
                                </p>
                                <Link
                                    href={`/${lang}/contact`}
                                    className="btn bg-white text-primary-900 hover:bg-gray-100 w-full"
                                >
                                    {translations.common.getQuote}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
