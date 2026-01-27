import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/quotes.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Ensure directories exist
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function GET() {
    try {
        if (fs.existsSync(DATA_FILE_PATH)) {
            const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
            const quotes = JSON.parse(fileContent);
            return NextResponse.json(quotes);
        }
        return NextResponse.json([]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const companyName = formData.get('companyName') as string;
        const fullName = formData.get('fullName') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string;
        const dimensions = formData.get('dimensions') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File | null;

        // Validation
        if (!companyName || !fullName || !phone || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let fileUrl = null;
        if (file) {
            // Validate file type
            const allowedExtensions = ['.pdf', '.dwg', '.dxf', '.jpg', '.jpeg', '.png', '.zip', '.rar'];
            const ext = path.extname(file.name).toLowerCase();

            if (!allowedExtensions.includes(ext)) {
                return NextResponse.json(
                    { error: 'Invalid file type. Allowed: PDF, DWG, DXF, Images, ZIP, RAR' },
                    { status: 400 }
                );
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
            const filepath = path.join(UPLOAD_DIR, filename);
            await writeFile(filepath, buffer);
            fileUrl = `/uploads/${filename}`;
        }

        const newQuote = {
            id: Date.now().toString(),
            companyName,
            fullName,
            phone,
            email,
            dimensions,
            description,
            fileUrl,
            status: 'new', // new, reviewed, contacted
            createdAt: new Date().toISOString(),
        };

        // Save to JSON
        let quotes = [];
        if (fs.existsSync(DATA_FILE_PATH)) {
            const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
            try {
                quotes = JSON.parse(fileContent);
            } catch (e) {
                quotes = [];
            }
        }
        quotes.unshift(newQuote);
        await writeFile(DATA_FILE_PATH, JSON.stringify(quotes, null, 2));

        return NextResponse.json(
            { message: 'Quote request received successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        if (fs.existsSync(DATA_FILE_PATH)) {
            const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
            let quotes = JSON.parse(fileContent);

            quotes = quotes.map((q: any) =>
                q.id === id ? { ...q, status } : q
            );

            await writeFile(DATA_FILE_PATH, JSON.stringify(quotes, null, 2));
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        if (fs.existsSync(DATA_FILE_PATH)) {
            const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
            let quotes = JSON.parse(fileContent);

            quotes = quotes.filter((q: any) => q.id !== id);

            await writeFile(DATA_FILE_PATH, JSON.stringify(quotes, null, 2));
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
    }
}
