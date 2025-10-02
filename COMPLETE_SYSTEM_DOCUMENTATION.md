# Complete Blockchain Voting System Documentation

## System Overview

Your system is a **comprehensive web-based voting platform** built with modern technologies. It's a **hybrid application** that combines traditional database operations with optional blockchain integration for enhanced security and transparency.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN VOTING SYSTEM                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │    BACKEND      │    │   DATABASE      │
│   (Next.js 15)  │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│   React 19      │    │   Express.js    │    │   Atlas/Local   │
│   TypeScript    │    │   JWT Auth      │    │   Collections   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   BLOCKCHAIN    │    │   REAL-TIME     │    │   FILE STORAGE  │
│   (DISABLED)    │    │   (Polling)     │    │   (Images)      │
│   Ethereum      │    │   Live Updates  │    │   Party Logos   │
│   Smart Contracts│    │   Auto-refresh  │    │   Avatars       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Complete Directory Structure

### Frontend (VErcel/)
```
VErcel/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel
│   │   ├── login/page.tsx       # Admin login
│   │   ├── register/page.tsx    # Admin registration  
│   │   └── page.tsx             # Admin dashboard
│   ├── dashboard/page.tsx        # Voter dashboard
│   ├── elections/page.tsx        # Live elections
│   ├── vote-position/           # Vote position tracking
│   │   ├── page.tsx            # Main vote position page
│   │   ├── [electionId]/page.tsx # Election-specific positions
│   │   └── level-detail/[level]/page.tsx # Level-specific details
│   ├── observer/                # Observer dashboard
│   │   ├── dashboard/page.tsx   # Observer main dashboard
│   │   ├── apply/page.tsx       # Observer application
│   │   ├── register/page.tsx    # Observer registration
│   │   └── profile/page.tsx     # Observer profile
│   ├── verify-nin/page.tsx      # NIN verification
│   ├── blockchain/page.tsx      # Blockchain dashboard
│   ├── login/page.tsx           # User login
│   ├── register/page.tsx        # User registration
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── voting-modal.tsx         # Voting interface
│   ├── blockchain-status.tsx    # Blockchain status
│   ├── transaction-monitor.tsx  # Transaction tracking
│   ├── TokenExpirationWarning.tsx # Token expiration handling
│   ├── ProtectedRoute.tsx       # Route protection
│   └── ui/                      # UI components (Radix UI)
├── lib/                         # Utilities and services
│   ├── services/                # API services
│   │   ├── authService.ts       # Authentication service
│   │   ├── electionService.ts   # Election management
│   │   ├── pollingService.ts    # Real-time polling
│   │   ├── votePositionService.ts # Vote position tracking
│   │   └── enhancedPositionService.ts # Enhanced position tracking
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSimpleAuth.ts     # Simple authentication
│   │   ├── useUserAuth.ts       # User authentication
│   │   ├── useObserverAuth.ts   # Observer authentication
│   │   └── useUserTokenExpiration.ts # Token expiration
│   ├── utils/                   # Helper functions
│   ├── data/                    # Static data
│   │   └── candidates.ts        # Candidate information
│   └── config.ts                # Configuration
└── public/                      # Static assets
    ├── party-logos/             # Political party logos
    └── avatars/                 # User avatars
```

### Backend (backend_Vercel/)
```
backend_Vercel/
├── controllers/                  # Request handlers
│   ├── authController.js        # Authentication & NIN verification
│   ├── electionController.js    # Election management & voting
│   ├── dashboardController.js   # Dashboard data
│   ├── blockchainController.js  # Blockchain operations
│   ├── observerController.js    # Observer management
│   ├── adminController.js       # Admin operations
│   └── voterTrackingController.js # Voter tracking
├── services/                     # Business logic
│   ├── blockchainService.js     # Blockchain integration
│   └── blockchainEventService.js # Event handling
├── routes/                       # API routes
│   ├── auth.js                  # Auth endpoints
│   ├── election.js              # Election endpoints
│   ├── blockchain.js            # Blockchain endpoints
│   ├── dashboard.js             # Dashboard endpoints
│   ├── observer.js              # Observer endpoints
│   ├── admin.js                 # Admin endpoints
│   └── positions.js             # Position tracking
├── middleware/                   # Custom middleware
│   ├── auth.js                  # Authentication middleware
│   ├── validation.js            # Input validation
│   └── errorHandler.js          # Error handling
├── contracts/                    # Smart contracts (DISABLED)
│   └── Election.sol             # Main voting contract (NOT IN USE)
├── utils/                        # Utilities
│   ├── crypto.js                # Encryption/decryption
│   ├── apiError.js              # Error handling
│   └── logger.js                # Logging
├── sockets/                      # WebSocket (DISABLED)
│   └── blockchainEvents.js      # Event listeners (NOT IN USE)
├── scripts/                      # Deployment scripts (DISABLED)
│   └── deploy-contract.js        # Contract deployment (NOT IN USE)
├── server.js                     # Main server file
├── bootstrap.cjs                 # Server bootstrap
└── package.json                  # Dependencies
```

