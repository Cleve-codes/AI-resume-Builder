# Authentication Migration Guide: Moving from Custom Auth to Clerk

## Overview

This guide explains how to complete the migration from your custom JWT authentication system to Clerk. 

## What's Already Done

1. ✅ **Clerk SDK Setup**: The Clerk SDK has been installed and configured
2. ✅ **Middleware**: Clerk's middleware is properly set up with the correct public routes
3. ✅ **Sign-In/Sign-Up Pages**: Clerk's authentication pages are implemented
4. ✅ **UserButton and UI**: Clerk's user components are integrated in headers
5. ✅ **Auth Providers**: ClerkProvider is wrapping the application

## What Needs to Be Done

### 1. Remove Old Authentication API Routes

The old authentication API routes are no longer needed:

- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/logout`
- `/api/auth/me` 
- `/api/auth/google`
- `/api/auth/resend-verification`
- `/api/auth/verify-email`

You can use the `cleanup-auth.sh` script to remove these routes.

### 2. Update or Remove Pages That Use the Old Auth System

These pages still use the old auth system and should be updated or removed:

- `/app/verify-email` - Either update to use Clerk's email verification or remove
- `/app/login` - Can be removed (you're using Clerk's `/sign-in` route now)
- `/app/signup` - Can be removed (you're using Clerk's `/sign-up` route now)

### 3. Handle the Auth Context

The `lib/context/auth-context.tsx` file is currently imported by:

- `/app/verify-email/page.tsx`
- `/app/login/page.tsx`
- `/app/signup/page.tsx`
- `/app/dashboard/page.tsx`
- `/app/dashboard/profile/fixed/FixedProfilePage.tsx`
- `/app/dashboard/profile/page.tsx`

You have two options:
1. **Remove the context completely** if you're going to fully migrate all components to use Clerk
2. **Create a compatibility layer** that implements the same interface but uses Clerk underneath

### 4. Enhancing the Webhook Implementation

The webhook at `/api/webhook/clerk/route.ts` needs to be enhanced to:

1. Create/update users in your database when Clerk users are created/updated
2. Link Clerk user IDs with your existing user records

### 5. Updating User Profile Management

Update your profile pages to use Clerk's user data or sync it with your database:

```typescript
// Example of using Clerk data in a profile page
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.fullName}</p>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
      {/* Other profile data */}
    </div>
  );
}
```

## Executing the Cleanup

1. Run the cleanup script:
   ```bash
   bash cleanup-auth.sh
   ```

2. Review the output and check the files that need manual updates

3. Update or remove the components that still use the old auth system

4. Test the application thoroughly to ensure the auth flow works correctly

## Common Issues

- **Email Verification**: Clerk handles email verification differently, make sure to update any components that relied on your custom verification system
- **User Profile Data**: Ensure you either migrate user data to Clerk or sync it between Clerk and your database
- **Protected Routes**: Double-check that your protected routes are properly secured with Clerk

## Next Steps

After completing the migration:

1. Update environment variables in production
2. Set up webhook secrets for Clerk
3. Monitor authentication errors to ensure the transition is smooth
4. Consider implementing a data migration path for existing users 