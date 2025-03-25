# API Implementation Guide

This guide provides detailed steps for implementing the core API functionality for the AI Resume Builder application.

## Table of Contents

1. [Setting Up API Routes](#setting-up-api-routes)
2. [Authentication API](#authentication-api)
3. [Profile API](#profile-api)
4. [Resume API](#resume-api)
5. [Jobs API](#jobs-api)
6. [Best Practices](#best-practices)

---

## Setting Up API Routes

Next.js provides an API routes feature through the `app/api` directory. Here's how to structure your API routes:

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts
│   │   ├── register/
│   │   │   └── route.ts
│   │   └── verify/
│   │       └── route.ts
│   ├── profile/
│   │   ├── route.ts
│   │   ├── [id]/
│   │   │   └── route.ts
│   │   ├── settings/
│   │   │   └── route.ts
│   │   └── experience/
│   │       └── route.ts
│   ├── resumes/
│   │   ├── route.ts
│   │   ├── [id]/
│   │   │   └── route.ts
│   │   ├── templates/
│   │   │   └── route.ts
│   │   └── export/
│   │       └── route.ts
│   └── jobs/
│       ├── route.ts
│       ├── search/
│       │   └── route.ts
│       ├── match/
│       │   └── route.ts
│       └── apply/
│           └── route.ts
```

### Creating a Basic API Route Handler

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  // Check authentication
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Your logic here
    const data = { message: 'Success' };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  // Check authentication
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate the input
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Required field missing' },
        { status: 400 }
      );
    }
    
    // Process the request
    // Example: Create a record in the database
    const result = await prisma.example.create({
      data: {
        field: body.requiredField,
        userId: session.user.id,
      },
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Authentication API

### 1. Authentication Setup with NextAuth.js

First, install the required dependencies:

```bash
npm install next-auth@beta bcrypt
npm install @types/bcrypt --save-dev
```

Create the auth options file:

```typescript
// lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("User not found");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/verify-email",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

Setup the NextAuth API route:

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

### 2. Registration API

```typescript
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token valid for 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
        verificationToken,
        verificationTokenExpiry: tokenExpiry,
      },
    });

    // Send verification email
    await sendVerificationEmail(
      email,
      name,
      `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`
    );

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 3. Email Verification API

```typescript
// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Verification token is required" },
      { status: 400 }
    );
  }

  try {
    // Find user with this token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Update user verification status
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    // Redirect to login page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Profile API

### 1. Get User Profile

```typescript
// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        experience: true,
        education: true,
        skills: true,
      },
    });

    if (!profile) {
      // Create a default profile if it doesn't exist
      const newProfile = await prisma.profile.create({
        data: {
          userId: session.user.id,
          bio: "",
          headline: "",
          location: "",
          phoneNumber: "",
          website: "",
        },
        include: {
          experience: true,
          education: true,
          skills: true,
        },
      });

      return NextResponse.json(newProfile);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Update the profile
    const updatedProfile = await prisma.profile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        bio: body.bio,
        headline: body.headline,
        location: body.location,
        phoneNumber: body.phoneNumber,
        website: body.website,
      },
      create: {
        userId: session.user.id,
        bio: body.bio || "",
        headline: body.headline || "",
        location: body.location || "",
        phoneNumber: body.phoneNumber || "",
        website: body.website || "",
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 2. Manage Experience

```typescript
// app/api/profile/experience/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const experiences = await prisma.experience.findMany({
      where: {
        profile: {
          userId: session.user.id,
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Experience fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.company || !body.startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the profile ID
    const profile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Create the experience
    const experience = await prisma.experience.create({
      data: {
        profileId: profile.id,
        title: body.title,
        company: body.company,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        description: body.description || "",
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Experience creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Resume API

### 1. Resume CRUD Operations

```typescript
// app/api/resumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Resume fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.templateId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the resume
    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: body.title,
        templateId: body.templateId,
        content: body.content || {},
        isPublic: body.isPublic || false,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Resume creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 2. Resume Templates

```typescript
// app/api/resumes/templates/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const templates = await prisma.resumeTemplate.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Jobs API

### 1. Job Search and Matching

```typescript
// app/api/jobs/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { searchExternalJobs } from "@/lib/job-api";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const location = searchParams.get("location") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Get user's skills for matching
    const userSkills = await prisma.skill.findMany({
      where: {
        profile: {
          userId: session.user.id,
        },
      },
      select: {
        name: true,
      },
    });

    const skillNames = userSkills.map((skill) => skill.name);

    // Search for jobs (using external API or mock data for now)
    const jobs = await searchExternalJobs(query, location, page, limit);

    // Calculate match scores based on user's skills
    const jobsWithMatchScores = jobs.map((job) => {
      const requiredSkills = job.requiredSkills || [];
      const matchingSkills = requiredSkills.filter((skill) =>
        skillNames.includes(skill.toLowerCase())
      );
      
      const matchScore = requiredSkills.length
        ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
        : 0;

      return {
        ...job,
        matchScore,
        matchingSkills,
        missingSkills: requiredSkills.filter(
          (skill) => !skillNames.includes(skill.toLowerCase())
        ),
      };
    });

    // Sort by match score
    jobsWithMatchScores.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      jobs: jobsWithMatchScores,
      page,
      limit,
      total: jobs.length,
    });
  } catch (error) {
    console.error("Job search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 2. Job Application Tracking

```typescript
// app/api/jobs/apply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.jobId || !body.resumeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if resume exists and belongs to user
    const resume = await prisma.resume.findFirst({
      where: {
        id: body.resumeId,
        userId: session.user.id,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    // Create or update job application
    const application = await prisma.jobApplication.upsert({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: body.jobId,
        },
      },
      update: {
        resumeId: body.resumeId,
        status: body.status || "applied",
        appliedAt: new Date(),
        notes: body.notes || "",
      },
      create: {
        userId: session.user.id,
        jobId: body.jobId,
        resumeId: body.resumeId,
        status: "applied",
        appliedAt: new Date(),
        notes: body.notes || "",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Best Practices

### Error Handling

Create a consistent error handling approach:

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleApiError(error: unknown) {
  console.error(error);
  
  if (error instanceof ApiError) {
    return { error: error.message, statusCode: error.statusCode };
  }
  
  return { 
    error: "Internal server error", 
    statusCode: 500 
  };
}
```

### Middleware for Authentication

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/register", "/verify-email"];
  const isPublicPath = publicPaths.includes(path);

  // API paths that don't require authentication
  const publicApiPaths = ["/api/auth"];
  const isPublicApiPath = publicApiPaths.some((prefix) => 
    path.startsWith(prefix)
  );

  if (isPublicPath || isPublicApiPath) {
    return NextResponse.next();
  }

  // Check if the request is for an API route
  const isApiPath = path.startsWith("/api");

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no token and trying to access protected route
  if (!token) {
    if (isApiPath) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/profile/:path*",
    "/resumes/:path*",
    "/jobs/:path*",
  ],
};
```

### API Request Validation

Install a validation library:

```bash
npm install zod
```

Create validation schemas:

```typescript
// lib/validations/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().optional(),
  headline: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid end date",
  }).optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});
```

Use validation in API routes:

```typescript
// Example validation in an API route
import { profileSchema } from "@/lib/validations/profile";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Continue with validated data
    // ...
  } catch (error) {
    // ...
  }
}
```

---

## Next Steps

After implementing these core API routes, you should:

1. Connect your frontend components to the APIs
2. Add proper error handling and loading states in the UI
3. Implement form validation on the client side
4. Add unit and integration tests for the API routes
5. Set up monitoring and logging for production

Remember to follow best practices for security, performance, and code organization throughout your implementation. 