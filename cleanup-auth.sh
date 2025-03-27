#!/bin/bash

# Script to clean up old authentication code after migrating to Clerk
echo "Starting cleanup of old authentication system..."

# 1. Remove old auth API routes
echo "Removing old auth API routes..."
rm -rf app/api/auth/login
rm -rf app/api/auth/register
rm -rf app/api/auth/logout
rm -rf app/api/auth/me
rm -rf app/api/auth/google
rm -rf app/api/auth/resend-verification
rm -rf app/api/auth/verify-email

# 2. Remove old auth context if no longer used
echo "Checking if auth context can be removed..."
if [ -f lib/context/auth-context.tsx ]; then
  echo "Found auth-context.tsx, you might want to review this manually"
  echo "It's referenced in some files, so check if those files are still needed"
fi

# 3. Remove old login/signup pages if they exist
echo "Checking for old login/signup pages..."
if [ -d app/login ]; then
  echo "Removing old login page..."
  rm -rf app/login
fi

if [ -d app/signup ]; then
  echo "Removing old signup page..."
  rm -rf app/signup
fi

# 4. List files that might need manual updating
echo "The following files reference the old auth context and might need manual updates:"
grep -r "useAuth" --include="*.tsx" --include="*.ts" app/ | sed 's/:.*$//'

# 5. Check if verify-email page still exists and might need updates
if [ -d app/verify-email ]; then
  echo "The verify-email page still exists. You should check if it needs to be updated or removed."
fi

echo "Cleanup completed. Please review the listed files manually to ensure they're updated for Clerk."
echo "Remember to test your application thoroughly after these changes!" 