# Email Verification System Documentation

This document explains how the email verification system works and how to configure it for your environment.

## Overview

The email verification system works as follows:

1. When a user registers, a verification token is generated and stored in the database
2. A verification email is sent to the user's email address containing a link with the token
3. The user clicks the link and is directed to the verification page 
4. The verification page verifies the token and marks the user's email as verified
5. The user can now log in and access protected routes

## Schema Changes

The `User` model has been updated with the following fields:

```prisma
// User model
model User {
  id                   String    @id @default(cuid())
  email                String    @unique
  password             String    // Hashed password
  // ...other fields...
  
  // Email verification fields
  emailVerified        Boolean   @default(false)
  verificationToken    String?   @unique
  verificationTokenExpiry DateTime?
}
```

## Email Configuration

To configure the email service, you'll need to set the following environment variables in your `.env` file:

```env
# Email server configuration
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_username
EMAIL_SERVER_PASSWORD=your_password
EMAIL_SERVER_SECURE=false
EMAIL_FROM=noreply@example.com

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Email Provider Options

You can use any SMTP provider for sending emails, such as:

- **Gmail**: `smtp.gmail.com` (port 587)
- **SendGrid**: `smtp.sendgrid.net` (port 587)
- **Mailgun**: `smtp.mailgun.org` (port 587)
- **AWS SES**: `email-smtp.us-east-1.amazonaws.com` (port 587)

## Protected Routes

All routes under these paths require email verification:

- `/dashboard`
- `/resumes`
- `/settings`
- `/profile`

## Testing the Email Verification

For local development without a real SMTP server, you can use tools like:

1. **Mailhog**: A local development mail server
   - Install with Docker: `docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog`
   - Configure your `.env` file:
     ```
     EMAIL_SERVER_HOST=localhost
     EMAIL_SERVER_PORT=1025
     EMAIL_SERVER_USER=
     EMAIL_SERVER_PASSWORD=
     EMAIL_SERVER_SECURE=false
     ```
   - Access the web interface at http://localhost:8025

2. **Ethereal**: A fake SMTP service for testing
   - Visit https://ethereal.email/ to create a test account
   - Use the provided credentials in your `.env` file

## API Endpoints

The system includes the following API endpoints:

- `POST /api/auth/register`: Creates a new user and sends a verification email
- `POST /api/auth/verify-email`: Verifies a user's email using the token
- `POST /api/auth/resend-verification`: Resends the verification email
- `POST /api/auth/login`: Checks if the email is verified before allowing login

## Email Verification Workflow

1. **Registration**: When a user registers, a verification token is generated and stored in the database. A verification email is sent to the user.

2. **Verification**: The user clicks the link in the email, which directs them to the verification page with the token as a query parameter. The page calls the API to verify the token.

3. **Login**: When a user attempts to login, the system checks if their email is verified. If not, the login is rejected and the user is directed to the verification page.

4. **Resending Verification**: Users can request a new verification email if they didn't receive the original or if the token has expired.

## Security Considerations

- Tokens expire after 24 hours
- Tokens are securely generated using `crypto.randomBytes()`
- Email addresses are case-insensitive for verification purposes
- The system doesn't reveal whether an email exists when resending verification
- Verification tokens are unique per user 