'use client';

import React, { useEffect, useRef } from 'react';

export interface ReferencesSliderProps {
    translations: any;
    partners: any[];
}

export const ReferencesSlider: React.FC<ReferencesSliderProps> = ({ translations, partners }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    // Use dynamic partners if available
    const hasPartners = partners && partners.length > 0;

    // Determine if we should scroll (e.g., if we have enough items)
    const shouldScroll = hasPartners && partners.length >= 6;

    // Duplicate partners ONLY if scrolling is enabled for seamless infinite loop
    // If not scrolling, just show the list once centered
    const displayPartners = shouldScroll ? [...partners, ...partners] : partners;

    useEffect(() => {
        if (!shouldScroll) return;

        const slider = sliderRef.current;
        if (!slider) return;

        let animationFrame: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.5;

        const animate = () => {
            scrollPosition += scrollSpeed;
            // Reset when we've scrolled past the first set (halfway if duplicated)
            if (scrollPosition >= slider.scrollWidth / 2) {
                scrollPosition = 0;
            }
            slider.scrollLeft = scrollPosition;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [shouldScroll]); // Re-run if scrolling state changes

    if (!hasPartners) {
        return null;
    }

    return (
        <section className="section section-gray">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="mb-4">{translations.references.title}</h2>
                    <p className="text-xl text-gray-600">{translations.references.subtitle}</p>
                </div>

                {/* Logo Container */}
                <div className="relative overflow-hidden">
                    {shouldScroll && (
                        <>
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
                        </>
                    )}

                    <div
                        ref={sliderRef}
                        className={`flex gap-8 md:gap-16 ${shouldScroll ? 'overflow-x-hidden' : 'flex-wrap justify-center overflow-visible'}`}
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {displayPartners.map((partner, index) => (
                            <div
                                key={`${partner.id || index}-${shouldScroll ? 'scroll' : 'static'}`}
                                className="flex-shrink-0 w-48 h-32 flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer p-4 group"
                            >
                                {partner.logo ? (
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="text-xl font-bold text-gray-400 group-hover:text-primary-600 transition-colors">{partner.name}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
