'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface ProjectsSliderProps {
    translations: any;
    locale: string;
    projectCount: number;
    projects: any[];
}

interface Project {
    id: number;
    title: string;
    location: string;
    type: string;
    image: string;
    year: string;
}

export const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ translations, locale, projectCount, projects: paramsProjects }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Map dynamic projects to component structure or use them directly if they match
    // Default to empty array if no projects
    const displayProjects = paramsProjects && paramsProjects.length > 0 ? paramsProjects : [];

    if (displayProjects.length === 0) return null; // Or render empty state


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % displayProjects.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
    };

    return (
        <section className="section">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="mb-4">{translations.projects.title}</h2>
                    <p className="text-xl text-gray-600">
                        {translations.projects.subtitle.replace('{{count}}', projectCount)}
                    </p>
                </div>

                {/* Slider */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Main Slide */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ height: '500px' }}>
                        {displayProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`absolute inset-0 transition-all duration-500 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                                    }`}
                                style={{
                                    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%), url(${project.image || project.images?.[0] || '/images/placeholder.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                                    <div className="mb-4">
                                        <Badge variant="accent" className="mb-2">
                                            {project.category}
                                        </Badge>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-2 text-white">{project.title[locale] || project.title['tr'] || project.title}</h3>
                                    <p className="text-xl mb-4 text-gray-200">
                                        📍 {project.location || 'Romania'} • {project.year || new Date().getFullYear()}
                                    </p>
                                    <div>
                                        <Button
                                            variant="primary"
                                            onClick={() => (window.location.href = `/${locale}/projects`)}
                                        >
                                            {translations.common.viewDetails}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all hover-lift"
                        aria-label="Previous project"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all hover-lift"
                        aria-label="Next project"
                    >
                        →
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {displayProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-accent w-8' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => (window.location.href = `/${locale}/projects`)}
                    >
                        {translations.common.viewAll}
                    </Button>
                </div>
            </div>
        </section>
    );
};
