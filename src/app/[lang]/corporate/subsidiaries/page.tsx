import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { MapPin, Phone, Mail, Clock, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.nav.subsidiaries} - ${translations.common.companyName}`,
        description: lang === 'tr'
            ? 'Romanya genelindeki şubelerimiz ve iletişim bilgileri.'
            : lang === 'ro'
                ? 'Filialele noastre în toată România și informații de contact.'
                : 'Our subsidiaries throughout Romania and contact information.',
    };
}

const subsidiaries = [
    {
        id: '1',
        city: 'Voluntari',
        name: { ro: 'Showroom', en: 'Showroom', tr: 'Showroom' },
        address: 'Bulevardul Pipera nr 23, Voluntari 077191',
        phone: '0725 545 452',
        email: 'info@asansor.ro',
        hours: { ro: 'Luni - Vineri: 9:00 - 18:00', en: 'Monday - Friday: 9:00 AM - 6:00 PM', tr: 'Pazartesi - Cuma: 09:00 - 18:00' },
        isHeadquarters: true
    }
];

export default async function SubsidiariesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

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
                            {translations.nav.subsidiaries}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {lang === 'tr'
                                ? 'Bizi showroomumuzda ziyaret edin ve en yeni asansör çözümlerimizi keşfedin.'
                                : lang === 'ro'
                                    ? 'Vizitați-ne la showroom-ul nostru și descoperiți cele mai noi soluții de ascensoare.'
                                    : 'Visit us at our showroom and discover our latest elevator solutions.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="relative h-96 rounded-2xl overflow-hidden mb-12 shadow-md">
                        <iframe
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=Bulevardul+Pipera+nr+23,+Voluntari+077191&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            title="AsansorTech Showroom Map"
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Subsidiaries Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subsidiaries.map((subsidiary) => (
                            <article
                                key={subsidiary.id}
                                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border ${subsidiary.isHeadquarters ? 'border-accent-300 ring-2 ring-accent-100' : 'border-gray-100'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building2 className="w-5 h-5 text-accent-600" />
                                            <h3 className="text-xl font-bold text-primary-900">{subsidiary.city}</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm">{subsidiary.name[lang]}</p>
                                    </div>
                                    {subsidiary.isHeadquarters && (
                                        <span className="px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full">
                                            HQ
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{subsidiary.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <a href={`tel:${subsidiary.phone}`} className="text-gray-600 text-sm hover:text-accent-600 transition-colors">
                                            {subsidiary.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <a href={`mailto:${subsidiary.email}`} className="text-gray-600 text-sm hover:text-accent-600 transition-colors">
                                            {subsidiary.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{subsidiary.hours[lang]}</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(subsidiary.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm"
                                    >
                                        {lang === 'tr' ? 'Haritada Göster' : lang === 'ro' ? 'Vezi pe Hartă' : 'View on Map'}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage Section Removed - Only single showroom exists */}
            <div className="mb-24"></div>

            {/* CTA */}
            <section className="section bg-primary-900">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {lang === 'tr' ? 'Size En Yakın Şubeyle İletişime Geçin' : lang === 'ro' ? 'Contactați Cea Mai Apropiată Filială' : 'Contact Your Nearest Branch'}
                        </h2>
                        <p className="text-gray-300 mb-8">
                            {lang === 'tr'
                                ? 'Asansör ihtiyaçlarınız için 7/24 hizmetinizdeyiz.'
                                : lang === 'ro'
                                    ? 'Suntem la dispoziția dvs. 24/7 pentru nevoile de ascensoare.'
                                    : 'We are available 24/7 for your elevator needs.'}
                        </p>
                        <Link href={`/${lang}/contact`} className="btn btn-primary btn-lg">
                            {translations.common.contactUs}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
