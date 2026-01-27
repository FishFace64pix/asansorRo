// Mock referans verileri
export interface Partner {
    id: string;
    name: string;
    logo: string;
    website?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    position: {
        ro: string;
        en: string;
        tr: string;
    };
    company: string;
    content: {
        ro: string;
        en: string;
        tr: string;
    };
    avatar: string;
    rating: number;
}

export const partners: Partner[] = [
    { id: '1', name: 'Skanska', logo: '/images/partners/skanska.svg', website: 'https://skanska.ro' },
    { id: '2', name: 'Globalworth', logo: '/images/partners/globalworth.svg', website: 'https://globalworth.com' },
    { id: '3', name: 'One United', logo: '/images/partners/oneunited.svg', website: 'https://one.ro' },
    { id: '4', name: 'Forte Partners', logo: '/images/partners/forte.svg', website: 'https://fortepartners.ro' },
    { id: '5', name: 'Iulius Group', logo: '/images/partners/iulius.svg', website: 'https://iulius.ro' },
    { id: '6', name: 'AFI Europe', logo: '/images/partners/afi.svg', website: 'https://afieurope.com' },
    { id: '7', name: 'Impact Developer', logo: '/images/partners/impact.svg', website: 'https://impactsa.ro' },
    { id: '8', name: 'Hagag Development', logo: '/images/partners/hagag.svg', website: 'https://hagageurope.com' },
    { id: '9', name: 'Gran Via', logo: '/images/partners/granvia.svg' },
    { id: '10', name: 'Prime Kapital', logo: '/images/partners/primekapital.svg' },
    { id: '11', name: 'Portland Trust', logo: '/images/partners/portland.svg' },
    { id: '12', name: 'Vastint Romania', logo: '/images/partners/vastint.svg' }
];

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Ion Popescu',
        position: {
            ro: 'Director Tehnic',
            en: 'Technical Director',
            tr: 'Teknik Direktör'
        },
        company: 'Skanska România',
        content: {
            ro: 'Colaborarea cu AsansorTech a fost excelentă. Profesionalismul și calitatea serviciilor lor au depășit așteptările noastre. Recomandăm cu încredere!',
            en: 'Working with AsansorTech has been excellent. Their professionalism and service quality exceeded our expectations. Highly recommended!',
            tr: 'AsansorTech ile çalışmak mükemmeldi. Profesyonellikleri ve hizmet kaliteleri beklentilerimizi aştı. Kesinlikle tavsiye ediyoruz!'
        },
        avatar: '/images/testimonials/avatar-1.jpg',
        rating: 5
    },
    {
        id: '2',
        name: 'Maria Ionescu',
        position: {
            ro: 'Manager Proprietăți',
            en: 'Property Manager',
            tr: 'Mülk Yöneticisi'
        },
        company: 'Globalworth',
        content: {
            ro: 'Serviciul de mentenanță 24/7 ne oferă liniște sufletească. Echipa răspunde rapid și rezolvă orice problemă eficient.',
            en: 'The 24/7 maintenance service gives us peace of mind. The team responds quickly and solves any issue efficiently.',
            tr: '7/24 bakım hizmeti bize huzur veriyor. Ekip hızlı yanıt veriyor ve her sorunu verimli bir şekilde çözüyor.'
        },
        avatar: '/images/testimonials/avatar-2.jpg',
        rating: 5
    },
    {
        id: '3',
        name: 'Andrei Marin',
        position: {
            ro: 'Director General',
            en: 'General Manager',
            tr: 'Genel Müdür'
        },
        company: 'Hotel Grand Palace',
        content: {
            ro: 'Modernizarea ascensoarelor noastre a fost realizată impecabil, cu minimă întrerupere a activității hotelului. Rezultatul a fost spectaculos!',
            en: 'The modernization of our elevators was done impeccably, with minimal disruption to hotel operations. The result was spectacular!',
            tr: 'Asansörlerimizin modernizasyonu, otel operasyonlarını minimum düzeyde etkileyerek kusursuz bir şekilde gerçekleştirildi. Sonuç muhteşemdi!'
        },
        avatar: '/images/testimonials/avatar-3.jpg',
        rating: 5
    },
    {
        id: '4',
        name: 'Elena Dumitrescu',
        position: {
            ro: 'Administrator HOA',
            en: 'HOA Administrator',
            tr: 'Site Yöneticisi'
        },
        company: 'Rezidențial Park View',
        content: {
            ro: 'După instalarea noilor ascensoare, locatarii sunt foarte mulțumiți. Funcționează silențios și eficient. Mulțumim AsansorTech!',
            en: 'After the installation of new elevators, residents are very satisfied. They run quietly and efficiently. Thank you AsansorTech!',
            tr: 'Yeni asansörlerin kurulumundan sonra sakinler çok memnun. Sessiz ve verimli çalışıyorlar. Teşekkürler AsansorTech!'
        },
        avatar: '/images/testimonials/avatar-4.jpg',
        rating: 5
    },
    {
        id: '5',
        name: 'Gheorghe Stancu',
        position: {
            ro: 'Director Operațiuni',
            en: 'Operations Director',
            tr: 'Operasyon Direktörü'
        },
        company: 'Plaza Mall București',
        content: {
            ro: 'Timp de răspuns excelent și echipă foarte profesionistă. AsansorTech este partenerul nostru de încredere pentru toate nevoile de ascensoare.',
            en: 'Excellent response time and very professional team. AsansorTech is our trusted partner for all elevator needs.',
            tr: 'Mükemmel yanıt süresi ve çok profesyonel ekip. AsansorTech tüm asansör ihtiyaçlarımız için güvenilir ortağımız.'
        },
        avatar: '/images/testimonials/avatar-5.jpg',
        rating: 5
    }
];
