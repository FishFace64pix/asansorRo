import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

const baseUrl = 'https://asansortech.ro';
const locales = ['ro', 'en', 'tr'];

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        '',
        '/products',
        '/projects',
        '/references',
        '/blog',
        '/contact',
        '/corporate',
        '/corporate/about',
        '/corporate/subsidiaries',
        '/services',
        '/services/installation',
        '/services/maintenance',
        '/services/modernization',
    ];

    // Generate static pages for all locales
    const staticRoutes = staticPages.flatMap((page) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    // Generate product pages
    const productRoutes = products.flatMap((product) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    // Generate project pages
    const projectRoutes = projects.flatMap((project) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}/projects/${project.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    );

    // Generate blog pages
    const blogRoutes = blogPosts.flatMap((post) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    );

    return [...staticRoutes, ...productRoutes, ...projectRoutes, ...blogRoutes];
}
