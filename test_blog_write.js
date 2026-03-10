require('dotenv').config({ path: '.env.local' });
const { connectDB } = require('./src/lib/mongodb');
const { BlogPost } = require('./src/models/index');

async function test() {
    await connectDB();
    const posts = await BlogPost.find({}).lean();
    console.log(`Found ${posts.length} posts.`);
    
    // simulate writeJSON
    try {
        await BlogPost.deleteMany({});
        console.log("Deleted all.");
        await BlogPost.insertMany(posts);
        console.log("Inserted all successfully.");
    } catch (err) {
        console.error("Validation error:", err);
    }
    process.exit(0);
}
test();
