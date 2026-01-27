import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Gauge, Building2 } from 'lucide-react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/i18n/config';

export interface ProductCardProps {
    product: Product;
    locale: Locale;
    translations?: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale, translations }) => {
    const name = product.name[locale];
    const description = product.description[locale];
    const categoryLabel = translations?.products?.categories?.[product.category] || product.category;

    return (
        <Link
            href={`/${locale}/products/${product.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-primary-900">
                <img
                    src={product.images[0] || '/images/elevator-bg.jpg'}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
                        {categoryLabel}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex flex-col items-center">
                        <Users className="w-5 h-5 text-accent-600 mb-1" />
                        <span className="text-xs text-gray-500">{translations?.products?.details?.capacity || 'Kapasite'}</span>
                        <span className="text-sm font-semibold text-primary-900">{product.capacity} kg</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Gauge className="w-5 h-5 text-accent-600 mb-1" />
                        <span className="text-xs text-gray-500">{translations?.products?.details?.speed || 'Hız'}</span>
                        <span className="text-sm font-semibold text-primary-900">{product.speed} m/s</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Building2 className="w-5 h-5 text-accent-600 mb-1" />
                        <span className="text-xs text-gray-500">{translations?.products?.details?.floors || 'Kat'}</span>
                        <span className="text-sm font-semibold text-primary-900">{product.floors}</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-accent-600 font-semibold group-hover:gap-2 transition-all">
                    <span>{translations?.common?.viewDetails || 'Detayları Gör'}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

