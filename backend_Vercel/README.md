# Election System Backend

A secure and scalable backend for an election system with NIN verification, real-time results, and blockchain integration.

## Features

- 🔐 Secure authentication with JWT and role-based access control
- 🆔 NIN (National Identification Number) verification and management
- 🗳️ Secure voting system with transaction hashing
- 👁️ Real-time election monitoring with Socket.IO
- 📊 Comprehensive admin dashboard
- 🌐 RESTful API with proper documentation
- 🔗 Optional blockchain integration for vote immutability
- 📱 Mobile-friendly API endpoints

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **Security**: Helmet, rate limiting, CORS
- **Validation**: express-validator
- **Logging**: Winston
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier

## Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd election-system-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Set up Prisma**
   ```bash
   # Install Prisma CLI globally (if not already installed)
   npm install -g prisma
   
   # Generate Prisma Client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed the database with initial data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot-reload
- `npm test` - Run tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format the code
- `npm run prisma:studio` - Open Prisma Studio for database management
- `npm run db:seed` - Seed the database with sample data
- `npm run db:reset` - Reset the database (use with caution)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/election_system?retryWrites=true&w=majority"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Encryption Keys (Generate strong keys for production)
ENCRYPTION_KEY=your_32_character_encryption_key_here
HMAC_SECRET=your_hmac_secret_key_here

# Email Configuration (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# OTP Configuration
OTP_EXPIRY_MINUTES=2

# Admin Configuration
ADMIN_EMAIL=admin@election.gov
ADMIN_PASSWORD=secure_admin_password
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:

- **User**: Voters, admins, and observers
- **Election**: Election details and metadata
- **Candidate**: Candidates for each election
- **Vote**: Individual votes cast by users
- **Observer**: Election observers and their details
- **GeoData**: Hierarchical location data (states, LGAs, wards, PUs)
- **HomepageStat**: Statistics for the homepage

## Security

- All passwords are hashed using bcrypt
- Sensitive data like NIN is encrypted before storage
- Rate limiting to prevent brute force attacks
- CORS protection
- Helmet for secure HTTP headers
- Input validation using express-validator

## Testing

Run the test suite:

```bash
npm test
```

## Frontend-Backend Route Mapping & Integration

This backend is designed to support all frontend modules, including hierarchical election analytics and results. Below is a mapping of key frontend routes to backend API endpoints:

| Frontend Route                | Backend Endpoint(s)                                 | Description                                  |
|-------------------------------|----------------------------------------------------|----------------------------------------------|
| `/` (Homepage)                | `/dashboard/stats`                                 | Homepage stats (voters, PUs, LGAs, states)   |
| `/login`, `/register`         | `/auth/login`, `/auth/register`                    | Voter authentication/registration            |
| `/verify-nin`                 | `/auth/nin`, `/auth/submit-nin`                    | NIN submission/verification                  |
| `/dashboard`                  | `/dashboard/elections/:id/results`, `/election/:id/results` | Voter dashboard, live results, charts        |
| `/forgot-password`            | `/auth/forgot-password`, `/auth/reset-password`     | Password recovery                            |
| `/vote-position/[level]`      | `/election/:id/results`, `/election/:electionId/my-vote`, `/election/search/:transactionHash` | Results/analytics by level (PU, Ward, LGA, State, National), user vote position, transaction hash lookup |
| `/elections`                  | `/election/`                                       | Live elections preview/list                  |
| `/observer/apply`             | `/observer/elections`, `/observer/reports`         | Observer application                         |
| `/observer/login`, `/observer/register` | `/auth/login`, `/auth/register` (role: OBSERVER) | Observer authentication/registration         |
| `/observer/dashboard`         | `/observer/elections`, `/observer/reports`         | Observer dashboard (read-only)               |
| `/observer/forgot-password`   | `/auth/forgot-password`, `/auth/reset-password`     | Observer password recovery                   |
| `/admin`                      | `/admin/observers`, `/admin/elections/:electionId/observers/:observerId/assign`, `/admin/reports` | Admin panel, observer management, reports    |

**Note:**
- The backend supports hierarchical queries for all election levels (PU, Ward, LGA, State, National) via query parameters or endpoint structure.
- The `/vote-position/[level]` frontend route is powered by `/election/:id/results` and related endpoints, allowing analytics and results at any level.
- Searching by transaction hash is supported via `/election/search/:transactionHash`.

## Developer Integration Guide

- Replace all frontend mock data with real API calls to the endpoints above.
- For results/analytics by level, use `/election/:id/results` and pass the desired level as a query parameter if needed.
- For user vote position, use `/election/:electionId/my-vote`.
- For searching by transaction hash, use `/election/search/:transactionHash`.
- For homepage stats, use `/dashboard/stats`.
- For observer/admin dashboards, use the corresponding observer/admin endpoints.

## Deployment

1. Build the application:
   ```