'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQProps {
    title: string;
    items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ title, items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section bg-gray-50">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-primary-900">
                        {title}
                    </h2>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                                >
                                    <span className="font-semibold text-lg text-primary-900 pr-4">
                                        {item.question}
                                    </span>
                                    <div className="flex-shrink-0">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5 text-accent-600" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

