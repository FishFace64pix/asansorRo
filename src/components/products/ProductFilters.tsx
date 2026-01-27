'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { ProductCategory } from '@/data/products';
import { Locale } from '@/lib/i18n/config';

export interface ProductFiltersProps {
    translations: any;
    locale: Locale;
    selectedCategory: ProductCategory | 'all';
    searchQuery: string;
    onCategoryChange: (category: ProductCategory | 'all') => void;
    onSearchChange: (query: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    translations,
    locale,
    selectedCategory,
    searchQuery,
    onCategoryChange,
    onSearchChange,
}) => {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const categories: (ProductCategory | 'all')[] = ['all', 'residential', 'commercial', 'industrial', 'hospital', 'freight'];

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder={translations.products.filters.search}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const label = category === 'all' 
                        ? translations.products.filters.all 
                        : translations.products.categories[category];
                    
                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                selectedCategory === category
                                    ? 'bg-accent-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

