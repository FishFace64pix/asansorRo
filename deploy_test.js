const https = require('https');

async function testApi() {
    const loginData = JSON.stringify({ password: process.env.ADMIN_PASSWORD });
    
    const fetchAuth = () => new Promise((resolve, reject) => {
        const req = https.request('https://asansor.ro/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(loginData)
            }
        }, (res) => {
            const cookie = res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0] : '';
            resolve(cookie);
        });
        req.on('error', reject);
        req.write(loginData);
        req.end();
    });

    try {
        const cookie = await fetchAuth();
        console.log("Got cookie:", cookie);

        const newPost = {
            title: { tr: 'a', en: 'a', ro: 'a' },
            slug: 'mentenanta-lift-romania-cost-',
            category: 'Bakım',
            author: 'Admin',
            excerpt: {
                tr: "R",
                en: "W",
                ro: "C"
            },
            content: { tr: 'a', en: 'a', ro: 'a' },
            image: '/images/blog/example.jpg',
            readTime: 6,
            featured: false,
        };

        const postData = JSON.stringify(newPost);
        const reqPost = https.request('https://asansor.ro/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Cookie': cookie
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => console.log('Response:', res.statusCode, data));
        });
        
        reqPost.on('error', (e) => console.error("Request error:", e));
        reqPost.write(postData);
        reqPost.end();
        
    } catch (e) {
        console.error(e);
    }
}
testApi();
