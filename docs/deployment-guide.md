# AI Resume Builder Deployment Guide

This guide provides step-by-step instructions for deploying the AI Resume Builder application using free hosting services. The deployment process is divided into several sections covering database setup, authentication, file storage, and application hosting.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Deployment (Neon)](#database-deployment-neon)
3. [Authentication Setup (Auth.js with Google Provider)](#authentication-setup-authjs-with-google-provider)
4. [File Storage (Cloudinary)](#file-storage-cloudinary)
5. [Application Deployment (Vercel)](#application-deployment-vercel)
6. [Environment Variables Configuration](#environment-variables-configuration)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Prerequisites

Before starting the deployment process, ensure you have:

- GitHub account (for source code hosting)
- Google account (for authentication provider)
- Node.js and npm installed locally (for testing)
- Basic familiarity with command line operations

## Database Deployment (Neon)

Neon offers a free tier PostgreSQL database that works well with Prisma and has a generous free plan.

1. **Create a Neon Account**
   - Sign up at [Neon](https://neon.tech/)
   - Verify your email address

2. **Create a New Project**
   - Click "New Project"
   - Name it `ai-resume-builder` (or your preferred name)
   - Select the closest region to your target users
   - The free tier will be selected by default

3. **Get Connection String**
   - Once your project is created, you'll see a connection string
   - Save this connection string securely
   - It should look like: `postgresql://user:password@endpoint/database`

4. **Configure Database Schema**
   - Update your Prisma schema provider in `schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Add the connection string to your `.env` file:
     ```
     DATABASE_URL="postgresql://user:password@endpoint/database"
     ```
   - Push your schema to Neon:
     ```bash
     npx prisma db push
     ```

5. **Seed Initial Data (Optional)**
   - Run your seed script to populate initial data:
     ```bash
     npx prisma db seed
     ```

6. **Enable Connection Pooling (Recommended)**
   - Neon offers connection pooling which is useful for serverless environments like Vercel
   - In your Neon dashboard, go to "Connection Pooling"
   - Enable the pooler and note the new connection string
   - For production, use the pooled connection string in your environment variables

## Authentication Setup (Auth.js with Google Provider)

1. **Create Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as the application type
   - Add your local development URL (http://localhost:3000) and production URL (https://your-app-name.vercel.app) to the "Authorized JavaScript origins"
   - Add the following to "Authorized redirect URIs":
     - http://localhost:3000/api/auth/callback/google
     - https://your-app-name.vercel.app/api/auth/callback/google
   - Click "Create" and save your Client ID and Client Secret

2. **Configure Auth.js Environment Variables**
   - Add the following to your `.env` file:
     ```
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-generated-secret-key
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```
   - Generate a secure random string for NEXTAUTH_SECRET:
     ```bash
     openssl rand -base64 32
     ```

## File Storage (Cloudinary)

Cloudinary offers a free tier for image and file storage.

1. **Create a Cloudinary Account**
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Verify your email address

2. **Configure Cloudinary**
   - From your dashboard, note your Cloud name, API Key, and API Secret
   - Add the following to your `.env` file:
     ```
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```

3. **Create Upload Presets**
   - Go to Settings > Upload
   - Create a new upload preset for resume files
   - Set it to "Unsigned" for client-side uploads
   - Configure any image transformations or restrictions

## Application Deployment (Vercel)

Vercel offers a free tier for Next.js applications with serverless functions.

1. **Prepare Your Repository**
   - Ensure your code is pushed to a GitHub repository
   - Make sure your `.gitignore` file excludes:
     - `node_modules`
     - `.env`
     - `.env.local`
     - `.next`

2. **Create a Vercel Account**
   - Sign up at [Vercel](https://vercel.com/) (preferably using your GitHub account)

3. **Import Your Repository**
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

4. **Configure Environment Variables**
   - Add all the environment variables from your `.env` file
   - Update `NEXTAUTH_URL` to your production URL
   - Add the production database connection string from PlanetScale

5. **Deploy Your Application**
   - Click "Deploy"
   - Wait for the build and deployment to complete
   - Your application will be available at `https://your-app-name.vercel.app`

## Environment Variables Configuration

Ensure all these environment variables are configured in Vercel:

```
# Database
DATABASE_URL=your-neon-connection-string

# Authentication
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-generated-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Post-Deployment Verification

After deployment, verify that:

1. **Authentication Works**
   - Test login with Google
   - Verify that user sessions persist

2. **Database Operations Function**
   - Create a test resume
   - Verify data is saved and retrieved correctly

3. **File Uploads Work**
   - Test uploading a resume file
   - Verify the file is stored in Cloudinary

4. **All Pages Load Correctly**
   - Test navigation through the application
   - Verify that all pages render without errors

## Troubleshooting Common Issues

### Database Connection Issues

- **Error**: Unable to connect to database
- **Solution**: Verify your connection string and ensure you're using the correct Neon connection URL format

### Authentication Errors

- **Error**: Redirect URI mismatch
- **Solution**: Double-check that your authorized redirect URIs in Google Cloud Console match your actual application URLs

### File Upload Problems

- **Error**: Files not uploading to Cloudinary
- **Solution**: Verify your Cloudinary credentials and upload preset configuration

### Serverless Function Timeouts

- **Error**: API routes timing out
- **Solution**: Optimize database queries and ensure operations complete within the serverless function time limit (10 seconds on Vercel's free tier)

### Build Failures

- **Error**: Build failing on Vercel
- **Solution**: Check build logs for specific errors, ensure all dependencies are properly installed

## Scaling Considerations

While the free tiers are sufficient for development and low-traffic applications, consider these limitations:

- **Neon**: 3GB storage, unlimited projects, limited compute hours (generous free tier)
- **Vercel**: Limited serverless function execution time and bandwidth
- **Cloudinary**: Limited storage and transformations

As your application grows, you may need to upgrade to paid plans or implement caching strategies to optimize performance.

## Regular Maintenance

Establish a maintenance routine:

1. Regularly update dependencies
2. Monitor error logs in Vercel
3. Back up your database regularly
4. Test the application after major updates

---

This deployment guide covers the basic setup for a production environment using free services. For a more robust production deployment, consider additional services for monitoring, logging, and scaling.
