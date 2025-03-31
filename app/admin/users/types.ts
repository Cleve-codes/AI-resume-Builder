export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  role: 'user' | 'admin' | 'moderator';
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  lastActive: string;
  joinDate: string;
  resumes: number;
  avatar: string;
}

export interface UserActivity {
  id: number;
  userId: number;
  type: 'login' | 'resume_create' | 'resume_edit' | 'profile_update' | 'subscription_change' | 'export';
  timestamp: string;
  details: string;
  ip?: string;
  device?: string;
}

export interface UserResume {
  id: number;
  userId: number;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed' | 'shared';
  jobTitle?: string;
  completionPercentage: number;
}

export interface UserBilling {
  id: number;
  userId: number;
  type: 'subscription' | 'one_time';
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  date: string;
  nextBillingDate?: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
}

export interface UserFilters {
  status?: string[];
  role?: string[];
  plan?: string[];
  dateRange?: [Date | null, Date | null];
  search?: string;
} 