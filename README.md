#  AI-Powered Resume Builder - ATS-Optimized Resume Creation Platform

Resume AI is an intelligent, AI-powered platform that helps professionals create ATS-friendly resumes tailored to specific job descriptions. Built with Next.js and featuring a sleek, responsive design, this application streamlines the resume creation process while optimizing content for Applicant Tracking Systems (ATS).

![Resume Builder Preview](https://your-screenshot-url-here.png)

## Features

### 🔐 User Authentication
- Multiple authentication methods:
  - Email and password registration/login
  - Google OAuth integration
  - Secure JWT-based authentication
- Email verification system
- Protected routes and authenticated API endpoints
- Persistent sessions with HTTP-only cookies

### 📝 Resume Management
- Create and manage multiple resumes
- Resume status tracking (draft, in-progress, complete, needs review)
- Build from scratch using professional templates
- Real-time editing capabilities
- Organize resume sections (experience, education, skills, etc.)
- Custom sections for unique content

### 🎨 Template System
- Multiple professional resume templates
- Premium templates for subscribed users
- Modern, creative, and ATS-optimized designs
- Visual template previews in the gallery
- Customizable template elements (colors, fonts, layouts)

### 🤖 AI-Powered Analysis
- Smart job description parsing
- Resume scoring against job descriptions
- Keyword optimization suggestions
- Missing skills identification
- Personalized improvement recommendations
- ATS compatibility scoring

### 📥 Export Capabilities
- Export as PDF with proper formatting
- Share resume with public link (optional)
- Print-friendly versions
- Multiple layout options

### 📊 Dashboard & Analytics
- Comprehensive user dashboard
- Resume performance metrics
- Job application tracking
- User profile management
- Activity tracking and statistics

## Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) with App Router architecture
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/) for form management
- [Zod](https://github.com/colinhacks/zod) for validation

### Backend
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma ORM](https://www.prisma.io/) for database operations
- [PostgreSQL](https://www.postgresql.org/) for data storage
- [NextAuth.js](https://next-auth.js.org/) compatible authentication
- [JWT](https://jwt.io/) for secure authentication

### Storage & Media
- [Cloudinary](https://cloudinary.com/) for image storage and optimization
- Optional: [Supabase Storage](https://supabase.com/storage) for file management

### Deployment & Infrastructure
- [Vercel](https://vercel.com/) for hosting (recommended)
- [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) for PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or pnpm 8.x
- PostgreSQL database (local or hosted)
- Google OAuth credentials (for Google authentication)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/AI-resume-Builder.git
   cd AI-resume-Builder
   ```

2. Install dependencies
   ```bash
   npm install
   # or 
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/resume_builder?schema=public"
   DIRECT_URL="postgresql://username:password@localhost:5432/resume_builder?schema=public"
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET="your-secret-key-for-jwt"
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Cloudinary (Optional for image storage)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. Set up the database and generate the Prisma client
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Seed the database with initial data (templates, etc.)
   ```bash
   npx prisma db seed
   ```

6. Start the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

Our application uses a comprehensive database schema built with Prisma ORM:

- **User**: Authentication and user profile information
- **Account**: For OAuth provider integrations
- **Resume**: Core resume data with status tracking
- **Template**: Resume template designs and configurations
- **ContactInfo, Summary, Experience, Education, Skills, etc.**: Detailed resume sections
- **JobDescription**: For storing job listings and descriptions
- **AnalysisResult**: AI analysis results from comparing resumes to job descriptions

For the complete schema, see [prisma/schema.prisma](prisma/schema.prisma).

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out a user
- `GET /api/auth/me`: Get the current user information
- `POST /api/auth/google`: Google OAuth authentication
- `POST /api/auth/verify-email`: Verify user email address

### Resumes
- `GET /api/resumes`: Get all resumes for the current user
- `POST /api/resumes`: Create a new resume
- `GET /api/resumes/:id`: Get a specific resume
- `PATCH /api/resumes/:id`: Update a resume
- `DELETE /api/resumes/:id`: Delete a resume
- `POST /api/resumes/:id/analyze`: Analyze resume against a job description

### Templates
- `GET /api/templates`: Get all resume templates
- `GET /api/templates/:id`: Get a specific template

### Others
- `POST /api/export-pdf`: Export resume as PDF
- `POST /api/upload-resume`: Upload an existing resume for parsing
- `GET /api/jobs`: Get job recommendations

## Project Structure

```
AI-resume-Builder/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   ├── components/         # Shared components
│   ├── dashboard/          # Dashboard pages
│   │   ├── analytics/      # Resume analytics
│   │   ├── profile/        # User profile
│   │   ├── resume/         # Resume creation and editing
│   │   ├── settings/       # User settings
│   │   └── ...
│   ├── login/              # Authentication pages
│   ├── signup/
│   └── verify-email/       # Email verification
├── components/             # UI components
├── lib/                    # Utility functions and services
│   ├── context/            # React Context providers
│   ├── services/           # Service layer
│   └── ...
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static files
└── types/                  # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Reach Out - [@LinkedIn](https://www.linkedin.com/in/cleve-momanyi)

Project Link: [AI-resume-Builder](https://github.com/Cleve-codes/AI-resume-Builder)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Cloudinary](https://cloudinary.com/)
- [Next-Auth.js](https://next-auth.js.org/)