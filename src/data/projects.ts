// Mock proje verileri
export interface Project {
    id: string;
    slug: string;
    title: {
        ro: string;
        en: string;
        tr: string;
    };
    description: {
        ro: string;
        en: string;
        tr: string;
    };
    category: 'residential' | 'commercial' | 'industrial' | 'hospital';
    location: string;
    year: number;
    client: string;
    elevatorCount: number;
    floors: number;
    image: string;
    gallery: string[];
    featured: boolean;
    status: 'completed' | 'in-progress' | 'planned';
}

export const projects: Project[] = [
    {
        id: '1',
        slug: 'bucuresti-tower-residence',
        title: {
            ro: 'București Tower Residence',
            en: 'Bucharest Tower Residence',
            tr: 'Bükreş Tower Residence'
        },
        description: {
            ro: 'Instalarea a 4 ascensoare de mare viteză pentru acest complex rezidențial de lux cu 25 de etaje.',
            en: 'Installation of 4 high-speed elevators for this 25-story luxury residential complex.',
            tr: '25 katlı bu lüks konut kompleksine 4 adet yüksek hızlı asansör kurulumu.'
        },
        category: 'residential',
        location: 'București, România',
        year: 2024,
        client: 'Tower Development SRL',
        elevatorCount: 4,
        floors: 25,
        image: '/images/projects/project-1.jpg',
        gallery: ['/images/projects/project-1-1.jpg', '/images/projects/project-1-2.jpg'],
        featured: true,
        status: 'completed'
    },
    {
        id: '2',
        slug: 'plaza-mall-timisoara',
        title: {
            ro: 'Plaza Mall Timișoara',
            en: 'Plaza Mall Timișoara',
            tr: 'Plaza Mall Timișoara'
        },
        description: {
            ro: 'Modernizarea completă a 8 ascensoare și 6 scări rulante pentru cel mai mare centru comercial din Timișoara.',
            en: 'Complete modernization of 8 elevators and 6 escalators for the largest shopping center in Timișoara.',
            tr: 'Timișoara\'nın en büyük alışveriş merkezi için 8 asansör ve 6 yürüyen merdivenin tam modernizasyonu.'
        },
        category: 'commercial',
        location: 'Timișoara, România',
        year: 2024,
        client: 'Plaza Group',
        elevatorCount: 8,
        floors: 5,
        image: '/images/projects/project-2.jpg',
        gallery: ['/images/projects/project-2-1.jpg', '/images/projects/project-2-2.jpg'],
        featured: true,
        status: 'completed'
    },
    {
        id: '3',
        slug: 'spitalul-central-cluj',
        title: {
            ro: 'Spitalul Central Cluj-Napoca',
            en: 'Cluj-Napoca Central Hospital',
            tr: 'Cluj-Napoca Merkez Hastanesi'
        },
        description: {
            ro: 'Instalarea a 6 ascensoare speciale pentru spital, inclusiv ascensoare pentru paturi și echipamente medicale.',
            en: 'Installation of 6 special hospital elevators, including bed and medical equipment elevators.',
            tr: 'Yatak ve tıbbi ekipman asansörleri dahil 6 adet özel hastane asansörü kurulumu.'
        },
        category: 'hospital',
        location: 'Cluj-Napoca, România',
        year: 2023,
        client: 'Ministerul Sănătății',
        elevatorCount: 6,
        floors: 12,
        image: '/images/projects/project-3.jpg',
        gallery: ['/images/projects/project-3-1.jpg', '/images/projects/project-3-2.jpg'],
        featured: true,
        status: 'completed'
    },
    {
        id: '4',
        slug: 'fabrica-auto-parts-brasov',
        title: {
            ro: 'Fabrica Auto Parts Brașov',
            en: 'Auto Parts Factory Brașov',
            tr: 'Brașov Otomotiv Fabrikası'
        },
        description: {
            ro: 'Instalarea a 3 ascensoare industriale de mare capacitate pentru transportul materialelor și echipamentelor.',
            en: 'Installation of 3 heavy-duty industrial elevators for material and equipment transport.',
            tr: 'Malzeme ve ekipman taşımacılığı için 3 adet ağır hizmet sanayi asansörü kurulumu.'
        },
        category: 'industrial',
        location: 'Brașov, România',
        year: 2023,
        client: 'Auto Parts Manufacturing SRL',
        elevatorCount: 3,
        floors: 4,
        image: '/images/projects/project-4.jpg',
        gallery: ['/images/projects/project-4-1.jpg'],
        featured: false,
        status: 'completed'
    },
    {
        id: '5',
        slug: 'hotel-grand-constanta',
        title: {
            ro: 'Hotel Grand Constanța',
            en: 'Grand Hotel Constanța',
            tr: 'Grand Hotel Constanța'
        },
        description: {
            ro: 'Modernizarea a 5 ascensoare de pasageri pentru acest hotel de 5 stele cu vedere la Marea Neagră.',
            en: 'Modernization of 5 passenger elevators for this 5-star hotel overlooking the Black Sea.',
            tr: 'Karadeniz manzaralı bu 5 yıldızlı otel için 5 yolcu asansörünün modernizasyonu.'
        },
        category: 'commercial',
        location: 'Constanța, România',
        year: 2023,
        client: 'Grand Hotels Group',
        elevatorCount: 5,
        floors: 18,
        image: '/images/projects/project-5.jpg',
        gallery: ['/images/projects/project-5-1.jpg', '/images/projects/project-5-2.jpg'],
        featured: true,
        status: 'in-progress'
    },
    {
        id: '6',
        slug: 'complex-rezidential-iasi',
        title: {
            ro: 'Complex Rezidențial Green Living Iași',
            en: 'Green Living Residential Complex Iași',
            tr: 'Green Living Konut Kompleksi Iași'
        },
        description: {
            ro: 'Instalarea a 12 ascensoare eficiente energetic pentru acest complex rezidențial ecologic.',
            en: 'Installation of 12 energy-efficient elevators for this eco-friendly residential complex.',
            tr: 'Bu çevre dostu konut kompleksi için 12 adet enerji verimli asansör kurulumu.'
        },
        category: 'residential',
        location: 'Iași, România',
        year: 2024,
        client: 'Green Living Development',
        elevatorCount: 12,
        floors: 10,
        image: '/images/projects/project-6.jpg',
        gallery: ['/images/projects/project-6-1.jpg'],
        featured: false,
        status: 'planned'
    }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
    return projects.filter(p => p.featured);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
    return projects.filter(p => p.category === category);
};
