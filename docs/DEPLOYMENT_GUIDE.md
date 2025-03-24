# AI Resume Builder: Deployment Guide

This guide outlines the steps to deploy the AI Resume Builder application to production.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Setting up Vercel](#setting-up-vercel)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Monitoring and Logging](#monitoring-and-logging)
7. [Security Best Practices](#security-best-practices)
8. [Scaling and Performance](#scaling-and-performance)
9. [Post-Deployment Tasks](#post-deployment-tasks)
10. [Rollback Strategy](#rollback-strategy)

---

## Pre-Deployment Checklist

Before deploying to production, make sure to complete the following:

- [ ] Run all tests (unit, integration, end-to-end)
- [ ] Audit dependencies for security vulnerabilities (`npm audit`)
- [ ] Optimize bundle size (`npm run build` and analyze output)
- [ ] Check for memory leaks and performance issues
- [ ] Ensure all environment variables are properly configured
- [ ] Set up SSL certificates
- [ ] Configure proper CORS settings
- [ ] Create database backup strategy
- [ ] Document API endpoints

## Environment Configuration

### 1. Production Environment Variables

Create a production `.env` file with the following variables:

```
# App
NEXT_PUBLIC_APP_URL=https://yourproductiondomain.com

# Database
DATABASE_URL=your_production_database_connection_string

# Authentication
NEXTAUTH_URL=https://yourproductiondomain.com
NEXTAUTH_SECRET=your_nextauth_secret_key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Email
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=noreply@yourproductiondomain.com

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Job APIs
JOB_API_KEY=your_job_api_key
JOB_API_URL=https://job-api-provider.com/api/v1
```

### 2. Secrets Management

For production, never store secrets in your codebase or `.env` files that are committed to version control. Instead:

1. **Vercel**: Use the Environment Variables section in your project settings
2. **Other platforms**: Use a secrets management service like AWS Secrets Manager or HashiCorp Vault

### 3. Vercel Environment Configuration

In your Vercel project dashboard:

1. Go to "Settings" > "Environment Variables"
2. Add all the required environment variables
3. Specify which variables should be exposed to the browser (prefix with `NEXT_PUBLIC_`)
4. Set environment-specific values if needed (development, preview, production)

## Database Setup

### 1. Production Database Setup

1. Create a production PostgreSQL database (recommended options):
   - Vercel PostgreSQL
   - Supabase
   - Railway
   - Neon
   - AWS RDS
   - Digital Ocean Managed Database

2. Configure connection pooling for better performance

3. Set up regular backups (at least daily)

### 2. Database Migration

Deploy your Prisma schema to production:

```bash
npx prisma migrate deploy
```

This command will:
- Apply all pending migrations
- Not prompt for confirmation (suitable for CI/CD environments)
- Create the database if it doesn't exist (on providers that support this)

### 3. Initial Seed Data

If you need initial data in your production database:

```bash
npx prisma db seed
```

Make sure your `package.json` includes the seed script:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

## Setting up Vercel

Vercel is the recommended hosting platform for Next.js applications:

### 1. Create a Vercel Account

1. Sign up at [vercel.com](https://vercel.com/)
2. Connect your GitHub, GitLab, or Bitbucket account

### 2. Import Your Repository

1. Click "Add New..." > "Project"
2. Select your AI Resume Builder repository
3. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or your project root)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

### 3. Configure Build Settings

1. In "Settings" > "Build & Development Settings":
   - Set Node.js version to 18.x or later
   - Configure build environment variables if needed

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Once deployed, you can access your production app at the provided domain

### 5. Custom Domain Setup

1. Go to "Settings" > "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Verify domain ownership
5. Enable HTTPS (Vercel handles SSL certificates automatically)

## CI/CD Pipeline

### 1. GitHub Actions Setup

Create a workflow file at `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run linting
        run: npm run lint
      - name: Run tests
        run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 2. Secrets Configuration for GitHub Actions

Add the following secrets to your GitHub repository:

1. Go to your repository > "Settings" > "Secrets" > "Actions"
2. Add the secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### 3. Preview Deployments

Vercel automatically creates preview deployments for pull requests. To integrate this with GitHub:

1. In your Vercel project, go to "Settings" > "Git"
2. Enable "GitHub Pull Request Comments"
3. This will add deployment links to pull request comments

## Monitoring and Logging

### 1. Application Monitoring

Set up monitoring for your production application:

1. **Vercel Analytics**:
   - Go to your Vercel project dashboard
   - Navigate to "Analytics" tab
   - Enable Web Vitals and Real User Monitoring

2. **Error Tracking with Sentry**:
   - Install Sentry: `npm install @sentry/nextjs`
   - Create configuration files:
     - `sentry.client.config.js`
     - `sentry.server.config.js`
     - `sentry.edge.config.js`
   - Add Sentry to `next.config.js` using the Sentry webpack plugin

### 2. Performance Monitoring

1. **Core Web Vitals**:
   - Monitor Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS)
   - Use Lighthouse for regular performance audits

2. **API Performance**:
   - Track response times for critical API endpoints
   - Set up alerts for slow responses

### 3. Server-Side Logging

1. **Structured Logging**:
   - Use a structured logging library like Pino
   - Install: `npm install pino pino-pretty`

2. **Log Collection**:
   - Set up a log management system (Datadog, Loggly, New Relic, etc.)
   - Configure log forwarding from Vercel

### 4. Alerting

Configure alerts for:
- Server errors
- High response times
- Unusual traffic patterns
- Failed authentication attempts
- Database connection issues

## Security Best Practices

### 1. HTTP Security Headers

Add security headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://media.example.com; font-src 'self' data:; connect-src 'self' https://api.example.com;"
          },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
        ]
      }
    ]
  }
}
```

### 2. CORS Configuration

Configure CORS settings for your API:

```typescript
// In API route handlers
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { /* your data */ },
    {
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
```

### 3. Rate Limiting

Implement rate limiting for API routes:

1. Install: `npm install @upstash/ratelimit @upstash/redis`
2. Create a rate limiter middleware for your API routes

### 4. Authentication Security

1. **JWT Settings**:
   - Set appropriate JWT expiration times
   - Use secure cookie settings

2. **Password Policies**:
   - Enforce strong password requirements
   - Implement account lockout after failed attempts

3. **Two-Factor Authentication**:
   - Consider adding 2FA for additional security

## Scaling and Performance

### 1. Caching Strategy

Implement caching for API responses:

1. **CDN Caching**:
   - Configure Cache-Control headers for static assets
   - Use Vercel's Edge Caching

2. **API Response Caching**:
   - Use Redis for server-side caching
   - Consider implementing SWR or React Query for client-side caching

### 2. Image Optimization

1. Use Next.js Image component for automatic optimization
2. Configure image sizes and quality in `next.config.js`

### 3. Database Performance

1. **Indexing**:
   - Create appropriate indexes for frequently queried fields
   - Monitor query performance

2. **Connection Pooling**:
   - Use PgBouncer or similar for connection pooling
   - Configure max connections appropriately

### 4. API Optimization

1. **Pagination**:
   - Implement pagination for list endpoints
   - Use cursor-based pagination for large datasets

2. **Field Selection**:
   - Allow clients to request only needed fields
   - Implement GraphQL if complex data requirements exist

## Post-Deployment Tasks

### 1. Smoke Testing

After deployment, perform these smoke tests:

1. Test user registration and login
2. Create a sample resume
3. Test profile management
4. Search for jobs
5. Test all critical user flows

### 2. Monitoring Check

1. Verify all monitoring systems are receiving data
2. Check error tracking is working correctly
3. Ensure logs are being collected

### 3. Performance Verification

1. Run Lighthouse tests against production URL
2. Verify API response times are within acceptable ranges
3. Check Core Web Vitals in Google Search Console (once indexed)

## Rollback Strategy

### 1. Deployment Rollback

If issues are detected after deployment:

1. **Vercel Rollback**:
   - Go to your Vercel project dashboard
   - Navigate to "Deployments"
   - Find the last stable deployment
   - Click "..." > "Promote to Production"

2. **Database Rollback**:
   - If database migrations caused issues, restore from the most recent backup
   - Use Prisma's migration system to revert to a previous state:
     ```bash
     npx prisma migrate resolve --rolled-back YOUR_MIGRATION_NAME
     ```

### 2. Incident Response

If a production incident occurs:

1. Identify the scope and impact
2. Notify users if there's a service disruption
3. Roll back to the last known good state
4. Diagnose and fix the issue in a development environment
5. Deploy the fix with careful monitoring
6. Document the incident and conduct a post-mortem

---

## Conclusion

Following this deployment guide will help ensure a smooth transition to production for your AI Resume Builder application. Remember to treat security and performance as ongoing concerns, regularly updating and improving your deployment process as your application grows.

For any issues during deployment, consult the Next.js and Vercel documentation or reach out to their support channels for assistance. 