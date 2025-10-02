const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Simple static file server for development
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    let filePath = req.url === '/' ? '/app/page.tsx' : req.url;
    
    // Map routes to files
    if (filePath === '/login') {
        filePath = '/app/login/page.tsx';
    } else if (filePath === '/dashboard') {
        filePath = '/app/dashboard/page.tsx';
    }
    
    const fullPath = path.join(__dirname, filePath);
    
    // Check if file exists
    if (fs.existsSync(fullPath)) {
        const ext = path.extname(fullPath);
        let contentType = 'text/plain';
        
        if (ext === '.tsx' || ext === '.ts') {
            contentType = 'text/plain';
        } else if (ext === '.js') {
            contentType = 'application/javascript';
        } else if (ext === '.css') {
            contentType = 'text/css';
        }
        
        res.writeHead(200, { 'Content-Type': contentType });
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        res.end(fileContent);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><title>404 - Page Not Found</title></head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The requested page could not be found.</p>
                    <p>Available routes:</p>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </body>
            </html>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Development server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔧 This is a simple development server`);
    console.log(`📝 Available routes:`);
    console.log(`   - / (Home)`);
    console.log(`   - /login (Login page)`);
    console.log(`   - /dashboard (Dashboard)`);
    console.log(`\nPress Ctrl+C to stop the server`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
