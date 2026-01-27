import { BarChart3, LifeBuoy, Award, ShieldCheck } from 'lucide-react';

export interface FeaturesCardsProps {
    translations: any;
    projectCount: number;
}

export const FeaturesCards: React.FC<FeaturesCardsProps> = ({ translations, projectCount }) => {
    const features = [
        { icon: BarChart3, number: `${projectCount}+`, label: translations.features.projects.label, color: 'text-blue-500' },
        { icon: LifeBuoy, number: translations.features.support.number, label: translations.features.support.label, color: 'text-purple-500' },
        // Experience removed as per user request
        { icon: ShieldCheck, number: translations.features.safety.number, label: translations.features.safety.label, color: 'text-green-500' },
    ];

    return (
        <section className="relative z-20 -mt-24 pb-20">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <div className={`text-3xl font-bold ${feature.color}`}>
                                    {feature.number}
                                </div>
                            </div>

                            <h3 className="text-gray-600 font-medium text-lg border-t border-gray-100 pt-4">
                                {feature.label}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
