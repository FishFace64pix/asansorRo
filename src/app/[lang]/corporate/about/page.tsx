import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { readJSON } from '@/lib/db';
import { MainLayout } from '@/components/layout/MainLayout';

import { CoreValues } from '@/components/corporate/CoreValues';
import { MissionVision } from '@/components/corporate/MissionVision';

import { Users, Target, Award, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.nav.about} - ${translations.common.companyName}`,
        description: lang === 'tr'
            ? 'Romanya\'nın önde gelen asansör çözümleri ortağı hakkında bilgi edinin.'
            : lang === 'ro'
                ? 'Aflați despre partenerul de încredere pentru soluții de ascensoare din România.'
                : 'Learn about Romania\'s trusted elevator solutions partner.',
    };
}



export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);
    const projects = await readJSON('projects.json').catch(() => []);

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
                            {translations.nav.about}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {lang === 'tr'
                                ? '15 yılı aşkın deneyimimizle Romanya\'nın önde gelen asansör çözümleri ortağıyız.'
                                : lang === 'ro'
                                    ? 'Cu peste 15 ani de experiență, suntem partenerul de încredere pentru soluții de ascensoare în România.'
                                    : 'With over 15 years of experience, we are Romania\'s trusted elevator solutions partner.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                                {lang === 'tr' ? 'Hikayemiz' : lang === 'ro' ? 'Povestea Noastră' : 'Our Story'}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    {lang === 'tr'
                                        ? 'Kabinlerde geçirilen zamanı keyifli bir deneyime, bulunulan ortamı da sağlam bir yapıya dönüştürmek amacıyla yola çıktık. Kullanıcının karşılaştığı zorlukları bizzat deneyimlemek ve çözüm geliştirmek elbette ilk adımlarımız arasında yer almalıydı.'
                                        : lang === 'ro'
                                            ? 'Am pornit la drum cu scopul de a transforma timpul petrecut în cabine într-o experiență plăcută și mediul înconjurător într-o structură solidă. Experimentarea directă a dificultăților întâmpinate de utilizatori și dezvoltarea de soluții au fost, desigur, printre primii noștri pași.'
                                            : 'We set out with the aim of transforming the time spent in cabins into a pleasant experience and the surrounding environment into a solid structure. Experiencing the difficulties faced by users firsthand and developing solutions were naturally among our first steps.'}
                                </p>
                                <p>
                                    {lang === 'tr'
                                        ? 'Geniş kitleleri aynı anda etkileme gücüne sahip bir sektörde faaliyet gösteriyoruz. İlkelerimiz, üslubumuz, çalışma tarzımız ve sunduğumuz çözüm alternatifleriyle müşterilerimize en kaliteli hizmeti sunmayı amaç edindik. Her yeni teknolojiyi özenle araştırıp, güvenli, işlevsel ve uygulanabilir hale getirmeyi hedefleyen bir yaklaşımla, kararlılıkla ilerliyoruz.'
                                        : lang === 'ro'
                                            ? 'Activăm într-un sector care are puterea de a influența simultan mase largi de oameni. Ne-am propus să oferim clienților noștri servicii de cea mai înaltă calitate prin principiile, stilul, modul nostru de lucru și alternativele de soluții pe care le oferim. Înaintăm cu hotărâre, cu o abordare care vizează utilizarea celor mai noi tehnologii.'
                                            : 'We operate in a sector that has the power to influence large masses simultaneously. We aim to provide the highest quality service to our customers with our principles, style, working method, and the solution alternatives we offer. We proceed with determination, utilizing the latest technologies.'}
                                </p>
                                <p>
                                    {lang === 'tr'
                                        ? 'Memnuniyeti odak noktası olarak belirleyen hızlı ve çözüm üreten bir anlayışla çalışıyoruz. Şık ve zarif tasarımlarımızla, sorunsuz ve güvenli bir kullanım rahatlığına ulaşmamızdaki en önemli etken, bu vizyonumuzdur. En ufak detaylarda bile bütünü görme zevkini yaşatabileceğimize inanıyoruz. Yıllardır bize gösterdiğiniz ilgi ve güvenden büyük bir motivasyon alıyoruz.'
                                        : lang === 'ro'
                                            ? 'Lucrăm cu o mentalitate rapidă și orientată spre soluții, care pune satisfacția în centrul atenției. Aceasta este viziunea noastră, factorul cel mai important în atingerea unei utilizări confortabile, fără probleme și sigure. Credem că putem oferi plăcerea de a vedea întregul chiar și în cele mai mici detalii.'
                                            : 'We work with a mindset that is fast and solution-oriented, placing satisfaction at the focal point. This vision is the most important factor in achieving a smooth and safe ease of use. We believe that we can provide the pleasure of seeing the whole even in the smallest details.'}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                {[
                                    { value: `${projects.length}+`, label: lang === 'tr' ? 'Tamamlanan Proje' : lang === 'ro' ? 'Proiecte Finalizate' : 'Completed Projects' },
                                    { value: '24/7', label: lang === 'tr' ? 'Teknik Destek' : lang === 'ro' ? 'Suport Tehnic' : 'Technical Support' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-gray-50 rounded-xl p-6">
                                        <div className="text-3xl font-bold text-accent-600 mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Placeholder */}
                        <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Building2 className="w-32 h-32 text-primary-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <MissionVision translations={translations} />



            {/* Core Values */}
            <CoreValues translations={translations} />





            {/* CTA */}
            <section className="section bg-primary-900">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {lang === 'tr' ? 'Projeleriniz İçin Yanınızdayız' : lang === 'ro' ? 'Suntem Alături de Dumneavoastră' : 'We\'re Here for Your Projects'}
                        </h2>
                        <p className="text-gray-300 mb-8">
                            {lang === 'tr'
                                ? 'Asansör ihtiyaçlarınız için bizimle iletişime geçin.'
                                : lang === 'ro'
                                    ? 'Contactați-ne pentru nevoile dvs. de ascensoare.'
                                    : 'Contact us for your elevator needs.'}
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
