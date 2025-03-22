import { prisma } from '../prisma';

// Define types to match the updated Prisma schema
export interface Resume {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  lastExportedAt: Date | null;
  isPublic: boolean;
  version: number;
  atsScore: number | null;
  userId: string;
  templateId: string | null;
}

export interface ContactInfo {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  githubUrl: string | null;
  otherUrls: any | null;
  resumeId: string;
}

export interface Summary {
  id: string;
  content: string;
  resumeId: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrentPosition: boolean;
  description: string;
  achievements: string[];
  order: number;
  resumeId: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrentlyStudying: boolean;
  gpa: string | null;
  description: string | null;
  achievements: string[];
  order: number;
  resumeId: string;
}

export interface Skill {
  id: string;
  category: string;
  skills: string[];
  order: number;
  resumeId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isOngoing: boolean;
  technologies: string[];
  order: number;
  resumeId: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate: Date | null;
  credentialId: string | null;
  credentialUrl: string | null;
  order: number;
  resumeId: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  order: number;
  resumeId: string;
}

export interface CreateResumeData {
  title: string;
  userId: string;
  templateId?: string;
  isPublic?: boolean;
}

export interface ResumeWithDetails extends Resume {
  contactInfo: ContactInfo | null;
  summary: Summary | null;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

// Helper function to generate a slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + 
    '-' + Math.floor(Math.random() * 1000000).toString();
}

export class ResumeService {
  /**
   * Create a new resume
   */
  async createResume(resumeData: CreateResumeData): Promise<Resume> {
    const { title, userId, templateId, isPublic = false } = resumeData;
    
    // Generate a unique slug based on the title
    const slug = generateSlug(title);
    
    return prisma.resume.create({
      data: {
        title,
        slug,
        userId,
        templateId,
        isPublic,
      },
    });
  }
  
  /**
   * Get all resumes for a user
   */
  async getUserResumes(userId: string): Promise<Resume[]> {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }
  
  /**
   * Get a resume by ID with all details
   */
  async getResumeById(id: string): Promise<ResumeWithDetails | null> {
    return prisma.resume.findUnique({
      where: { id },
      include: {
        contactInfo: true,
        summary: true,
        experiences: {
          orderBy: { order: 'asc' }
        },
        educations: {
          orderBy: { order: 'asc' }
        },
        skills: {
          orderBy: { order: 'asc' }
        },
        projects: {
          orderBy: { order: 'asc' }
        },
        certifications: {
          orderBy: { order: 'asc' }
        },
        languages: {
          orderBy: { order: 'asc' }
        },
      },
    });
  }
  
  /**
   * Get a resume by slug
   */
  async getResumeBySlug(slug: string): Promise<ResumeWithDetails | null> {
    return prisma.resume.findUnique({
      where: { slug },
      include: {
        contactInfo: true,
        summary: true,
        experiences: {
          orderBy: { order: 'asc' }
        },
        educations: {
          orderBy: { order: 'asc' }
        },
        skills: {
          orderBy: { order: 'asc' }
        },
        projects: {
          orderBy: { order: 'asc' }
        },
        certifications: {
          orderBy: { order: 'asc' }
        },
        languages: {
          orderBy: { order: 'asc' }
        },
      },
    });
  }
  
  /**
   * Update a resume
   */
  async updateResume(id: string, resumeData: Partial<Resume>): Promise<Resume> {
    // Remove fields that shouldn't be updated directly
    const {
      id: resumeId,
      userId,
      createdAt,
      updatedAt,
      slug,
      ...updateData
    } = resumeData as Resume; // Type assertion to make TypeScript happy
    
    // If title is being updated, generate a new slug
    if (updateData.title) {
      (updateData as any).slug = generateSlug(updateData.title);
    }
    
    return prisma.resume.update({
      where: { id },
      data: updateData,
    });
  }
  
  /**
   * Delete a resume
   */
  async deleteResume(id: string): Promise<Resume> {
    return prisma.resume.delete({
      where: { id },
    });
  }
  
  /**
   * Update or create contact info
   */
  async upsertContactInfo(resumeId: string, data: Omit<ContactInfo, 'id' | 'resumeId'>): Promise<ContactInfo> {
    const existing = await prisma.contactInfo.findUnique({
      where: { resumeId },
    });
    
    if (existing) {
      return prisma.contactInfo.update({
        where: { id: existing.id },
        data,
      });
    } else {
      return prisma.contactInfo.create({
        data: {
          ...data,
          resumeId,
        },
      });
    }
  }
  
  /**
   * Update or create summary
   */
  async upsertSummary(resumeId: string, content: string): Promise<Summary> {
    const existing = await prisma.summary.findUnique({
      where: { resumeId },
    });
    
    if (existing) {
      return prisma.summary.update({
        where: { id: existing.id },
        data: { content },
      });
    } else {
      return prisma.summary.create({
        data: {
          content,
          resumeId,
        },
      });
    }
  }
  
