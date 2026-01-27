import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Product } from '@/data/products';

const FILE_NAME = 'products.json';

export async function GET() {
    const products = await readJSON<Product>(FILE_NAME);
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const products = await readJSON<Product>(FILE_NAME);

        const newProduct = {
            ...body,
            id: Date.now().toString(),
        };

        products.push(newProduct);
        await writeJSON(FILE_NAME, products);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
