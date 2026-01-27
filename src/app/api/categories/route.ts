import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const categoriesFilePath = path.join(process.cwd(), 'src/data/categories.json');

export async function GET() {
    try {
        const data = await fs.readFile(categoriesFilePath, 'utf-8');
        const categories = JSON.parse(data);
        return NextResponse.json(categories);
    } catch (error) {
        // If file doesn't exist, return default categories
        const defaultCategories = [
            { id: 'residential', name: { tr: 'Konut', en: 'Residential', ro: 'Rezidențial' } },
            { id: 'commercial', name: { tr: 'Ticari', en: 'Commercial', ro: 'Comercial' } },
            { id: 'industrial', name: { tr: 'Endüstriyel', en: 'Industrial', ro: 'Industrial' } },
            { id: 'hospital', name: { tr: 'Hastane', en: 'Hospital', ro: 'Spital' } },
            { id: 'freight', name: { tr: 'Yük', en: 'Freight', ro: 'Marfă' } },
        ];
        return NextResponse.json(defaultCategories);
    }
}

export async function POST(request: NextRequest) {
    try {
        const newCategory = await request.json();
        
        let categories = [];
        try {
            const data = await fs.readFile(categoriesFilePath, 'utf-8');
            categories = JSON.parse(data);
        } catch {
            categories = [];
        }

        const category = {
            id: newCategory.id || newCategory.name.tr.toLowerCase().replace(/\s+/g, '-'),
            name: {
                tr: newCategory.name.tr,
                en: newCategory.name.en,
                ro: newCategory.name.ro,
            },
        };

        categories.push(category);
        
        await fs.mkdir(path.dirname(categoriesFilePath), { recursive: true });
        await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));
        
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const categoryData = await request.json();
        
        const data = await fs.readFile(categoriesFilePath, 'utf-8');
        const categories = JSON.parse(data);
        
        const index = categories.findIndex((cat: any) => cat.id === categoryData.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        categories[index] = {
            ...categories[index],
            name: categoryData.name,
        };
        
        await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));
        
        return NextResponse.json(categories[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
        }

        const data = await fs.readFile(categoriesFilePath, 'utf-8');
        const categories = JSON.parse(data);
        const filtered = categories.filter((cat: any) => cat.id !== id);

        await fs.writeFile(categoriesFilePath, JSON.stringify(filtered, null, 2));
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}

