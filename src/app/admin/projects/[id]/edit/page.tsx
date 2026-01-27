'use client';

import { useEffect, useState, use } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { Project } from '@/data/projects';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/projects`)
            .then(res => res.json())
            .then((data: Project[]) => {
                const found = data.find(p => p.id === id);
                setProject(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (!project) return <div>Proje bulunamadı</div>;

    return <ProjectForm initialData={project} isEdit />;
}
