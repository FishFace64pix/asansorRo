'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent({ locale, translations }: { locale: string; translations: any }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6">
            <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm text-gray-600">
                    <p>
                        {translations.cookieConsent?.text || 'Bu web sitesi deneyiminizi geliştirmek için çerezleri kullanır.'}{' '}
                        <Link href={`/${locale}/corporate/privacy`} className="text-accent-600 hover:underline font-medium">
                            {translations.cookieConsent?.learnMore || 'Daha fazla bilgi al'}
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={accept}
                        className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                        {translations.cookieConsent?.accept || 'Kabul Et'}
                    </button>
                    <button
                        onClick={() => setShow(false)}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                        {translations.cookieConsent?.decline || 'Reddet'}
                    </button>
                </div>
            </div>
        </div>
    );
}
