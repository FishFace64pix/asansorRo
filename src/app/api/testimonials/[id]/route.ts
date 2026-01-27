import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Testimonial } from '@/data/references';

const FILE_NAME = 'testimonials.json';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const list = await readJSON<Testimonial>(FILE_NAME);
        const index = list.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        list[index] = { ...list[index], ...body };
        await writeJSON(FILE_NAME, list);

        return NextResponse.json(list[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const list = await readJSON<Testimonial>(FILE_NAME);
        const filteredList = list.filter(p => p.id !== id);

        if (list.length === filteredList.length) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        await writeJSON(FILE_NAME, filteredList);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
