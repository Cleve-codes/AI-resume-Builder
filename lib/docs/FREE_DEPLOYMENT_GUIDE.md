# AI Resume Builder: Free Deployment Guide

This guide provides detailed instructions on how to deploy the AI Resume Builder application using free hosting services. We'll cover preparing your application, database setup, and deployment options that are cost-effective.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Application Overview](#application-overview)
3. [Preparing for Deployment](#preparing-for-deployment)
4. [PostgreSQL Database Deployment Options](#postgresql-database-deployment-options)
5. [Frontend and Backend Deployment](#frontend-and-backend-deployment)
6. [Image and Asset Storage](#image-and-asset-storage)
7. [Environment Variables Configuration](#environment-variables-configuration)
8. [Next.js App Router Considerations](#nextjs-app-router-considerations)
9. [Continuous Integration/Deployment](#continuous-integrationdeployment)
10. [Post-Deployment Verification](#post-deployment-verification)
11. [Free Hosting Limitations and Considerations](#free-hosting-limitations-and-considerations)

## Prerequisites

Before you begin deployment, ensure you have the following:

- GitHub account
- Node.js and npm installed on your local machine
- Git installed on your local machine
- A free account on your chosen deployment platform (Vercel, Netlify, or Railway)
- A free PostgreSQL database hosting account (Supabase, Neon, or Railway)
- A free file storage solution (Cloudinary, Supabase Storage, or AWS S3)

## Application Overview

The AI Resume Builder is a Next.js application with the following key components:

- **Frontend**: Next.js 14 with React and Tailwind CSS
- **Backend**: Next.js API routes using the App Router architecture
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js for user authentication
- **File Storage**: Needs a solution for resume template assets and user uploads

## Preparing for Deployment

1. **Optimize your application**:

   ```bash
   # Install dependencies if you haven't already
   npm install

   # Build the application to ensure there are no errors
   npm run build
   ```

2. **Update your Prisma schema for production**:
   
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Create a migration for production
   npx prisma migrate deploy
   ```

3. **Create a production branch** (optional but recommended):

   ```bash
   git checkout -b production
   git push -u origin production
   ```

## PostgreSQL Database Deployment Options

Since the application is configured to use PostgreSQL, we'll focus on free hosting options for PostgreSQL databases.

### Option 1: Supabase (Recommended Free PostgreSQL)

Supabase offers a generous free tier with PostgreSQL databases:

1. Sign up for a [Supabase account](https://supabase.io/)
2. Create a new project (free tier)
3. Navigate to the "Settings > Database" section
4. Find your PostgreSQL connection string
5. Update your `.env` file with the Supabase connection string:

   ```
   DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```

6. Set up the schema in Supabase:

   ```bash
   # Deploy migrations to your Supabase PostgreSQL database
   npx prisma db push
   ```

### Option 2: Neon (PostgreSQL, Serverless)

Neon offers a free tier with serverless PostgreSQL:

1. Sign up for a [Neon account](https://neon.tech/)
2. Create a new project
3. Get your connection string from the dashboard
4. Update your `.env` file with the Neon connection string:

   ```
   DATABASE_URL="postgres://[USER]:[PASSWORD]@[ENDPOINT]/[DATABASE]?sslmode=require"
   ```

5. Deploy your Prisma schema:

   ```bash
   npx prisma db push
   ```

### Option 3: Railway (All-in-One Platform)

Railway can host both your application and PostgreSQL database:

1. Sign up for a [Railway account](https://railway.app/)
2. Create a new project
3. Add a PostgreSQL database from the "New" button
4. Get your connection details from the "Connect" tab
5. Update your `.env` file with the Railway connection string:

   ```
   DATABASE_URL="postgresql://postgres:[PASSWORD]@containers-us-west-[XX].railway.app:[PORT]/railway"
   ```

## Frontend and Backend Deployment

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest option for deploying Next.js applications, with a generous free tier:

1. Sign up for a [Vercel account](https://vercel.com/signup)
2. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

3. Prepare your application by pushing to GitHub, or deploy directly:

   ```bash
   # Login to Vercel
   vercel login

   # Deploy (run from your project root)
   vercel
   ```

4. Follow the prompts to link your project and deploy
5. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add all required environment variables, including DATABASE_URL

**Alternative: GitHub Integration**

1. Go to the Vercel dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (typically auto-detected for Next.js)
5. Add your environment variables
6. Deploy

### Option 2: Railway (All-in-One Solution)

Railway offers a free tier that can host both your application and PostgreSQL database:

1. Sign up for a [Railway account](https://railway.app/)
2. Create a new project
3. Add your GitHub repository
4. Add a PostgreSQL database service to the same project
5. Railway will automatically configure the DATABASE_URL environment variable
6. Add any other required environment variables
7. Deploy

## Image and Asset Storage

The AI Resume Builder requires storage for resume template thumbnails and possibly user-uploaded profile images. Here are free options for file storage:

### Option 1: Cloudinary (Recommended for Images)

Cloudinary offers a generous free tier specifically optimized for images:

1. Sign up for a [Cloudinary account](https://cloudinary.com/users/register/free)
2. Get your Cloudinary credentials (cloud name, API key, and API secret)
3. Add to your `.env` file:

   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Install the Cloudinary SDK:

   ```bash
   npm install cloudinary
   ```

5. Create a helper file `lib/cloudinary.ts` to handle uploads:

   ```typescript
   import { v2 as cloudinary } from 'cloudinary';
   
   cloudinary.config({
     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });
   
   export { cloudinary };
   ```

6. Use in your API route:

   ```typescript
   import { cloudinary } from '@/lib/cloudinary';
   
   export async function POST(request: Request) {
     try {
       const formData = await request.formData();
       const file = formData.get('file') as File;
       
       // Convert the file to a buffer
       const arrayBuffer = await file.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       
       // Convert buffer to base64
       const base64String = buffer.toString('base64');
       
       // Upload to Cloudinary
       const result = await new Promise((resolve, reject) => {
         cloudinary.uploader.upload(
           `data:${file.type};base64,${base64String}`,
           {
             folder: 'resume-templates',
           },
           (error, result) => {
             if (error) reject(error);
             else resolve(result);
           }
         );
       });
       
       return Response.json({ success: true, url: result.secure_url });
     } catch (error) {
       console.error('Error uploading to Cloudinary:', error);
       return Response.json({ success: false, error: 'Upload failed' }, { status: 500 });
     }
   }
   ```

### Option 2: Supabase Storage

If you're already using Supabase for your database, their Storage service is a convenient option:

1. In your Supabase project, navigate to "Storage"
2. Create a new bucket (e.g., "resume-templates")
3. Set the appropriate public/private access policies
4. Add to your `.env` file:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Install the Supabase client:

   ```bash
   npm install @supabase/supabase-js
   ```

6. Create a helper file `lib/supabase.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

7. Use in your API route:

   ```typescript
   import { supabase } from '@/lib/supabase';
   
   export async function POST(request: Request) {
     try {
       const formData = await request.formData();
       const file = formData.get('file') as File;
       
       // Create a unique filename
       const fileName = `${Date.now()}-${file.name}`;
       
       // Convert the file to a buffer
       const arrayBuffer = await file.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       
       // Upload to Supabase Storage
       const { data, error } = await supabase.storage
         .from('resume-templates')
         .upload(fileName, buffer, {
           contentType: file.type,
         });
       
       if (error) throw error;
       
       // Get the public URL
       const { data: urlData } = supabase.storage
         .from('resume-templates')
         .getPublicUrl(data.path);
       
       return Response.json({ success: true, url: urlData.publicUrl });
     } catch (error) {
       console.error('Error uploading to Supabase Storage:', error);
       return Response.json({ success: false, error: 'Upload failed' }, { status: 500 });
     }
   }
   ```

### Option 3: AWS S3 (with Free Tier)

AWS offers a free tier that includes S3 storage:

1. Create an [AWS account](https://aws.amazon.com/)
2. Set up an S3 bucket with appropriate CORS settings
3. Create IAM credentials with limited S3 access
4. Add to your `.env` file:

   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   AWS_S3_BUCKET_NAME=your_bucket_name
   ```

5. Install the AWS SDK:

   ```bash
   npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
   ```

6. Use in your application to generate pre-signed URLs or direct uploads.

### Seeding Initial Template Images

After setting up your storage solution, you'll need to upload and seed your template thumbnails:

1. Create a script to upload images to your storage provider
2. Update the template records in your database with the correct URLs
3. Add the script to your deployment workflow if needed

## Environment Variables Configuration

For any platform, you'll need to configure these essential environment variables:

```
# Database
DATABASE_URL=your_postgresql_connection_string

# NextAuth
NEXTAUTH_URL=your_deployed_url (e.g., https://your-app.vercel.app)
NEXTAUTH_SECRET=a_random_string_for_session_encryption

# Authentication (if you're using specific providers)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
# Add other authentication providers as needed

# Storage (if used)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Or Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Or AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
```

## Next.js App Router Considerations

The AI Resume Builder uses Next.js App Router architecture, which requires some specific considerations for deployment:

### 1. Route Handlers vs API Routes

In App Router, we use Route Handlers instead of traditional API Routes. Ensure all your API endpoints follow this pattern:

```
app/api/[endpoint]/route.ts
```

### 2. Server Components vs Client Components

Our application uses a mix of Server and Client Components:

- **Server Components**: Make sure they don't import client-side only libraries
- **Client Components**: These must have the `"use client"` directive at the top

### 3. Cache Considerations

Next.js App Router has built-in caching mechanisms. For deployment:

- **Static Routes**: Will be cached at build time and served from CDN
- **Dynamic Routes**: Use `export const dynamic = 'force-dynamic'` to prevent caching
- **API Routes**: Add appropriate cache headers depending on the data

### 4. Middleware Configuration

If your application uses Next.js middleware (in `middleware.ts`), ensure it's properly configured for production:

```typescript
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### 5. Environment Variables in App Router

In Next.js App Router, environment variables work differently:

- **Server Components**: Can access all environment variables
- **Client Components**: Can only access variables prefixed with `NEXT_PUBLIC_`

Make sure to structure your environment variables accordingly:

```env
# Server-side only
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret

# Available in client components
NEXT_PUBLIC_APP_URL=https://your-app-url.com
```

## Deploying with Prisma to PostgreSQL

To properly deploy your Prisma schema to your PostgreSQL database:

1. **Update your database connection**:
   - Ensure your `.env` file contains the correct DATABASE_URL for your chosen hosting provider

2. **Generate the Prisma client**:
   ```bash
   npx prisma generate
   ```

3. **Deploy the schema**:
   ```bash
   # For a first deployment or development
   npx prisma db push

   # For production with migrations
   npx prisma migrate deploy
   ```

4. **Seed initial data (if needed)**:
   ```bash
   npx prisma db seed
   ```

## Continuous Integration/Deployment

For continuous deployment with GitHub:

1. Connect your repository to your deployment platform
2. Configure auto-deployment from the main or production branch
3. Add a basic GitHub workflow in `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [ main, production ]
  pull_request:
    branches: [ main, production ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
```

## Post-Deployment Verification

After deployment, verify the following:

1. Open your deployed application URL
2. Test user registration and login
3. Verify resume creation and editing
4. Check template selection and application
5. Ensure database connections are working properly:
   - Create a new user account
   - Create a resume
   - Verify data is being saved to the database
6. Verify all API endpoints are functioning properly
7. Test both server and client components functionality
8. Check template thumbnail loading and any image uploads

## Free Hosting Limitations and Considerations

When using free tiers, be aware of these limitations:

### Vercel Free Tier
- Soft bandwidth limits (100GB/month)
- Limited serverless function execution duration (10-15 seconds)
- Limited build minutes per month
- Reduced Edge Function capacity

### Supabase Free Tier
- 500MB database storage
- Limited database connections
- 2GB bandwidth per month
- 1GB storage for Supabase Storage

### Cloudinary Free Tier
- 25GB storage
- 25GB monthly bandwidth
- Limited transformations

### Neon Free Tier
- Limited storage capacity
- Connection limits
- Compute resources limitations

### Railway Free Tier
- $5 credit per month
- Limited usage time
- Limited database storage

### General Strategies for Free Tiers
1. **Implement caching** wherever possible to reduce database calls
2. **Optimize database queries** with proper indexing
3. **Use connection pooling** to efficiently manage database connections
4. **Implement lazy loading** for non-critical application parts
5. **Consider a hybrid approach**: Free for development/testing, paid for production
6. **Optimize server components** to reduce server-side computation
7. **Optimize image storage** by using appropriate formats and sizes

## Troubleshooting Common Deployment Issues

### PostgreSQL Connection Issues
- Verify connection strings are correctly formatted
- Check if your IP is allowed to connect to the database
- Ensure SSL requirements are met in the connection string
- Verify the Prisma provider in schema.prisma is set to "postgresql"

### Build Failures
- Check for environment variables that may be missing
- Verify Node.js version compatibility
- Review dependency issues in package.json
- Look for "use client" directive issues in client components

### Authentication Problems
- Confirm NEXTAUTH_URL is set correctly
- Verify auth provider credentials
- Check callback URLs in auth provider dashboards

### File Storage Issues
- Check CORS configurations if uploading directly from the client
- Verify API keys and secrets are correctly set
- Check bucket/folder permissions
- Ensure file size limits are respected

### Prisma Issues
- Ensure Prisma Client is generated for deployment
- Check for schema compatibility issues with PostgreSQL version
- Verify migrations have been applied correctly

### App Router Specific Issues
- Server vs Client component errors (forgetting "use client" directives)
- Data fetching issues in Server Components
- Route Handler errors (incorrect export formats)
- Client-side navigation issues

---

By following this guide, you should be able to deploy your AI Resume Builder application using free tier services. As your user base grows, you can selectively upgrade components that require more resources.

Remember to regularly backup your database and monitor your application's performance to ensure a smooth user experience. 