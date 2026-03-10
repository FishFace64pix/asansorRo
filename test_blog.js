const mongoose = require('mongoose');

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
        await mongoose.connect(process.env.MONGODB_URI);
        
        const newPost = {
            title: { tr: 'a', en: 'a', ro: 'a' },
            slug: 'mentenanta-lift-romania-cost-',
            category: 'Bakım',
            author: 'Admin',
            excerpt: {
                tr: "Romanya'da asansör bakımı...",
                en: "Wondering how much...",
                ro: "Cat platesti în 2026..."
            },
            content: { tr: 'a', en: 'a', ro: 'a' },
            image: '/images/blog/example.jpg',
            readTime: 6,
            featured: false, // not in schema
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
        };

        const doc = new BlogPost(newPost);
        await doc.validate();
        console.log("Validation passed");
    } catch (err) {
        console.error("Validation error:", err.message);
    }
    process.exit(0);
}
test();
