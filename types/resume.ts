export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
  certifications?: Certification[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  isPremium: boolean;
  category: string;
  tags?: string[];
  structure: {
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    sections: string[];
    layout: 'standard' | 'split' | 'creative' | 'minimal';
  };
}

export interface Resume {
  id: string;
  title: string;
  templateId: string;
  content: ResumeData;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
} 