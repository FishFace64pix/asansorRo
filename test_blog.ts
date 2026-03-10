import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const BlogPostSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    title: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    excerpt: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    content: {
        tr: { type: String, required: true },
        en: { type: String, required: true },
        ro: { type: String, required: true },
    },
    date: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    readTime: { type: Number, default: 5 },
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB.");
        
        const posts = await BlogPost.find({}).lean();
        console.log(`Found ${posts.length} posts.`);
        
        console.log("Writing them back...");
        await BlogPost.deleteMany({});
        await BlogPost.insertMany(posts);
        console.log("Inserted all successfully.");
    } catch (err: any) {
        console.error("Validation error:", err.message);
    }
    process.exit(0);
}
test();
