import { NextResponse } from 'next/server';
import { readJSON, writeJSON } from '@/lib/db';
import { Project } from '@/data/projects';

const FILE_NAME = 'projects.json';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const projects = await readJSON<Project>(FILE_NAME);
        const index = projects.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        projects[index] = { ...projects[index], ...body };
        await writeJSON(FILE_NAME, projects);

        return NextResponse.json(projects[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const projects = await readJSON<Project>(FILE_NAME);
        const filteredProjects = projects.filter(p => p.id !== id);

        if (projects.length === filteredProjects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        await writeJSON(FILE_NAME, filteredProjects);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
