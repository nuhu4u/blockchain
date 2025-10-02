const fs = require('fs');
const crypto = require('crypto');

const envContent = `# Server Configuration
NODE_ENV=development
PORT=3000

# Encryption
ENCRYPTION_KEY=${crypto.randomBytes(32).toString('hex')}

# JWT
JWT_SECRET=${crypto.randomBytes(32).toString('hex')}
JWT_EXPIRES_IN=90d

# Database
DATABASE_URL=your_database_connection_string_here
`;

fs.writeFileSync('.env', envContent);
console.log('✅ .env file created successfully!');
console.log('Please update DATABASE_URL with your actual database connection string.');
