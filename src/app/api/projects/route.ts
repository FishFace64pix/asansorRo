import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Project } from '@/data/projects';

const FILE_NAME = 'projects.json';

export async function GET() {
    const projects = await readJSON<Project>(FILE_NAME);
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const projects = await readJSON<Project>(FILE_NAME);

        const newProject = {
            ...body,
            id: Date.now().toString(),
        };

        projects.push(newProject);
        await writeJSON(FILE_NAME, projects);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
