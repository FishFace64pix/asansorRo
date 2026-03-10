import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { BlogPost } from '@/data/blog';

const FILE_NAME = 'blog.json';

export async function GET() {
    const posts = await readJSON<BlogPost>(FILE_NAME);
    return NextResponse.json(posts);
}

export const dynamic = 'force-dynamic';

import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const posts = await readJSON<BlogPost>(FILE_NAME);

        // Sanitize content to prevent XSS
        const sanitizedContent = {
            tr: DOMPurify.sanitize(body.content.tr),
            en: DOMPurify.sanitize(body.content.en),
            ro: DOMPurify.sanitize(body.content.ro),
        };

        const newPost = {
            ...body,
            content: sanitizedContent,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
        };

        posts.push(newPost);
        await writeJSON(FILE_NAME, posts);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }
}
