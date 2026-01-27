'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Görsel bulunamadı</p>
            </div>
        );
    }

    return (
        <>
            {/* Main Image */}
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100 mb-4 group">
                <img
                    src={images[selectedIndex]}
                    alt={`${productName} - ${selectedIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Önceki görsel"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Sonraki görsel"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedIndex === index
                                    ? 'border-accent-600 ring-2 ring-accent-200'
                                    : 'border-transparent hover:border-gray-300'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[selectedIndex]}
                            alt={productName}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

