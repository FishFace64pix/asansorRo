import React from 'react';
import { Shield, Clock, Zap, BarChart3, Wallet, CheckCircle2 } from 'lucide-react';

export interface WhyChooseUsProps {
    translations: any;
    projectCount: number;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ translations, projectCount }) => {
    const reasons = [
        { icon: Shield, text: translations.whyChooseUs.reason1, color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: Shield, text: translations.whyChooseUs.reason2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { icon: Zap, text: translations.whyChooseUs.reason3, color: 'text-amber-600', bg: 'bg-amber-50' },
        { icon: BarChart3, text: `${projectCount}+ ${translations.whyChooseUs.reason4}`, color: 'text-green-600', bg: 'bg-green-50' },
        { icon: Wallet, text: translations.whyChooseUs.reason5, color: 'text-purple-600', bg: 'bg-purple-50' },
        { icon: CheckCircle2, text: translations.whyChooseUs.reason6, color: 'text-teal-600', bg: 'bg-teal-50' },
    ];

    return (
        <section className="section relative overflow-hidden bg-white py-24">
            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">
                            {translations.whyChooseUs.badge}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 leading-tight">
                            {translations.whyChooseUs.title}
                        </h2>
                        <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                            {translations.whyChooseUs.subtitle}
                        </p>

                        {/* Reasons Grid */}
                        <div className="grid gap-6">
                            {reasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                >
                                    <div className={`flex-shrink-0 w-12 h-12 ${reason.bg} rounded-lg flex items-center justify-center`}>
                                        <reason.icon className={`w-6 h-6 ${reason.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg font-medium text-gray-800">
                                            {reason.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/team.jpg"
                                alt="Professional Team"
                                className="w-full h-[600px] object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-primary-900">{translations.features.support.number}</div>
                                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{translations.features.support.label}</div>
                                    </div>
                                    <div className="h-10 w-px bg-gray-200" />
                                    <div>
                                        <div className="text-3xl font-bold text-primary-900">{projectCount}+</div>
                                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{translations.features.projects.label}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Pattern */}
                        <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent-50/50 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};
