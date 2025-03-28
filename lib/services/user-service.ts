import { prisma } from '../prisma';
import { hash, compare } from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Email verification
  emailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiry: Date | null;
  
  // New profile fields from the updated schema
  profileImage: string | null;
  jobTitle: string | null;
  location: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  
  // New fields from the schema
  clerkId: string | null;
  active: boolean;
  isAdmin: boolean;
  isPremium: boolean;
}

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  emailVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
}

export interface LoginUserData {
  email: string;
  password: string;
}

/**
 * Define Prisma User type to work with database results directly
 */
type PrismaUser = {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiry: Date | null;
  profileImage: string | null;
  jobTitle: string | null;
  location: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  clerkId: string | null;
  active: boolean;
  isAdmin: boolean;
  isPremium: boolean;
};

export class UserService {
  /**
   * Create a new user
   */
  async createUser(userData: CreateUserData): Promise<PrismaUser> {
    const { 
      email, 
      password, 
      name = null, 
      emailVerified = false, 
      verificationToken = null, 
      verificationTokenExpiry = null 
    } = userData;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified,
        verificationToken,
        verificationTokenExpiry,
      },
    });
    
    return user;
  }
  
  /**
   * Find a user by email
   */
  async findUserByEmail(email: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  
  /**
   * Find a user by ID
   */
  async findUserById(id: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
  
  /**
   * Find a user by verification token
   */
  async findUserByVerificationToken(token: string): Promise<PrismaUser | null> {
    return prisma.user.findFirst({
      where: { verificationToken: token },
    });
  }
  
  /**
   * Authenticate a user
   */
  async authenticateUser(loginData: LoginUserData): Promise<PrismaUser> {
    const { email, password } = loginData;
    
    // Find user by email
    const user = await this.findUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check if user has a password (might be using OAuth)
    if (!user.password) {
      throw new Error('This account cannot be logged in with a password');
    }
    
    // Compare password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    
    return user;
  }
  
  /**
   * Verify a user's email
   */
  async verifyEmail(token: string): Promise<PrismaUser> {
    // Find user by verification token
    const user = await this.findUserByVerificationToken(token);
    
    if (!user) {
      throw new Error('Invalid verification token');
    }
    
    // Check if token is expired
    if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
      throw new Error('Verification token has expired');
    }
    
    // Update user to mark email as verified
    return prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });
  }
  
  /**
   * Update a user's profile
   */
  async updateUserProfile(id: string, userData: Partial<User>): Promise<PrismaUser> {
    // Remove sensitive fields that shouldn't be updated directly
    const { 
      password, 
      id: userId, 
      createdAt, 
      updatedAt, 
      emailVerified, 
      verificationToken, 
      verificationTokenExpiry, 
      ...updateData 
    } = userData;
    
    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  
  /**
   * Change a user's password
   */
  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<PrismaUser> {
    // Find user
    const user = await this.findUserById(id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user has a password
    if (!user.password) {
      throw new Error('User does not have a password set');
    }
    
    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }
    
    // Hash new password
    const hashedPassword = await hash(newPassword, 10);
    
    // Update password
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
} 