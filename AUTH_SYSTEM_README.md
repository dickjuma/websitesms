# Admin Authentication System

## Overview
The authentication system is fully integrated into the Next.js application and runs on the same port (3000/3001) as the main app. It uses JWT tokens stored in HTTP-only cookies for security.

## Features
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ 30-minute token expiry with refresh token support
- ✅ Rate limiting (5 attempts → 15-minute block)
- ✅ CSRF protection
- ✅ IP-based logging
- ✅ Secure middleware protection for `/admin/*` routes
- ✅ bcrypt password hashing
- ✅ Admin user management

## Environment Variables
The following are configured in `.env`:
```
JWT_SECRET=super-secret-jwt-key-change-in-production-2026
REFRESH_TOKEN_SECRET=super-secret-refresh-key-change-in-production-2026
JWT_EXPIRES_IN=30m
REFRESH_TOKEN_EXPIRES_IN=7d
```

## Admin User
An admin user has been created with:
- Email: `admin@smassystems.com`
- Password: `admin123`
- Name: `Administrator`

## Testing the System

### 1. Health Check
Visit: `http://localhost:3001/api/auth/health`

### 2. Login Flow
1. Go to: `http://localhost:3001/admin/login`
2. Login with: `admin@smassystems.com` / `admin123`
3. Should redirect to: `http://localhost:3001/admin/dashboard`

### 3. Protected Routes
- All `/admin/*` routes are protected
- Unauthenticated users are redirected to login
- Authenticated users can access admin dashboard

### 4. API Endpoints
- `POST /api/admin/login` - Login endpoint
- `POST /api/admin/logout` - Logout endpoint
- `POST /api/admin/refresh` - Token refresh
- `GET /api/admin/me` - Get current admin info

## Security Features
- HTTP-only, Secure, SameSite cookies
- JWT token validation on every request
- Rate limiting on login attempts
- CSRF protection with double-submit cookie
- Automatic token cleanup on logout
- Session expiry handling

## Deployment
The system is fully integrated into the Next.js app and will deploy automatically with the main application. No separate services or ports needed.

## File Structure
```
src/
├── middleware.ts                    # Route protection
├── lib/
│   ├── jwt-utils.ts                # JWT token management
│   └── admin-auth.ts               # Authentication utilities
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── layout.tsx              # Admin layout
│   │   └── client-layout.tsx       # Client-side auth guard
│   └── api/
│       └── admin/
│           ├── login/route.ts      # Login API
│           ├── logout/route.ts     # Logout API
│           ├── refresh/route.ts    # Token refresh
│           └── me/route.ts         # Admin info
```