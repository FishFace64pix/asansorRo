'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export interface ContactFormProps {
    translations: any;
}

export const ContactForm: React.FC<ContactFormProps> = ({ translations }) => {
    const [formData, setFormData] = useState<{
        companyName: string;
        fullName: string;
        phone: string;
        email: string;
        dimX: string;
        dimY: string;
        dimZ: string;
        description: string;
        file: File | null;
        gdpr: boolean;
    }>({
        companyName: '',
        fullName: '',
        phone: '',
        email: '',
        dimX: '',
        dimY: '',
        dimZ: '',
        description: '',
        file: null,
        gdpr: false,
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const data = new FormData();
            data.append('companyName', formData.companyName);
            data.append('fullName', formData.fullName);
            data.append('phone', formData.phone);
            data.append('email', formData.email);

            // Boyutları birleştir
            const dimensions = `${formData.dimX || '0'}x${formData.dimY || '0'}x${formData.dimZ || '0'} mm`;
            data.append('dimensions', dimensions);

            data.append('description', formData.description);
            data.append('gdpr', String(formData.gdpr));
            if (formData.file) {
                data.append('file', formData.file);
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            setFormData({
                companyName: '',
                fullName: '',
                phone: '',
                email: '',
                dimX: '',
                dimY: '',
                dimZ: '',
                description: '',
                file: null,
                gdpr: false,
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Form submit error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 6 * 1024 * 1024) {
                alert('File size must be less than 6MB');
                e.target.value = '';
                return;
            }
            setFormData(prev => ({ ...prev, file }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-8">
            <h3 className="text-xl font-bold mb-6 text-primary-900 border-b border-gray-100 pb-4">
                {translations.contact.form.formTitle}
            </h3>

            {/* Kişisel/Firma Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                    label={`${translations.contact.form.companyName} *`}
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />
                <Input
                    label={`${translations.contact.form.name} *`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                    label={`${translations.contact.form.phone} *`}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <Input
                    label={`${translations.contact.form.email} *`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Proje Detayları */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.contact.form.dimensionsTitle}
                </label>
                <div className="grid grid-cols-3 gap-4">
                    <Input
                        label={translations.contact.form.dimensionX}
                        name="dimX"
                        value={formData.dimX}
                        onChange={handleChange}
                        placeholder="mm"
                    />
                    <Input
                        label={translations.contact.form.dimensionY}
                        name="dimY"
                        value={formData.dimY}
                        onChange={handleChange}
                        placeholder="mm"
                    />
                    <Input
                        label={translations.contact.form.dimensionZ}
                        name="dimZ"
                        value={formData.dimZ}
                        onChange={handleChange}
                        placeholder="mm"
                    />
                </div>
            </div>

            <div className="mb-6">
                <Textarea
                    label={translations.contact.form.message}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                />
            </div>

            {/* Dosya Yükleme */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.contact.form.fileSelect}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-accent-500 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent-500 p-1"
                            >
                                <span>{translations.contact.form.fileUpload}</span>
                                <input
                                    id="file-upload"
                                    name="file"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    accept=".dwg,.pdf,.zip,.rar,.jpg,.png,.bmp,.doc,.docx,.xls,.xlsx,.txt"
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">
                            {translations.contact.form.fileNote}
                        </p>
                        {formData.file && (
                            <p className="text-sm text-green-600 font-medium">
                                Selected: {formData.file.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="gdpr"
                        checked={formData.gdpr}
                        onChange={handleChange}
                        required
                        className="mt-1"
                    />
                    <span className="text-sm text-gray-600">{translations.contact.form.gdpr}</span>
                </label>
            </div>

            {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    {translations.contact.form.success}
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {translations.contact.form.error}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={status === 'loading'}
                className="w-full md:w-auto"
            >
                {translations.contact.form.submit}
            </Button>
        </form>
    );
};
