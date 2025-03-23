import { prisma } from '../prisma';
import { hash, compare } from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // New profile fields from the updated schema
  profileImage: string | null;
  jobTitle: string | null;
  location: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
}

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export class UserService {
  /**
   * Create a new user
   */
  async createUser(userData: CreateUserData): Promise<User> {
    const { email, password, name } = userData;
    
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
      },
    });
    
    return user;
  }
  
  /**
   * Find a user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  
  /**
   * Find a user by ID
   */
  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
  
  /**
   * Authenticate a user
   */
  async authenticateUser(loginData: LoginUserData): Promise<User> {
    const { email, password } = loginData;
    
    // Find user by email
    const user = await this.findUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Compare password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    
    return user;
  }
  
  /**
   * Update a user's profile
   */
  async updateUserProfile(id: string, userData: Partial<User>): Promise<User> {
    // Remove sensitive fields that shouldn't be updated directly
    const { password, id: userId, createdAt, updatedAt, ...updateData } = userData;
    
    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  
  /**
   * Change a user's password
   */
  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<User> {
    // Find user
    const user = await this.findUserById(id);
    
    if (!user) {
      throw new Error('User not found');
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