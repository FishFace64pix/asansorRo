import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { BlogPost } from '@/data/blog';

const FILE_NAME = 'blog.json';

export const dynamic = 'force-dynamic';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const posts = await readJSON<BlogPost>(FILE_NAME);
        const index = posts.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        posts[index] = { ...posts[index], ...body };
        await writeJSON(FILE_NAME, posts);

        return NextResponse.json(posts[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const posts = await readJSON<BlogPost>(FILE_NAME);
        const filteredPosts = posts.filter(p => p.id !== id);

        if (posts.length === filteredPosts.length) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        await writeJSON(FILE_NAME, filteredPosts);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
}
