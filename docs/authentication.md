# Authentication System

This document explains how the authentication system works in the Resume Builder application and provides troubleshooting guidance for common issues.

## Architecture

The authentication system is built using:
- JWT (JSON Web Tokens) for stateless authentication
- Cookie-based token storage
- Next.js middleware for route protection
- Server-side API routes for token verification
- Client-side context provider for auth state management

## Authentication Flow

### Registration Flow
1. User submits registration form to `/api/auth/register`
2. Server validates input and checks for existing users
3. If valid, password is hashed and user is created in database
4. User is redirected to `/login?registered=true`
5. Login page displays success message

### Login Flow
1. User submits login form to `/api/auth/login`
2. Server authenticates user credentials
3. On success, server generates JWT token and sets it as an HTTP-only cookie
4. User is redirected to `/dashboard` or a callback URL if provided
5. Dashboard verifies authentication state before displaying content

### Authentication Verification
1. **Middleware Layer**: 
   - Checks for token existence in cookies
   - Redirects unauthenticated users from protected routes to login
   - Redirects authenticated users from auth pages to dashboard

2. **Server-Side Layer**:
   - API routes verify token validity using JWT verification
   - Handles token expiration and validation errors
   - Provides user data through `/api/auth/me` endpoint

3. **Client-Side Layer**:
   - Auth context manages user state across the application
   - Provides login, register, and logout functionality
   - Handles redirection based on authentication status

## Protected Routes

The following routes require authentication:
- `/dashboard` - User dashboard
- `/resumes` - Resume management
- `/profile` - User profile
- `/settings` - User settings

## Troubleshooting

### Common Issues

#### Login Not Redirecting to Dashboard
- **Check**: Browser console for errors
- **Check**: Network tab to verify login API response is 200
- **Check**: Cookie is being set properly in Application tab
- **Solution**: Clear cookies and cache, then try again

#### "Not Authenticated" Errors
- **Cause**: Token missing or invalid
- **Solution**: Log out and log back in
- **Solution**: Check if token cookie is present in browser

#### Edge Runtime Errors
- **Cause**: Node.js crypto module not supported in middleware
- **Solution**: Ensure middleware is not using jsonwebtoken verification

### Debugging

For debugging authentication issues:
1. Check browser console logs
2. Inspect network requests to authentication endpoints
3. Verify cookies in browser's Application tab
4. Check server logs for middleware messages
5. Run the debug-auth.js script for diagnostic information

```javascript
// Example of checking authentication status in browser console
async function checkAuth() {
  const res = await fetch('/api/auth/me');
  console.log(await res.json());
}
checkAuth();
```

## Security Considerations

- JWT tokens are stored in HTTP-only cookies to prevent JavaScript access
- Passwords are hashed using bcrypt before storage
- Token verification happens server-side for secure validation
- Sensitive routes are protected by middleware
- Token expiration is set to 7 days by default

## Future Improvements

- Implement refresh tokens for better security
- Add social authentication options (Google, GitHub)
- Implement role-based access control
- Add multi-factor authentication 