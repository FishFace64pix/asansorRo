'use client';

import { useEffect, useState, use } from 'react';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { Testimonial } from '@/data/references';

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/testimonials`)
            .then(res => res.json())
            .then((data: Testimonial[]) => {
                const found = data.find(p => p.id === id);
                setTestimonial(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!testimonial) return <div>Müşteri yorumu bulunamadı</div>;

    return <TestimonialForm initialData={testimonial} isEdit />;
}
