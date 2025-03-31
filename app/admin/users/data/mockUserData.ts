import { UserActivity, UserResume, UserBilling } from "../types";

export const mockUserActivities: UserActivity[] = [
  {
    id: 1,
    userId: 1,
    type: "login",
    timestamp: "2023-12-15T14:30:00Z",
    details: "Logged in from Chrome browser",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  },
  {
    id: 2,
    userId: 1,
    type: "resume_create",
    timestamp: "2023-12-15T14:45:00Z",
    details: "Created new resume: Software Engineer Resume",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  },
  {
    id: 3,
    userId: 1,
    type: "profile_update",
    timestamp: "2023-12-14T10:15:00Z",
    details: "Updated profile information",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  },
  {
    id: 4,
    userId: 1,
    type: "resume_edit",
    timestamp: "2023-12-13T16:20:00Z",
    details: "Edited resume: Software Engineer Resume",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  },
  {
    id: 5,
    userId: 1,
    type: "export",
    timestamp: "2023-12-13T16:30:00Z",
    details: "Exported resume as PDF",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  },
  {
    id: 6,
    userId: 1,
    type: "login",
    timestamp: "2023-12-12T09:10:00Z",
    details: "Logged in from Mobile browser",
    ip: "192.168.1.2",
    device: "Mobile - iOS 16"
  },
  {
    id: 7,
    userId: 1,
    type: "subscription_change",
    timestamp: "2023-12-10T11:05:00Z",
    details: "Upgraded to Premium Plan",
    ip: "192.168.1.1",
    device: "Desktop - Windows 11"
  }
];

export const mockUserResumes: UserResume[] = [
  {
    id: 1,
    userId: 1,
    title: "Software Engineer Resume",
    template: "Modern",
    createdAt: "2023-12-15T14:45:00Z",
    updatedAt: "2023-12-15T16:30:00Z",
    status: "completed",
    jobTitle: "Senior Software Engineer",
    completionPercentage: 100
  },
  {
    id: 2,
    userId: 1,
    title: "Frontend Developer Resume",
    template: "Professional",
    createdAt: "2023-11-20T10:15:00Z",
    updatedAt: "2023-12-13T16:20:00Z",
    status: "completed",
    jobTitle: "Frontend Developer",
    completionPercentage: 100
  },
  {
    id: 3,
    userId: 1,
    title: "Project Manager Resume",
    template: "Executive",
    createdAt: "2023-10-05T09:30:00Z",
    updatedAt: "2023-10-05T11:45:00Z",
    status: "draft",
    jobTitle: "Technical Project Manager",
    completionPercentage: 65
  },
  {
    id: 4,
    userId: 1,
    title: "Full Stack Developer Resume",
    template: "Creative",
    createdAt: "2023-09-15T14:20:00Z",
    updatedAt: "2023-09-15T16:10:00Z",
    status: "shared",
    jobTitle: "Full Stack Developer",
    completionPercentage: 100
  },
  {
    id: 5,
    userId: 1,
    title: "Tech Lead Resume",
    template: "Simple",
    createdAt: "2023-08-22T11:30:00Z",
    updatedAt: "2023-08-22T13:45:00Z",
    status: "draft",
    jobTitle: "Technical Team Lead",
    completionPercentage: 45
  }
];

export const mockUserBilling: UserBilling[] = [
  {
    id: 1,
    userId: 1,
    type: "subscription",
    plan: "Premium",
    amount: 15.99,
    status: "paid",
    date: "2023-12-10T11:05:00Z",
    nextBillingDate: "2024-01-10T11:05:00Z",
    paymentMethod: "credit_card"
  },
  {
    id: 2,
    userId: 1,
    type: "subscription",
    plan: "Basic",
    amount: 7.99,
    status: "paid",
    date: "2023-11-10T11:05:00Z",
    nextBillingDate: "2023-12-10T11:05:00Z",
    paymentMethod: "credit_card"
  },
  {
    id: 3,
    userId: 1,
    type: "one_time",
    plan: "Resume Review Service",
    amount: 24.99,
    status: "paid",
    date: "2023-10-15T14:30:00Z",
    paymentMethod: "paypal"
  },
  {
    id: 4,
    userId: 1,
    type: "subscription",
    plan: "Basic",
    amount: 7.99,
    status: "paid",
    date: "2023-10-10T11:05:00Z",
    nextBillingDate: "2023-11-10T11:05:00Z",
    paymentMethod: "credit_card"
  },
  {
    id: 5,
    userId: 1,
    type: "one_time",
    plan: "Cover Letter Package",
    amount: 19.99,
    status: "refunded",
    date: "2023-09-20T09:15:00Z",
    paymentMethod: "credit_card"
  }
]; 