## Database Schema (MongoDB Collections)

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  date_of_birth: Date,
  gender: String,
  address: String,
  
  // Geographic data
  state_of_origin_id: ObjectId,
  lga_of_origin_id: ObjectId,
  state_id: ObjectId,
  lga_id: ObjectId,
  ward_id: ObjectId,
  polling_unit_id: ObjectId,
  
  // NIN verification
  hashed_nin: String,
  nin_verified: Boolean,
  
  // Blockchain data (created after NIN verification - NOT USED FOR BLOCKCHAIN)
  user_unique_id: String,           // Generated voter ID (for identification only)
  contract_address: String,         // Generated wallet address (NOT USED)
  encrypted_private_key: String,    // Encrypted private key (NOT USED)
  is_voter_registered: Boolean,     // Voter registration status
  registration_completed: Boolean,  // Registration completion status
  
  // Voting status
  has_voted: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### Elections Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  election_type: String, // PRESIDENTIAL, GUBERNATORIAL, etc.
  start_date: Date,
  end_date: Date,
  status: String, // UPCOMING, ONGOING, COMPLETED, CANCELLED
  
  // Geographic scope
  state_id: ObjectId,
  lga_id: ObjectId,
  ward_id: ObjectId,
  polling_unit_id: ObjectId,
  
  // Candidates/Contestants
  contestants: [{
    id: String,
    name: String,
    party: String,
    party_picture: String,
    votes: Number,
    is_active: Boolean
  }],
  
  // Results
  total_votes: Number,
  created_at: Date,
  updated_at: Date
}
```

### Votes Collection
```javascript
{
  _id: ObjectId,
  voter_id: String,              // User's unique voter ID
  election_id: ObjectId,         // Election reference
  candidate_id: String,          // Candidate reference
  vote_position: Number,         // Vote position number
  transaction_hash: String,      // Fake transaction hash (NOT REAL BLOCKCHAIN)
  status: String,                // success, pending, failed
  vote_timestamp: Date,
  created_at: Date
}
```

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  first_name: String,
  last_name: String,
  role: String, // ADMIN
  is_active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### Observer Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  first_name: String,
  last_name: String,
  organization_name: String,
  organization_type: String,
  status: String, // pending, approved, rejected
  role: String, // OBSERVER
  is_active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

## Complete System Workflow

### 1. Admin Election Creation

**Process:**
1. **Admin Login**: Admin logs into admin panel (`/admin`)
2. **Election Form**: Fills out comprehensive election form with:
   - Title, description, election type
   - Start/end dates and times
   - Geographic scope (state, LGA, ward, polling unit)
   - Contestants (names, parties, pictures)
3. **Election Creation**: Clicks "Create Election"
4. **Database Storage**: Data stored in MongoDB `elections` collection
5. **Contestant Initialization**: Contestants initialized with 0 votes
6. **No Blockchain**: Pure database operation (no smart contract deployment - BLOCKCHAIN DISABLED)

**Key Features:**
- Comprehensive election management
- Geographic scope configuration
- Contestant management
- Real-time election status updates

### 2. User Registration and NIN Verification

**Step 1: Initial Registration**
- User fills registration form with personal details
- Provides geographic location data (state, LGA, ward, polling unit)
- **User created with:**
  - `nin_verified: false`
  - `user_unique_id: null`
  - `contract_address: null`
  - `registration_completed: false`
- **No voter ID or contract address yet**

**Step 2: User Login (Before NIN Verification)**
- User logs in successfully
- **System checks NIN verification status:**
  - If no NIN: redirects to `/verify-nin`
  - If NIN not verified: redirects to `/verify-nin`
  - If NIN verified: proceeds to dashboard

**Step 3: NIN Verification Process**
- User enters NIN on `/verify-nin` page
- **System automatically:**
  - Generates unique voter ID (`user_unique_id`)
  - Creates blockchain wallet address (`contract_address`)
  - Generates encrypted private key
  - Sets `nin_verified: true`
  - Sets `registration_completed: true`
  - Sets `is_voter_registered: true`
- **User can now vote**

### 3. Voting Process

**Step 1: Election Discovery**
- User visits `/elections` page
- Sees available elections with live results
- Can filter by state and election type
- Shows election status (UPCOMING, ONGOING, COMPLETED)

**Step 2: Vote Casting**
- User clicks "Vote" button on election card
- `VotingModal` component opens with 5-step process:
  1. **Verification**: Confirm voter identity
  2. **Ballot**: Choose candidate
  3. **Confirmation**: Review vote details
  4. **Submission**: Submit vote to backend
  5. **Success**: Show confirmation with vote position

**Step 3: Vote Submission**
- **Vote data sent to backend:**
  - `voter_id` (user's unique ID)
  - `election_id` (election reference)
  - `candidate_id` (selected candidate)
- **System generates:**
  - `vote_position` (sequential vote number)
  - `transaction_hash` (FAKE: `0x${Date.now().toString(16)}${Math.random().toString(16).substr(2, 8)}` - NOT REAL BLOCKCHAIN)
  - `status: 'success'`
- **Vote stored in `votes` collection**
- **Election vote counts updated in real-time**

**Step 4: Vote Confirmation**
- User sees success message
- Vote position number displayed
- Transaction hash shown
- Modal closes automatically

### 4. Live Results and Real-time Updates

**Real-time Results Display:**
- Results shown on `/elections` page and `/dashboard`
- **Data from MongoDB queries:**
  - Vote counts per candidate
  - Total votes cast
  - Election status and timing
- **Real-time updates via Polling:**
  - Elections page polls every 5 seconds
  - Vote position page polls every 3 seconds
  - Auto-refresh of election data

**Results Calculation:**
- Backend recalculates vote counts after each vote
- Updates `contestants` array in `elections` collection
- Updates `total_votes` field
- Results immediately available to all users

**Live Results Features:**
- Real-time vote count updates
- Leading candidate display
- Vote percentage calculations
- Election status indicators
- Geographic filtering

### 5. Vote History and Position Tracking

**Vote History Display:**
- User's vote history shown on `/dashboard` page (History tab)
- **Complex data matching process:**
  - Fetches `votedElections` (elections where user voted)
  - Fetches `myVotes` (user's vote records)
  - Matches votes to elections using multiple strategies
  - Matches candidates using multiple strategies

**Vote History Information:**
- Election title with "Voted" badge
- Candidate name and party (with party logo)
- Running mate information (if available)
- Vote timestamp
- **Vote position number** displayed as `#{vote_position}`
- "View Position" button (links to vote position page)

