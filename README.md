#  AI-Powered Resume Builder - Resume Creation Platform

Resume AI is an AI-powered platform that helps professionals create ATS-friendly resumes tailored to specific job descriptions. Built with Next.js and featuring a sleek, responsive design, this application streamlines the resume creation process while optimizing content for Applicant Tracking Systems (ATS).

## Features

### 🔐 User Authentication
- Secure JWT-based authentication
- Email and password registration and login
- Protected routes and authenticated API endpoints
- Persistent sessions with HTTP-only cookies

### 📝 Resume Management
- Create and manage multiple resumes
- Build from scratch using professional templates
- Real-time editing capabilities
- Organize resume sections (experience, education, skills, etc.)

### 🤖 AI-Powered Analysis
- Smart job description parsing
- ATS optimization suggestions
- Skill gap analysis
- Tailored content recommendations

### 📥 Export Capabilities
- Professional PDF export
- Multiple template options
- ATS-friendly formatting

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Custom JWT implementation with HTTP-only cookies
- **Form Validation**: Zod schema validation
- **Icons**: Lucide React
- **Animations**: Custom CSS animations with Intersection Observer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm or yarn or npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Cleve-codes/AI-resume-Builder.git
```

2. Navigate to the project directory:
```bash
cd AI-resume-Builder
```

3. Install dependencies:
```bash
pnpm install
# or
yarn install
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
# Database
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/resume_builder?schema=public"

# Authentication
NEXTAUTH_SECRET="your-secret-key-for-jwt"
```

5. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev
```

6. Start the development server:
```bash
pnpm run dev
# or
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses PostgreSQL with Prisma ORM. The main entities include:

- **User**: User authentication and profile data
- **Resume**: Resume metadata and basic info
- **Experience**: Work experience entries
- **Education**: Educational history
- **Projects**: Portfolio projects
- **Skills**: Technical and soft skills
- **Certifications**: Professional certifications

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate a user and set JWT cookie
- `POST /api/auth/logout` - Log out a user (clear cookie)
- `GET /api/auth/me` - Get current user profile

### Resumes
- `GET /api/resumes` - Get all resumes for the current user
- `POST /api/resumes` - Create a new resume
- `GET /api/resumes/:id` - Get a specific resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

## Project Structure
```
├── app/                     # Next.js app directory (App Router)
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main landing page
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── resumes/         # Resume management endpoints
│   ├── dashboard/           # Dashboard pages
│   ├── login/               # Login page
│   ├── signup/              # Signup page
├── components/              # Reusable UI components
├── lib/                     # Utility libraries
│   ├── auth.ts              # Authentication utilities
│   ├── context/             # React context providers
│   ├── prisma.ts            # Prisma client initialization
│   ├── services/            # Database service classes
├── middleware.ts            # Next.js middleware for authentication
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma        # Database schema
├── public/                  # Static assets
```

## Contributing

We welcome contributions to Resume Builder! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Contact

Reach Out - [@LinkedIn](www.linkedin.com/in/cleve-momanyi)

Project Link: [AI-resume-Builder](https://github.com/Cleve-codes/AI-resume-Builder)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)