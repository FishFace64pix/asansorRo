'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface StatsCounterProps {
    translations: any;
}

interface Stat {
    number: number;
    label: string;
    suffix?: string;
    icon: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ translations }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
    const sectionRef = useRef<HTMLDivElement>(null);

    const stats: Stat[] = [
        { icon: '🏗️', number: 500, label: translations.stats.projects, suffix: '+' },
        { icon: '😊', number: 350, label: translations.stats.clients, suffix: '+' },
        { icon: '👨‍🔧', number: 45, label: translations.stats.technicians, suffix: '+' },
        { icon: '🏙️', number: 25, label: translations.stats.cities, suffix: '+' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        stats.forEach((stat, index) => {
            let currentCount = 0;
            const increment = stat.number / steps;

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= stat.number) {
                    currentCount = stat.number;
                    clearInterval(timer);
                }
                setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(currentCount);
                    return newCounts;
                });
            }, interval);
        });
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="section relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #3B82F6 100%)',
        }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center animate-fade-in-up group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                                {stat.icon}
                            </div>

                            {/* Number */}
                            <div className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-accent via-orange-400 to-yellow-300 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                                {counts[index]}{stat.suffix || ''}
                            </div>

                            {/* Label */}
                            <div className="text-lg md:text-xl text-gray-200 font-semibold uppercase tracking-wider">
                                {stat.label}
                            </div>

                            {/* Decorative Line */}
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 group-hover:w-24 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
