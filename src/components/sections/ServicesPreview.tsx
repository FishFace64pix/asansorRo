import React from 'react';
import { Settings, Wrench, Zap, ArrowRight } from 'lucide-react';

export interface ServicesPreviewProps {
    translations: any;
    locale: string;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ translations, locale }) => {
    const services = [
        {
            title: translations.services.installation.title,
            description: translations.services.installation.description,
            image: '/images/installation.jpg',
            icon: Settings,
            link: `/${locale}/services/installation`,
        },
        {
            title: translations.services.maintenance.title,
            description: translations.services.maintenance.description,
            image: '/images/maintenance.jpg',
            icon: Wrench,
            link: `/${locale}/services/maintenance`,
        },
        {
            title: translations.services.modernization.title,
            description: translations.services.modernization.description,
            image: '/images/modernization.jpg',
            icon: Zap,
            link: `/${locale}/services/modernization`,
        },
    ];

    return (
        <section className="section bg-gray-50 py-24">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">
                        {translations.nav.services}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 tracking-tight">
                        {translations.services.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        {translations.services.subtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <a
                            key={index}
                            href={service.link}
                            className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image Area */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-primary-900/0 transition-colors z-10" />
                                <div
                                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url(${service.image})` }}
                                />
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg">
                                    <service.icon className="w-6 h-6 text-primary-700" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow p-8">
                                <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>

                                <div className="mt-auto flex items-center text-accent-600 font-semibold group-hover:gap-2 transition-all">
                                    <span>{translations.common.viewDetails}</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
