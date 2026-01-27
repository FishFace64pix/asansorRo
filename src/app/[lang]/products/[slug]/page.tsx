import { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHero } from '@/components/shared/PageHero';
import { ProductGallery } from '@/components/products/ProductGallery';
import { CTASection } from '@/components/sections/CTASection';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCategory } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Download, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
            cache: 'no-store',
        });
        const products = await response.json();
        return products.map((product: any) => ({
            slug: product.slug,
        }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const translations = await getTranslations(lang);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
            cache: 'no-store',
        });
        const products = await response.json();
        const product = products.find((p: any) => p.slug === slug);

        if (!product) {
            return {
                title: `Ürün Bulunamadı | ${translations.common.companyName}`,
            };
        }

        return {
            title: `${product.name[lang]} | ${translations.common.companyName}`,
            description: product.description[lang],
        };
    } catch {
        return {
            title: `Ürün Bulunamadı | ${translations.common.companyName}`,
        };
    }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
    const { lang, slug } = await params;
    const translations = await getTranslations(lang);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
        cache: 'no-store',
    });
    const products = await response.json();
    const product = products.find((p: any) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const name = product.name[lang];
    const description = product.description[lang];
    const features = product.features[lang];

    // Get related products (same category, exclude current)
    const relatedProducts = products
        .filter((p: any) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <MainLayout locale={lang} translations={translations}>
            {/* Hero */}
            <PageHero
                title={name}
                subtitle={description}
                backgroundImage={product.images[0] || '/images/elevator-bg.jpg'}
            />

            {/* Breadcrumb */}
            <section className="section py-4 bg-gray-50">
                <div className="container">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href={`/${lang}`} className="hover:text-accent-600">
                            {translations.nav.home}
                        </Link>
                        <span>/</span>
                        <Link href={`/${lang}/products`} className="hover:text-accent-600">
                            {translations.nav.products}
                        </Link>
                        <span>/</span>
                        <span className="text-primary-900 font-medium">{name}</span>
                    </div>
                </div>
            </section>

            {/* Product Details */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left: Gallery */}
                        <div>
                            <ProductGallery images={product.images} productName={name} />
                        </div>

                        {/* Right: Info */}
                        <div>
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
                                    {translations.products.categories[product.category]}
                                </span>
                                <h1 className="text-4xl font-bold text-primary-900 mb-4">{name}</h1>
                                <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
                            </div>

                            {/* Specifications */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-primary-900">
                                    {translations.products.details.specifications}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.capacity}</span>
                                        <p className="text-lg font-semibold text-primary-900">{product.capacity} kg</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.speed}</span>
                                        <p className="text-lg font-semibold text-primary-900">{product.speed} m/s</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.floors}</span>
                                        <p className="text-lg font-semibold text-primary-900">{product.floors}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.power}</span>
                                        <p className="text-lg font-semibold text-primary-900">{product.power}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.dimensions}</span>
                                        <p className="text-lg font-semibold text-primary-900">
                                            {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} mm
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{translations.products.details.warranty}</span>
                                        <p className="text-lg font-semibold text-primary-900">{product.warranty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-primary-900">
                                    {translations.products.details.features}
                                </h2>
                                <ul className="space-y-3">
                                    {features.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {product.brochureUrl && (
                                    <a
                                        href={product.brochureUrl}
                                        download
                                        className="btn btn-secondary flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        {translations.products.details.downloadBrochure}
                                    </a>
                                )}
                                <Link
                                    href={`/${lang}/contact`}
                                    className="btn btn-primary flex items-center justify-center gap-2"
                                >
                                    {translations.products.details.requestQuote}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="section bg-gray-50">
                    <div className="container">
                        <h2 className="text-3xl font-bold mb-8 text-center text-primary-900">
                            {translations.products.details.relatedProducts}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedProducts.map((relatedProduct: any) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                    locale={lang}
                                    translations={translations}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <CTASection translations={translations} locale={lang} />
        </MainLayout>
    );
}