  /**
   * Add experience
   */
  async addExperience(resumeId: string, data: Omit<Experience, 'id' | 'resumeId' | 'order'>): Promise<Experience> {
    // Get the highest order value to place this at the end
    const experiences = await prisma.experience.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = experiences.length > 0 ? experiences[0].order + 1 : 0;
    
    return prisma.experience.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update experience
   */
  async updateExperience(id: string, data: Partial<Omit<Experience, 'id' | 'resumeId'>>): Promise<Experience> {
    return prisma.experience.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete experience
   */
  async deleteExperience(id: string): Promise<Experience> {
    return prisma.experience.delete({
      where: { id },
    });
  }
  
  /**
   * Add education
   */
  async addEducation(resumeId: string, data: Omit<Education, 'id' | 'resumeId' | 'order'>): Promise<Education> {
    // Get the highest order value to place this at the end
    const educations = await prisma.education.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = educations.length > 0 ? educations[0].order + 1 : 0;
    
    return prisma.education.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update education
   */
  async updateEducation(id: string, data: Partial<Omit<Education, 'id' | 'resumeId'>>): Promise<Education> {
    return prisma.education.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete education
   */
  async deleteEducation(id: string): Promise<Education> {
    return prisma.education.delete({
      where: { id },
    });
  }
  
  /**
   * Add skill category
   */
  async addSkill(resumeId: string, data: Omit<Skill, 'id' | 'resumeId' | 'order'>): Promise<Skill> {
    // Get the highest order value to place this at the end
    const skills = await prisma.skill.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = skills.length > 0 ? skills[0].order + 1 : 0;
    
    return prisma.skill.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update skill category
   */
  async updateSkill(id: string, data: Partial<Omit<Skill, 'id' | 'resumeId'>>): Promise<Skill> {
    return prisma.skill.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete skill category
   */
  async deleteSkill(id: string): Promise<Skill> {
    return prisma.skill.delete({
      where: { id },
    });
  }
  
  /**
   * Add project
   */
  async addProject(resumeId: string, data: Omit<Project, 'id' | 'resumeId' | 'order'>): Promise<Project> {
    // Get the highest order value to place this at the end
    const projects = await prisma.project.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = projects.length > 0 ? projects[0].order + 1 : 0;
    
    return prisma.project.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update project
   */
  async updateProject(id: string, data: Partial<Omit<Project, 'id' | 'resumeId'>>): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete project
   */
  async deleteProject(id: string): Promise<Project> {
    return prisma.project.delete({
      where: { id },
    });
  }
  
  /**
   * Add certification
   */
  async addCertification(resumeId: string, data: Omit<Certification, 'id' | 'resumeId' | 'order'>): Promise<Certification> {
    // Get the highest order value to place this at the end
    const certifications = await prisma.certification.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = certifications.length > 0 ? certifications[0].order + 1 : 0;
    
    return prisma.certification.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update certification
   */
  async updateCertification(id: string, data: Partial<Omit<Certification, 'id' | 'resumeId'>>): Promise<Certification> {
    return prisma.certification.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete certification
   */
  async deleteCertification(id: string): Promise<Certification> {
    return prisma.certification.delete({
      where: { id },
    });
  }
  
  /**
   * Add language
   */
  async addLanguage(resumeId: string, data: Omit<Language, 'id' | 'resumeId' | 'order'>): Promise<Language> {
    // Get the highest order value to place this at the end
    const languages = await prisma.language.findMany({
      where: { resumeId },
      orderBy: { order: 'desc' },
      take: 1,
    });
    
    const order = languages.length > 0 ? languages[0].order + 1 : 0;
    
    return prisma.language.create({
      data: {
        ...data,
        order,
        resumeId,
      },
    });
  }
  
  /**
   * Update language
   */
  async updateLanguage(id: string, data: Partial<Omit<Language, 'id' | 'resumeId'>>): Promise<Language> {
    return prisma.language.update({
      where: { id },
      data,
    });
  }
  
  /**
   * Delete language
   */
  async deleteLanguage(id: string): Promise<Language> {
    return prisma.language.delete({
      where: { id },
    });
  }
  
  /**
   * Update ATS score
   */
  async updateAtsScore(id: string, score: number): Promise<Resume> {
    return prisma.resume.update({
      where: { id },
      data: { atsScore: score },
    });
  }
  
  /**
   * Update last exported timestamp
   */
  async updateLastExported(id: string): Promise<Resume> {
    return prisma.resume.update({
      where: { id },
      data: { lastExportedAt: new Date() },
    });
  }
} 