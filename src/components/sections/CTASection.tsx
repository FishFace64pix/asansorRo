import React from 'react';
import { Button } from '../ui/Button';

export interface CTASectionProps {
    translations: any;
    locale: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ translations, locale }) => {
    return (
        <section className="section relative overflow-hidden">
            {/* Gradient Background with Animation */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #F59E0B 100%)',
                }}
            />

            {/* Animated Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64  bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container relative z-10 text-center text-white py-20">
                {/* Icon/Badge */}
                <div className="inline-block mb-8 animate-bounce">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                        <span className="text-4xl">🚀</span>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-5xl md:text-6xl font-black mb-6 text-white animate-fade-in-up" style={{
                    textShadow: '0 4px 40px rgba(0,0,0,0.3)',
                }}>
                    {translations.cta.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{
                    animationDelay: '100ms',
                    textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}>
                    {translations.cta.subtitle}
                </p>

                {/* CTA Button - Bigger and More Prominent */}
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <a
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-4 px-12 py-6 bg-white text-primary rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group"
                    >
                        <span>{translations.cta.button}</span>
                        <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    {['⭐⭐⭐⭐⭐', '🏆 ISO 9001', '✅ Garantili'].map((badge, i) => (
                        <div key={i} className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 font-semibold">
                            {badge}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
