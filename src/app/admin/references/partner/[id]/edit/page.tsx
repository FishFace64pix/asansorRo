'use client';

import { useEffect, useState, use } from 'react';
import PartnerForm from '@/components/admin/PartnerForm';
import { Partner } from '@/data/references';

export default function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [partner, setPartner] = useState<Partner | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/partners`)
            .then(res => res.json())
            .then((data: Partner[]) => {
                const found = data.find(p => p.id === id);
                setPartner(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!partner) return <div>İş ortağı bulunamadı</div>;

    return <PartnerForm initialData={partner} isEdit />;
}
