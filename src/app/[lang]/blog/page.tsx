import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
// import { blogPosts } from '@/data/blog'; // Remove static import
import { BlogPost } from '@/data/blog'; // Keep type import
import { readJSON } from '@/lib/db';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    return {
        title: `${translations.nav.blog} - ${translations.common.companyName}`,
        description: translations.blog.subtitle,
    };
}

export const dynamic = 'force-dynamic';

const categoryLabels: Record<string, Record<string, string>> = {
    safety: { ro: 'Siguranță', en: 'Safety', tr: 'Güvenlik' },
    technology: { ro: 'Tehnologie', en: 'Technology', tr: 'Teknoloji' },
    maintenance: { ro: 'Întreținere', en: 'Maintenance', tr: 'Bakım' },
    guide: { ro: 'Ghid', en: 'Guide', tr: 'Rehber' },
};

const categoryColors: Record<string, string> = {
    safety: 'bg-green-100 text-green-700',
    technology: 'bg-blue-100 text-blue-700',
    maintenance: 'bg-orange-100 text-orange-700',
    guide: 'bg-purple-100 text-purple-700',
};

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const translations = await getTranslations(lang);

    // Fetch blog posts dynamically
    let blogPosts: BlogPost[] = [];
    try {
        blogPosts = await readJSON<BlogPost>('blog.json');
    } catch (error) {
        console.error('Failed to load blog posts:', error);
        blogPosts = [];
    }

    // Sort by date
    const sortedPosts = [...blogPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const featuredPost = sortedPosts.find(p => p.featured);
    const otherPosts = sortedPosts.filter(p => p.id !== featuredPost?.id);

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {translations.blog.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            {translations.blog.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="section bg-white">
                    <div className="container">
                        <article className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Image */}
                            <div className="relative h-80 lg:h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden">
                                {featuredPost.image ? (
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title[lang]}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl">📰</div>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featuredPost.category]}`}>
                                        {categoryLabels[featuredPost.category]?.[lang] || featuredPost.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="lg:pl-8">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(featuredPost.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'ro' ? 'ro-RO' : 'en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {featuredPost.readTime} min
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 leading-tight">
                                    {featuredPost.title[lang]}
                                </h2>

                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    {featuredPost.excerpt[lang]}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                            <User className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{featuredPost.author}</span>
                                    </div>
                                    <Link
                                        href={`/${lang}/blog/${featuredPost.slug}`}
                                        className="btn btn-primary"
                                    >
                                        {translations.common.readMore}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="section bg-gray-50">
                <div className="container">
                    {otherPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title[lang]}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-4xl">📄</div>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}>
                                                {categoryLabels[post.category]?.[lang] || post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'ro' ? 'ro-RO' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime} min
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                                            {post.title[lang]}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {post.excerpt[lang]}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">{post.author}</span>
                                            </div>
                                            <Link
                                                href={`/${lang}/blog/${post.slug}`}
                                                className="inline-flex items-center gap-1 text-accent-600 hover:text-accent-700 font-medium text-sm group/link"
                                            >
                                                {translations.common.readMore}
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-xl text-gray-500 mb-2">
                                {lang === 'tr' ? 'Henüz blog yazısı eklenmemiş.' : lang === 'ro' ? 'Nu au fost adăugate articole încă.' : 'No blog posts added yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
