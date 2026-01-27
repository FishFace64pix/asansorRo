import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface ProcessStep {
    title: string;
    description: string;
}

export interface ProcessStepsProps {
    title: string;
    steps: ProcessStep[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ title, steps }) => {
    return (
        <section className="section">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-primary-900">
                        {title}
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-accent-600 hidden md:block" />

                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div key={index} className="relative flex items-start gap-6">
                                    {/* Step Number Circle */}
                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {index + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-2">
                                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                            <h3 className="text-2xl font-bold text-primary-900 mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

