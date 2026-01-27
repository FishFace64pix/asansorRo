import React from 'react';

export interface CoreValuesProps {
    translations: any;
}

interface Value {
    icon: string;
    title: string;
    description: string;
}

export const CoreValues: React.FC<CoreValuesProps> = ({ translations }) => {
    const values: Value[] = [
        {
            icon: '🛡️',
            title: translations.about.values?.value1?.title || 'Safety First',
            description: translations.about.values?.value1?.description || 'We prioritize safety in every installation and maintenance service.',
        },
        {
            icon: '⭐',
            title: translations.about.values?.value2?.title || 'Quality Excellence',
            description: translations.about.values?.value2?.description || 'Commitment to the highest quality standards in all our work.',
        },
        {
            icon: '🤝',
            title: translations.about.values?.value3?.title || 'Customer Focus',
            description: translations.about.values?.value3?.description || 'Building long-term partnerships based on trust and transparency.',
        },
        {
            icon: '💡',
            title: translations.about.values?.value4?.title || 'Innovation',
            description: translations.about.values?.value4?.description || 'Adopting cutting-edge technology to deliver superior solutions.',
        },
        {
            icon: '🌱',
            title: translations.about.values?.value5?.title || 'Sustainability',
            description: translations.about.values?.value5?.description || 'Environmentally responsible practices and energy-efficient solutions.',
        },
        {
            icon: '⚡',
            title: translations.about.values?.value6?.title || 'Reliability',
            description: translations.about.values?.value6?.description || '24/7 support and rapid response times for all our clients.',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
                <div
                    key={index}
                    className="card text-center hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-4xl">{value.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-primary">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                </div>
            ))}
        </div>
    );
};
