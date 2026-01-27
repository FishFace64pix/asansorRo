import React from 'react';

export interface PageHeroProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    overlay?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    backgroundImage = '/images/elevator-bg.jpg',
    overlay = true,
}) => {
    return (
        <section
            className="relative section py-32"
            style={{
                backgroundImage: overlay
                    ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%), url(${backgroundImage})`
                    : `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in-up">{title}</h1>
                    <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
};
