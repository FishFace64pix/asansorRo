export type ProductCategory = 'residential' | 'commercial' | 'industrial' | 'hospital' | 'freight';

export interface Product {
    id: string;
    name: {
        tr: string;
        en: string;
        ro: string;
    };
    slug: string;
    category: ProductCategory;
    capacity: number; // kg
    speed: number; // m/s
    floors: number;
    power: string;
    dimensions: {
        width: number;
        depth: number;
        height: number;
    };
    warranty: string;
    description: {
        tr: string;
        en: string;
        ro: string;
    };
    features: {
        tr: string[];
        en: string[];
        ro: string[];
    };
    images: string[];
    brochureUrl?: string;
    price?: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: {
            tr: 'Konut Asansörü Premium',
            en: 'Residential Elevator Premium',
            ro: 'Ascensor Rezidențial Premium',
        },
        slug: 'residential-elevator-premium',
        category: 'residential',
        capacity: 630,
        speed: 1.0,
        floors: 8,
        power: '5.5 kW',
        dimensions: {
            width: 1100,
            depth: 1400,
            height: 2200,
        },
        warranty: '2 yıl',
        description: {
            tr: 'Modern konut binaları için tasarlanmış, sessiz ve enerji verimli asansör. Yüksek konfor ve güvenlik standartları.',
            en: 'Designed for modern residential buildings, quiet and energy efficient elevator. High comfort and safety standards.',
            ro: 'Proiectat pentru clădiri rezidențiale moderne, ascensor silențios și eficient energetic. Standarde înalte de confort și siguranță.',
        },
        features: {
            tr: [
                'Sessiz çalışma',
                'Enerji verimli motor',
                'LED aydınlatma',
                'Dokunmatik kontrol paneli',
                'Acil durum aydınlatması',
            ],
            en: [
                'Quiet operation',
                'Energy efficient motor',
                'LED lighting',
                'Touch control panel',
                'Emergency lighting',
            ],
            ro: [
                'Funcționare silențioasă',
                'Motor eficient energetic',
                'Iluminat LED',
                'Panou de control tactil',
                'Iluminat de urgență',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/installation.jpg',
            '/images/maintenance.jpg',
        ],
        brochureUrl: '/brochures/residential-premium.pdf',
    },
    {
        id: '2',
        name: {
            tr: 'Ticari Asansör Standart',
            en: 'Commercial Elevator Standard',
            ro: 'Ascensor Comercial Standard',
        },
        slug: 'commercial-elevator-standard',
        category: 'commercial',
        capacity: 1000,
        speed: 1.5,
        floors: 15,
        power: '11 kW',
        dimensions: {
            width: 1600,
            depth: 1400,
            height: 2400,
        },
        warranty: '2 yıl',
        description: {
            tr: 'Ofis binaları ve ticari merkezler için ideal, yüksek kapasiteli ve dayanıklı asansör çözümü.',
            en: 'Ideal for office buildings and commercial centers, high capacity and durable elevator solution.',
            ro: 'Ideal pentru clădiri de birouri și centre comerciale, soluție de ascensor cu capacitate mare și durabil.',
        },
        features: {
            tr: [
                'Yüksek kapasite',
                'Hızlı çalışma',
                'Dayanıklı yapı',
                'Modern tasarım',
                '7/24 destek',
            ],
            en: [
                'High capacity',
                'Fast operation',
                'Durable structure',
                'Modern design',
                '24/7 support',
            ],
            ro: [
                'Capacitate mare',
                'Funcționare rapidă',
                'Structură durabilă',
                'Design modern',
                'Suport 24/7',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/modernization.jpg',
            '/images/installation.jpg',
        ],
        brochureUrl: '/brochures/commercial-standard.pdf',
    },
    {
        id: '3',
        name: {
            tr: 'Endüstriyel Yük Asansörü',
            en: 'Industrial Freight Elevator',
            ro: 'Ascensor Industrial Marfă',
        },
        slug: 'industrial-freight-elevator',
        category: 'industrial',
        capacity: 5000,
        speed: 0.5,
        floors: 10,
        power: '22 kW',
        dimensions: {
            width: 2000,
            depth: 2500,
            height: 3000,
        },
        warranty: '3 yıl',
        description: {
            tr: 'Ağır yükler için tasarlanmış, endüstriyel kullanım için güçlü ve güvenilir asansör.',
            en: 'Designed for heavy loads, powerful and reliable elevator for industrial use.',
            ro: 'Proiectat pentru sarcini grele, ascensor puternic și de încredere pentru uz industrial.',
        },
        features: {
            tr: [
                'Çok yüksek kapasite',
                'Güçlü motor',
                'Geniş kabin',
                'Ağır hizmet yapısı',
                'Uzun ömür',
            ],
            en: [
                'Very high capacity',
                'Powerful motor',
                'Wide cabin',
                'Heavy duty structure',
                'Long lifespan',
            ],
            ro: [
                'Capacitate foarte mare',
                'Motor puternic',
                'Cabina largă',
                'Structură pentru sarcini grele',
                'Durată de viață lungă',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/maintenance.jpg',
            '/images/modernization.jpg',
        ],
        brochureUrl: '/brochures/industrial-freight.pdf',
    },
    {
        id: '4',
        name: {
            tr: 'Hastane Asansörü',
            en: 'Hospital Elevator',
            ro: 'Ascensor Spital',
        },
        slug: 'hospital-elevator',
        category: 'hospital',
        capacity: 1600,
        speed: 1.0,
        floors: 12,
        power: '11 kW',
        dimensions: {
            width: 2100,
            depth: 1400,
            height: 2400,
        },
        warranty: '3 yıl',
        description: {
            tr: 'Hastaneler için özel tasarlanmış, hijyenik ve güvenli asansör. Geniş kabin ve özel güvenlik özellikleri.',
            en: 'Specially designed for hospitals, hygienic and safe elevator. Wide cabin and special safety features.',
            ro: 'Proiectat special pentru spitale, ascensor igienic și sigur. Cabină largă și caracteristici speciale de siguranță.',
        },
        features: {
            tr: [
                'Hijyenik yüzeyler',
                'Geniş kabin',
                'Özel güvenlik',
                'Sessiz çalışma',
                'Acil durum özellikleri',
            ],
            en: [
                'Hygienic surfaces',
                'Wide cabin',
                'Special safety',
                'Quiet operation',
                'Emergency features',
            ],
            ro: [
                'Suprafețe igienice',
                'Cabină largă',
                'Siguranță specială',
                'Funcționare silențioasă',
                'Caracteristici de urgență',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/installation.jpg',
            '/images/maintenance.jpg',
        ],
        brochureUrl: '/brochures/hospital.pdf',
    },
    {
        id: '5',
        name: {
            tr: 'Konut Asansörü Kompakt',
            en: 'Residential Elevator Compact',
            ro: 'Ascensor Rezidențial Compact',
        },
        slug: 'residential-elevator-compact',
        category: 'residential',
        capacity: 400,
        speed: 0.63,
        floors: 5,
        power: '3.7 kW',
        dimensions: {
            width: 900,
            depth: 1100,
            height: 2100,
        },
        warranty: '2 yıl',
        description: {
            tr: 'Küçük konut binaları ve villalar için kompakt ve ekonomik asansör çözümü.',
            en: 'Compact and economical elevator solution for small residential buildings and villas.',
            ro: 'Soluție de ascensor compactă și economică pentru clădiri rezidențiale mici și vile.',
        },
        features: {
            tr: [
                'Kompakt tasarım',
                'Ekonomik fiyat',
                'Kolay kurulum',
                'Düşük enerji tüketimi',
                'Modern görünüm',
            ],
            en: [
                'Compact design',
                'Economical price',
                'Easy installation',
                'Low energy consumption',
                'Modern appearance',
            ],
            ro: [
                'Design compact',
                'Preț economic',
                'Instalare ușoară',
                'Consum redus de energie',
                'Aspect modern',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/modernization.jpg',
            '/images/installation.jpg',
        ],
        brochureUrl: '/brochures/residential-compact.pdf',
    },
    {
        id: '6',
        name: {
            tr: 'Ticari Asansör Premium',
            en: 'Commercial Elevator Premium',
            ro: 'Ascensor Comercial Premium',
        },
        slug: 'commercial-elevator-premium',
        category: 'commercial',
        capacity: 1600,
        speed: 2.5,
        floors: 25,
        power: '18.5 kW',
        dimensions: {
            width: 2000,
            depth: 1400,
            height: 2500,
        },
        warranty: '3 yıl',
        description: {
            tr: 'Yüksek binalar ve prestijli projeler için premium asansör. Maksimum konfor ve performans.',
            en: 'Premium elevator for high-rise buildings and prestigious projects. Maximum comfort and performance.',
            ro: 'Ascensor premium pentru clădiri înalte și proiecte prestigioase. Confort și performanță maximă.',
        },
        features: {
            tr: [
                'Çok hızlı',
                'Premium malzemeler',
                'Lüks tasarım',
                'Gelişmiş teknoloji',
                'Uzun garanti',
            ],
            en: [
                'Very fast',
                'Premium materials',
                'Luxury design',
                'Advanced technology',
                'Long warranty',
            ],
            ro: [
                'Foarte rapid',
                'Materiale premium',
                'Design de lux',
                'Tehnologie avansată',
                'Garanție lungă',
            ],
        },
        images: [
            '/images/elevator-bg.jpg',
            '/images/maintenance.jpg',
            '/images/modernization.jpg',
        ],
        brochureUrl: '/brochures/commercial-premium.pdf',
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory | 'all'): Product[] {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
}

export function searchProducts(query: string, locale: 'tr' | 'en' | 'ro' = 'tr'): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter((p) => 
        p.name[locale].toLowerCase().includes(lowerQuery) ||
        p.description[locale].toLowerCase().includes(lowerQuery)
    );
}