**Vote Position Tracking:**
- User can view their vote position on `/vote-position` page
- Shows detailed vote information by geographic level:
  - Polling Unit level
  - Ward level
  - LGA level
  - State level
- Displays transaction hash and blockchain details
- Shows vote verification status
- Real-time position updates via polling

### 6. Observer System

**Observer Registration:**
- Observers can apply via `/observer/apply`
- Submit organization details and credentials
- Admin approval required
- Status tracking (pending, approved, rejected)

**Observer Dashboard:**
- Read-only access to election data
- Live results monitoring
- Turnout analysis
- Report submission system
- Geographic filtering capabilities

### 7. Blockchain Integration (DISABLED - NOT IN USE)

**Smart Contract Features (DISABLED):**
- `Election.sol` contract for vote verification (NOT USED)
- Voter registration on blockchain (NOT USED)
- Vote casting with transaction hashes (NOT USED)
- Vote verification and immutability (NOT USED)
- Admin controls and election management (NOT USED)

**Blockchain Services (DISABLED):**
- `blockchainService.js` - Core blockchain operations (NOT USED)
- `blockchainEventService.js` - Event handling (NOT USED)
- Contract deployment scripts (NOT USED)
- Transaction monitoring (NOT USED)
- Vote verification on-chain (NOT USED)

