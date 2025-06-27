# Authentication System Backend

A secure, production-ready authentication system built with Node.js, Express, TypeScript, and MySQL.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Input Validation**: Comprehensive request validation using Zod schemas
- **Role-Based Access Control**: Support for user roles (USER, ADMIN)
- **Error Handling**: Centralized error handling with consistent API responses
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for security headers
- **Database ORM**: Prisma for type-safe database operations
- **TypeScript**: Full TypeScript support for better development experience

## 📋 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user info | Yes |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| GET | `/api/auth/admin-only` | Admin-only test route | Yes (Admin) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd auth-system-backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="mysql://username:password@localhost:3306/auth_db"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
BCRYPT_SALT_ROUNDS=12
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── config/
│   ├── database.ts      # Prisma client configuration
│   └── index.ts         # App configuration
├── controllers/
│   └── authController.ts # Authentication controllers
├── middleware/
│   ├── auth.ts          # JWT authentication middleware
│   ├── errorHandler.ts  # Error handling middleware
│   └── validation.ts    # Request validation middleware
├── routes/
│   ├── authRoutes.ts    # Authentication routes
│   └── index.ts         # Route aggregation
├── services/
│   └── authService.ts   # Authentication business logic
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   ├── jwt.ts           # JWT utilities
│   └── password.ts      # Password utilities
├── validation/
│   └── schemas.ts       # Zod validation schemas
├── app.ts               # Express app configuration
└── server.ts            # Server startup
```

## 🔑 API Usage Examples

### User Registration

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "StrongPass123!"
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "StrongPass123!"
  }'
```

### Get Current User (Protected Route)

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using Zod
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for security headers
- **CORS Configuration**: Configurable CORS settings
- **Role-Based Access**: Support for different user roles

## 📝 Password Requirements

- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character (@$!%*?&)

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "field": "field_name",
    "message": "Specific error message"
  }
}
```

## 🧪 Database Schema

```sql
CREATE TABLE users (
  id VARCHAR(191) NOT NULL PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password VARCHAR(191) NOT NULL,
  role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL
);
```

## 📦 Dependencies

### Production Dependencies

- **@prisma/client**: Database ORM client
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **express**: Web framework
- **express-rate-limit**: Rate limiting middleware
- **helmet**: Security headers
- **jsonwebtoken**: JWT implementation
- **zod**: Schema validation

### Development Dependencies

- **@types/***: TypeScript type definitions
- **nodemon**: Development server
- **prisma**: Database toolkit
- **ts-node**: TypeScript execution
- **typescript**: TypeScript compiler

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🌟 Bonus Features Implemented

- **Role-based Authorization**: Admin and User roles with middleware
- **Password Reset Flow**: Basic password reset request handler
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Comprehensive security middleware
- **Graceful Shutdown**: Proper server shutdown handling

## 📄 License

This project is licensed under the MIT License.
