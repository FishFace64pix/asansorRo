'use client';

import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface BlogPreviewProps {
    translations: any;
    locale: string;
}

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ translations, locale }) => {
    const posts: BlogPost[] = [
        {
            id: 1,
            title: 'Tehnologii Moderne în Industria Ascensoarelor',
            excerpt: 'Descoperă cele mai noi tehnologii care revoluționează siguranța și eficiența ascensoarelor moderne...',
            category: 'Technology',
            date: '2024-01-20',
            image: '/images/modernization.jpg',
        },
        {
            id: 2,
            title: 'Importanța Mentenanței Periodice',
            excerpt: 'Aflați de ce mentenanța preventivă este esențială pentru funcționarea optimă și siguranța ascensorului...',
            category: 'Maintenance',
            date: '2024-01-15',
            image: '/images/maintenance.jpg',
        },
        {
            id: 3,
            title: 'Ghid: Alegerea Ascensorului Potrivit',
            excerpt: 'Cum să alegi ascensorul perfect pentru clădirea ta? Factori importanți de luat în considerare...',
            category: 'Guide',
            date: '2024-01-10',
            image: '/images/installation.jpg',
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'ro' ? 'ro-RO' : locale === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <section className="section">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="mb-4">{translations.blog.title}</h2>
                    <p className="text-xl text-gray-600">{translations.blog.subtitle}</p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <article
                            key={post.id}
                            className="card hover-lift animate-fade-in-up cursor-pointer"
                            style={{ animationDelay: `${index * 150}ms` }}
                            onClick={() => (window.location.href = `/${locale}/blog/${post.id}`)}
                        >
                            {/* Post Image */}
                            <div
                                className="card-image mb-4"
                                style={{
                                    height: '200px',
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />

                            {/* Post Content */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="secondary">{post.category}</Badge>
                                    <span className="text-sm text-gray-500">• {formatDate(post.date)}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-primary hover:text-secondary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                                <Button variant="ghost" className="p-0">
                                    {translations.common.readMore} →
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Blog Posts Button */}
                <div className="text-center mt-12">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => (window.location.href = `/${locale}/blog`)}
                    >
                        {translations.common.viewAll}
                    </Button>
                </div>
            </div>
        </section>
    );
};
