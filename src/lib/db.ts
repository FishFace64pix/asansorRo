import connectDB from './mongodb';
import { BlogPost, Project, Product, Reference } from '@/models';

// Map filenames to models
const MODELS: Record<string, any> = {
    'blog.json': BlogPost,
    'projects.json': Project,
    'products.json': Product,
    'partners.json': Reference,
};

export async function readJSON<T>(filename: string): Promise<T[]> {
    await connectDB();
    const Model = MODELS[filename];
    if (!Model) {
        console.warn(`No model found for ${filename}, returning empty array.`);
        return [];
    }
    const docs = await Model.find({}).lean();
    // Convert _id to string id if necessary, but our schema has 'id' field.
    // We should strip _id and __v for compatibility if needed, but extra fields usually harmless.
    return JSON.parse(JSON.stringify(docs));
}

export async function writeJSON<T>(filename: string, data: T[]): Promise<void> {
    await connectDB();
    const Model = MODELS[filename];
    if (!Model) {
        console.warn(`No model found for ${filename}, cannot write.`);
        return;
    }

    // Compatibility Mode: Overwrite all data (Inefficient but matches file-system behavior)
    // The current app logic is: readAll -> modify array -> writeAll.
    // So we must replicate this: Delete All -> Insert All.
    // Transaction would be safer but let's keep it simple for now.

    try {
        await Model.deleteMany({});
        await Model.insertMany(data);
    } catch (error) {
        console.error(`Error writing to ${filename} (MongoDB):`, error);
        throw error;
    }
}
