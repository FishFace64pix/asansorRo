import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
// import { blogPosts, getBlogPostBySlug } from '@/data/blog'; // Remove static import
import { BlogPost } from '@/data/blog';
import { readJSON } from '@/lib/db';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

/*
export async function generateStaticParams() {
    // Since we are now using dynamic data, we might not want to pre-render all static paths
    // or we would need to fetch data here too. For now let's disable static params generation
    // or update it to read from JSON.
    /*
    return blogPosts.flatMap(post =>
        ['ro', 'en', 'tr'].map(lang => ({
            lang,
            slug: post.slug
        }))
    );
    * /
    return [];
}
*/

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const translations = await getTranslations(lang);

    // Fetch posts dynamically
    const posts = await readJSON<BlogPost>('blog.json').catch(() => []);
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    return {
        title: `${post.title[lang]} - ${translations.common.companyName}`,
        description: post.excerpt[lang],
    };
}

export const revalidate = 0;

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

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
    const { lang, slug } = await params;
    const translations = await getTranslations(lang);

    // Fetch posts dynamically
    let blogPosts: BlogPost[] = [];
    try {
        blogPosts = await readJSON<BlogPost>('blog.json');
    } catch (error) {
        console.error('Failed to load blog posts:', error);
    }

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

    // Get next/prev posts - need to sort first to match main page order
    const sortedPosts = [...blogPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const currentIndex = sortedPosts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null; // Newer post (since sorted desc) -> Actually logical "Previous" in timeline usually means older, but here "Previous" button usually goes to newer entries in list? Or older?
    // Usually "Next" triggers deeper/older content, "Previous" newer. 
    // BUT in blog navigation often "Next Article" (chronologically next) vs "Previous Article".
    // Let's stick to list order. 
    // index 0 is newest. index 1 is older.
    // if I am at index 1. Prev is 0 (Newer). Next is 2 (Older).
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Link */}
                        <Link
                            href={`/${lang}/blog`}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {lang === 'tr' ? 'Blog\'a Dön' : lang === 'ro' ? 'Înapoi la Blog' : 'Back to Blog'}
                        </Link>

                        {/* Category */}
                        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${categoryColors[post.category]} mb-4`}>
                            {categoryLabels[post.category]?.[lang] || post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title[lang]}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'ro' ? 'ro-RO' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime} {lang === 'tr' ? 'dk okuma' : lang === 'ro' ? 'min citire' : 'min read'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-[1fr_200px] gap-12">
                            {/* Main Content */}
                            <article className="prose prose-lg max-w-none">
                                {/* Featured Image */}
                                <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden mb-8 not-prose">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-8xl">📰</div>
                                        </div>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                                    {post.excerpt[lang]}
                                </p>

                                {/* Content */}
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.content[lang] }}
                                />
                            </article>

                            {/* Sidebar - Share */}
                            <aside className="hidden lg:block">
                                <div className="sticky top-32">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                        {lang === 'tr' ? 'Paylaş' : lang === 'ro' ? 'Distribuie' : 'Share'}
                                    </h4>
                                    <div className="flex flex-col gap-3">
                                        <button className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-12 mt-12 border-t border-gray-200">
                            {prevPost ? (
                                <Link
                                    href={`/${lang}/blog/${prevPost.slug}`}
                                    className="group flex items-center gap-3 text-gray-600 hover:text-primary-900"
                                >
                                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            {lang === 'tr' ? 'Önceki' : lang === 'ro' ? 'Anterior' : 'Previous'}
                                        </div>
                                        <div className="font-medium line-clamp-1 max-w-xs">{prevPost.title[lang]}</div>
                                    </div>
                                </Link>
                            ) : <div />}

                            {nextPost ? (
                                <Link
                                    href={`/${lang}/blog/${nextPost.slug}`}
                                    className="group flex items-center gap-3 text-gray-600 hover:text-primary-900 text-right"
                                >
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            {lang === 'tr' ? 'Sonraki' : lang === 'ro' ? 'Următor' : 'Next'}
                                        </div>
                                        <div className="font-medium line-clamp-1 max-w-xs">{nextPost.title[lang]}</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            ) : <div />}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="section bg-gray-50">
                    <div className="container">
                        <h2 className="text-2xl font-bold text-primary-900 mb-8">
                            {lang === 'tr' ? 'İlgili Yazılar' : lang === 'ro' ? 'Articole Similare' : 'Related Articles'}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/${lang}/blog/${relatedPost.slug}`}
                                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                                >
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[relatedPost.category]} mb-3`}>
                                        {categoryLabels[relatedPost.category]?.[lang] || relatedPost.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                                        {relatedPost.title[lang]}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {relatedPost.excerpt[lang]}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
