import React from 'react';

export interface MissionVisionProps {
    translations: any;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ translations }) => {
    return (
        <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="glass-card p-12 hover-lift">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 shadow-accent">
                    <span className="text-3xl">🎯</span>
                </div>
                <h3 className="mb-4">{translations.about.mission.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {translations.about.mission.text}
                </p>
            </div>

            {/* Vision */}
            <div className="glass-card p-12 hover-lift">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-secondary">
                    <span className="text-3xl">🚀</span>
                </div>
                <h3 className="mb-4">{translations.about.vision.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {translations.about.vision.text}
                </p>
            </div>
        </div>
    );
};
