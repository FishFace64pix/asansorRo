import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Partner } from '@/data/references';

const FILE_NAME = 'partners.json';

export async function GET() {
    const list = await readJSON<Partner>(FILE_NAME);
    return NextResponse.json(list);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const list = await readJSON<Partner>(FILE_NAME);

        const newItem = {
            ...body,
            id: Date.now().toString(),
        };

        list.push(newItem);
        await writeJSON(FILE_NAME, list);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }
}
