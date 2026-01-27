import { ArrowRight, ChevronRight, CheckCircle2, Star, ShieldCheck, ThumbsUp } from 'lucide-react';

export interface HeroProps {
    translations: any;
    locale: string;
    projectCount: number;
}

export const Hero: React.FC<HeroProps> = ({ translations, locale, projectCount }) => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary-950 font-sans -mt-32 md:-mt-36">
            {/* Background Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900 to-primary-950 z-0" />

            {/* Subtle Gradient Spotlights */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-primary-800/30 blur-[120px]" />
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-primary-700/20 blur-[100px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 z-0" />

            <div className="container relative z-10 py-20 lg:py-32">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-800/50 border border-primary-700 backdrop-blur-sm mb-8 animate-fade-in-up">
                        <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                        <span className="text-primary-100 text-sm font-medium tracking-wide uppercase">
                            {translations.hero.badge || translations.common.companyName}
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight animate-fade-in-up [animation-delay:100ms]">
                        {translations.hero.title.split(' ').slice(0, -3).join(' ')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
                            {translations.hero.title.split(' ').slice(-3).join(' ')}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        {translations.hero.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up [animation-delay:300ms]">
                        <a
                            href={`/${locale}/contact`}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-600/20"
                        >
                            <span>{translations.hero.cta1}</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href={`/${locale}/projects`}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-800/50 hover:bg-primary-800 text-white border border-primary-700/50 hover:border-primary-600 rounded-lg font-semibold text-lg backdrop-blur-sm transition-all"
                        >
                            <span>{translations.nav.projects}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </a>
                    </div>

                    {/* Stats / Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-primary-800/50 pt-12 animate-fade-in-up [animation-delay:400ms]">
                        {[
                            { label: translations.features.projects.label, value: `${projectCount}+`, icon: CheckCircle2 },
                            // Experience removed
                            { label: translations.features.support.label, value: translations.features.support.number, icon: ShieldCheck },
                            { label: translations.features.safety.label, value: translations.features.safety.number, icon: ThumbsUp },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group">
                                <stat.icon className="w-8 h-8 text-primary-600 group-hover:text-accent-500 transition-colors mb-2" />
                                <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
        </section>
    );
};
