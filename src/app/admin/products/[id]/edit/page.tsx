'use client';

import { useEffect, useState, use } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/data/products';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/products`)
            .then(res => res.json())
            .then((data: Product[]) => {
                const found = data.find(p => p.id === id);
                setProduct(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!product) return <div>Ürün bulunamadı</div>;

    return <ProductForm initialData={product} isEdit />;
}
