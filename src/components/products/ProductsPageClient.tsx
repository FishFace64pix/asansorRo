'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { PageHero } from '@/components/shared/PageHero';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { ProductCategory, Product } from '@/data/products';

export interface ProductsPageClientProps {
    locale: Locale;
    translations: any;
}

export const ProductsPageClient: React.FC<ProductsPageClientProps> = ({ locale, translations }) => {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = useMemo(() => {
        let result = products;

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter((p) => {
                const matchesSearch =
                    p.name[locale].toLowerCase().includes(lowerQuery) ||
                    p.description[locale].toLowerCase().includes(lowerQuery);

                if (selectedCategory !== 'all') {
                    return matchesSearch && p.category === selectedCategory;
                }
                return matchesSearch;
            });
        }

        return result;
    }, [selectedCategory, searchQuery, locale, products]);

    return (
        <>
            {/* Hero */}
            <PageHero
                title={translations.products.hero.title}
                subtitle={translations.products.hero.subtitle}
                backgroundImage="/images/elevator-bg.jpg"
            />

            {/* Filters and Products */}
            <section className="section">
                <div className="container">
                    <ProductFilters
                        translations={translations}
                        locale={locale}
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                        onCategoryChange={setSelectedCategory}
                        onSearchChange={setSearchQuery}
                    />

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            {filteredProducts.length} {translations.products.title.toLowerCase()} bulundu
                        </p>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500">Yükleniyor...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    locale={locale}
                                    translations={translations}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-500 mb-4">
                                {translations.products.empty.notFound}
                            </p>
                            <p className="text-gray-400">
                                {translations.products.empty.tryAgain}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

