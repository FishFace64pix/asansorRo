// Mock blog verileri
export interface BlogPost {
    id: string;
    slug: string;
    title: {
        ro: string;
        en: string;
        tr: string;
    };
    excerpt: {
        ro: string;
        en: string;
        tr: string;
    };
    content: {
        ro: string;
        en: string;
        tr: string;
    };
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: number;
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'elevator-safety-standards-2024',
        title: {
            ro: 'Noile Standarde de Siguranță pentru Ascensoare în 2024',
            en: 'New Elevator Safety Standards in 2024',
            tr: '2024 Yılında Yeni Asansör Güvenlik Standartları'
        },
        excerpt: {
            ro: 'Aflați despre cele mai recente reglementări și standarde de siguranță pentru ascensoare care intră în vigoare în 2024.',
            en: 'Learn about the latest elevator safety regulations and standards coming into effect in 2024.',
            tr: '2024 yılında yürürlüğe giren en son asansör güvenlik düzenlemeleri ve standartları hakkında bilgi edinin.'
        },
        content: {
            ro: '<p>În 2024, industria ascensoarelor se confruntă cu noi standarde de siguranță importante...</p>',
            en: '<p>In 2024, the elevator industry faces significant new safety standards...</p>',
            tr: '<p>2024 yılında asansör sektörü önemli yeni güvenlik standartlarıyla karşı karşıya...</p>'
        },
        author: 'Mihai Popescu',
        date: '2024-01-15',
        category: 'safety',
        image: '/images/blog/safety-standards.jpg',
        readTime: 5,
        featured: true
    },
    {
        id: '2',
        slug: 'energy-efficient-elevators',
        title: {
            ro: 'Ascensoare Eficiente Energetic: Viitorul Transportului Vertical',
            en: 'Energy-Efficient Elevators: The Future of Vertical Transport',
            tr: 'Enerji Verimli Asansörler: Dikey Taşımacılığın Geleceği'
        },
        excerpt: {
            ro: 'Descoperiți cum tehnologiile moderne de ascensoare pot reduce consumul de energie cu până la 70%.',
            en: 'Discover how modern elevator technologies can reduce energy consumption by up to 70%.',
            tr: 'Modern asansör teknolojilerinin enerji tüketimini %70\'e kadar nasıl azaltabileceğini keşfedin.'
        },
        content: {
            ro: '<p>Ascensoarele moderne utilizează tehnologii avansate pentru eficiență energetică...</p>',
            en: '<p>Modern elevators use advanced technologies for energy efficiency...</p>',
            tr: '<p>Modern asansörler enerji verimliliği için gelişmiş teknolojiler kullanır...</p>'
        },
        author: 'Elena Ionescu',
        date: '2024-01-10',
        category: 'technology',
        image: '/images/blog/energy-efficient.jpg',
        readTime: 7,
        featured: true
    },
    {
        id: '3',
        slug: 'elevator-maintenance-tips',
        title: {
            ro: '10 Sfaturi pentru Întreținerea Corectă a Ascensorului',
            en: '10 Tips for Proper Elevator Maintenance',
            tr: 'Doğru Asansör Bakımı için 10 İpucu'
        },
        excerpt: {
            ro: 'Ghid complet pentru proprietarii de clădiri despre întreținerea preventivă a ascensoarelor.',
            en: 'Complete guide for building owners on preventive elevator maintenance.',
            tr: 'Bina sahipleri için önleyici asansör bakımı hakkında kapsamlı rehber.'
        },
        content: {
            ro: '<p>Întreținerea preventivă este esențială pentru longevitatea ascensorului...</p>',
            en: '<p>Preventive maintenance is essential for elevator longevity...</p>',
            tr: '<p>Önleyici bakım, asansör ömrü için çok önemlidir...</p>'
        },
        author: 'Alexandru Marin',
        date: '2024-01-05',
        category: 'maintenance',
        image: '/images/blog/maintenance-tips.jpg',
        readTime: 6,
        featured: false
    },
    {
        id: '4',
        slug: 'smart-elevator-systems',
        title: {
            ro: 'Sisteme Inteligente de Ascensoare: IoT și Automatizare',
            en: 'Smart Elevator Systems: IoT and Automation',
            tr: 'Akıllı Asansör Sistemleri: IoT ve Otomasyon'
        },
        excerpt: {
            ro: 'Cum tehnologia IoT transformă industria ascensoarelor și îmbunătățește experiența utilizatorilor.',
            en: 'How IoT technology is transforming the elevator industry and improving user experience.',
            tr: 'IoT teknolojisi asansör sektörünü nasıl dönüştürüyor ve kullanıcı deneyimini nasıl iyileştiriyor.'
        },
        content: {
            ro: '<p>Tehnologia IoT aduce o revoluție în industria ascensoarelor...</p>',
            en: '<p>IoT technology is bringing a revolution to the elevator industry...</p>',
            tr: '<p>IoT teknolojisi asansör sektöründe devrim yaratıyor...</p>'
        },
        author: 'Andrei Dumitrescu',
        date: '2023-12-20',
        category: 'technology',
        image: '/images/blog/smart-elevators.jpg',
        readTime: 8,
        featured: true
    },
    {
        id: '5',
        slug: 'choosing-right-elevator',
        title: {
            ro: 'Cum să Alegeți Ascensorul Potrivit pentru Clădirea Dumneavoastră',
            en: 'How to Choose the Right Elevator for Your Building',
            tr: 'Binanız için Doğru Asansörü Nasıl Seçersiniz'
        },
        excerpt: {
            ro: 'Factori importanți de luat în considerare atunci când alegeți un sistem de ascensor.',
            en: 'Important factors to consider when choosing an elevator system.',
            tr: 'Asansör sistemi seçerken dikkate alınması gereken önemli faktörler.'
        },
        content: {
            ro: '<p>Alegerea ascensorului potrivit depinde de mai mulți factori...</p>',
            en: '<p>Choosing the right elevator depends on several factors...</p>',
            tr: '<p>Doğru asansörü seçmek birçok faktöre bağlıdır...</p>'
        },
        author: 'Maria Constantinescu',
        date: '2023-12-15',
        category: 'guide',
        image: '/images/blog/choosing-elevator.jpg',
        readTime: 10,
        featured: false
    }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(p => p.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(p => p.featured);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
    return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
};
