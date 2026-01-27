import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface ServiceFeature {
    title: string;
    description: string;
}

export interface ServiceFeaturesProps {
    title: string;
    features: ServiceFeature[];
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ title, features }) => {
    return (
        <section className="section bg-primary-900 text-white">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white">
                        {title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all hover-lift"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-200 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