**Blockchain Dashboard (DISABLED):**
- Real-time blockchain metrics (NOT USED)
- Transaction monitoring (NOT USED)
- Network status (NOT USED)
- Contract information (NOT USED)
- Vote verification status (NOT USED)

## Key Features

### Security Features
- **NIN Verification**: Required for voter registration
- **JWT Authentication**: Secure user sessions with token expiration
- **Password Hashing**: bcrypt encryption
- **Data Encryption**: NIN and private key encryption
- **Role-based Access**: Admin, voter, and observer permissions
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: Protection against brute force attacks

### Real-time Features
- **Live Results**: Real-time vote count updates
- **Polling Service**: Automatic data polling every 3-5 seconds
- **Auto-refresh**: Automatic data updates
- **Live Updates**: Real-time election data refresh
- **Position Tracking**: Real-time vote position updates

### User Experience
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Radix UI components with Tailwind CSS
- **Loading States**: User feedback during operations
- **Error Handling**: Comprehensive error management
- **Toast Notifications**: User feedback messages
- **Token Expiration**: Automatic session management

### Data Management
- **MongoDB**: Primary database for all operations
- **Real-time Queries**: Live data updates
- **Data Validation**: Input validation and sanitization
- **Error Recovery**: Robust error handling
- **Geographic Data**: Hierarchical location management

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Blockchain (DISABLED - NOT IN USE)
- **Ethereum**: Blockchain network (NOT USED)
- **Solidity**: Smart contract language (NOT USED)
- **Web3.js**: Blockchain interaction (NOT USED)
- **MetaMask**: Wallet integration (NOT USED)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/submit-nin` - NIN submission
- `GET /api/auth/nin-status` - NIN verification status
- `POST /api/auth/logout` - User logout

### Elections
- `GET /api/election/` - Get all elections
- `POST /api/election/` - Create election (admin)
- `GET /api/election/:id` - Get specific election
- `POST /api/election/:id/vote` - Cast vote
- `GET /api/election/:id/results` - Get election results

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/elections` - Get user's elections
- `GET /api/dashboard/votes` - Get user's votes

### Vote Position
- `GET /api/positions/:electionId` - Get vote positions
- `GET /api/positions/:electionId/:level` - Get level-specific positions

### Observer
- `POST /api/observer/apply` - Observer application
- `GET /api/observer/elections` - Observer's elections
- `POST /api/observer/reports` - Submit report

### Blockchain (DISABLED - NOT IN USE)
- `GET /api/blockchain/status` - Blockchain status (NOT USED)
- `POST /api/blockchain/register-voter` - Register voter (NOT USED)
- `GET /api/blockchain/transaction/:hash` - Get transaction details (NOT USED)

## System Status

**Current Implementation:**
- ✅ User registration and authentication
- ✅ NIN verification and wallet creation (for identification only)
- ✅ Election creation and management
- ✅ Voting system with database storage
- ✅ Live results and real-time updates
- ✅ Vote history and position tracking
- ✅ Admin dashboard and controls
- ✅ Observer dashboard and application
- ✅ Polling-based real-time updates
- ❌ Blockchain integration (DISABLED - NOT IN USE)
- ❌ Smart contract deployment (DISABLED - NOT IN USE)
- ❌ WebSocket real-time updates (DISABLED - NOT IN USE)

**Database Operations:**
- All core functionality uses MongoDB
- No blockchain transactions required (BLOCKCHAIN DISABLED)
- Real-time updates via polling (WebSocket DISABLED)
- Comprehensive data validation
- Fake transaction hashes for identification only

**What's Actually Working:**
- Complete voting system using MongoDB only
- NIN verification creates voter ID and wallet address (for identification)
- Real-time results via polling every 3-5 seconds
- Vote position tracking and history
- Admin and observer dashboards
- No actual blockchain integration

This system provides a complete voting solution using traditional database operations with no blockchain functionality.
