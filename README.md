# Blockchain Voting System

A secure, transparent, and decentralized voting system built with Next.js frontend and Node.js backend, featuring NIN verification and blockchain integration.

## 🏗️ Project Structure

```
Blockchain_voting/
├── VErcel/                 # Frontend (Next.js)
├── backend_Vercel/         # Backend (Node.js/Express)
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running on localhost:27017)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blockchain_voting
   ```

2. **Set up Frozen Environment (Recommended)**
   
   **First time setup:**
   ```bash
   # Frontend
   cd VErcel
   npm run update:once
   
   # Backend  
   cd ../backend_Vercel
   npm run update:once
   ```
   
   This will:
   - Update all dependencies to latest minor/patch versions
   - Install dependencies
   - Generate `npm-shrinkwrap.json` to freeze the environment
   - Commit the changes

3. **Start the servers**
   ```bash
   # Terminal 1 - Backend
   cd backend_Vercel
   npm run dev
   
   # Terminal 2 - Frontend
   cd VErcel
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🔒 Frozen Environment Workflow

This project uses a **frozen dependency environment** to ensure consistent builds across all environments.

### How it works:

1. **Initial Setup**: Run `npm run update:once` to update and freeze dependencies
2. **Frozen State**: All future installs use `npm ci` with the locked `npm-shrinkwrap.json`
3. **Updates**: Only allowed through `npm run update:once` (manual process)

### Commands:

| Command | Purpose | When to use |
|---------|---------|-------------|
| `npm run update:once` | Update & freeze dependencies | Initial setup, when you want to update |
| `npm ci` | Install frozen dependencies | After cloning, CI/CD |
| `npm run dev` | Start development server | Daily development |
| `npm install` | ❌ **BLOCKED** | Never (use `npm ci` instead) |

### Why Frozen Environment?

- **Consistency**: Same exact dependency tree across all environments
- **Security**: Prevents supply chain attacks from automatic updates
- **Stability**: No surprise breaking changes from dependency updates
- **Reproducibility**: Guaranteed identical builds

### Updating Dependencies:

When you need to update dependencies:

1. Run `npm run update:once` in both frontend and backend
2. Test thoroughly
3. Commit the updated `npm-shrinkwrap.json` files
4. Deploy

## 🔐 Authentication

The system supports three types of users:

### Test Credentials:

| User Type | Email | Password | Access |
|-----------|-------|----------|--------|
| **Voter** | `test@example.com` | `password123` | Voting, Profile |
| **Admin** | `admin@example.com` | `admin123` | Admin Dashboard |
| **Observer** | `jamila1@gmail.com` | `password123` | Observer Dashboard |

## 🛠️ Development

### Frontend (VErcel/)
- **Framework**: Next.js 15.2.4
- **UI**: Radix UI + Tailwind CSS
- **State**: React Hooks
- **Port**: 3000

### Backend (backend_Vercel/)
- **Framework**: Node.js + Express
- **Database**: MongoDB (native driver)
- **Authentication**: JWT + bcrypt
- **Port**: 3001

### Key Features:
- ✅ NIN Verification
- ✅ Multi-role Authentication
- ✅ Real-time Voting
- ✅ Blockchain Integration (optional)
- ✅ Secure Password Hashing
- ✅ Rate Limiting
- ✅ Input Validation

## 📁 Important Files

### Frozen Environment:
- `npm-shrinkwrap.json` - Locked dependency tree (both projects)
- `guard-install.js` - Prevents accidental `npm install`

### Configuration:
- `VErcel/.env.local` - Frontend environment variables
- `backend_Vercel/.env` - Backend environment variables

## 🚨 Troubleshooting

### Common Issues:

1. **"FROZEN ENVIRONMENT DETECTED" error**
   - Use `npm ci` instead of `npm install`
   - Or run `npm run update:once` to update

2. **Frontend not loading**
   - Check if backend is running on port 3001
   - Verify environment variables in `.env.local`

3. **Authentication errors**
   - Ensure MongoDB is running
   - Check if test users exist in database

4. **Dependency issues**
   - Delete `node_modules` and run `npm ci`
   - Or run `npm run update:once` to refresh

## 🔧 Environment Variables

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Blockchain Voting System"
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

### Backend (.env):
```env
PORT=3001
DATABASE_URL=mongodb://localhost:27017/blockchain_voting
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
HMAC_SECRET=your-hmac-secret
```

## 📝 Scripts Reference

### Frontend Scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run update:once` - Update & freeze dependencies

### Backend Scripts:
- `npm run dev` - Start with nodemon
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run update:once` - Update & freeze dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This project uses a frozen dependency environment. Always use `npm ci` for installations and `npm run update:once` for updates.
