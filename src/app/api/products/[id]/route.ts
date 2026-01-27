import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Product } from '@/data/products';

const FILE_NAME = 'products.json';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const products = await readJSON<Product>(FILE_NAME);
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        products[index] = { ...products[index], ...body };
        await writeJSON(FILE_NAME, products);

        return NextResponse.json(products[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const products = await readJSON<Product>(FILE_NAME);
        const filteredProducts = products.filter(p => p.id !== id);

        if (products.length === filteredProducts.length) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await writeJSON(FILE_NAME, filteredProducts);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
