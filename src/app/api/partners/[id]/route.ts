import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Partner } from '@/data/references';

const FILE_NAME = 'partners.json';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const list = await readJSON<Partner>(FILE_NAME);
        const index = list.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        list[index] = { ...list[index], ...body };
        await writeJSON(FILE_NAME, list);

        return NextResponse.json(list[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const list = await readJSON<Partner>(FILE_NAME);
        const filteredList = list.filter(p => p.id !== id);

        if (list.length === filteredList.length) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        await writeJSON(FILE_NAME, filteredList);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
    }
}
