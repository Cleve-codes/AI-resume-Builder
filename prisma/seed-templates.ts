import { PrismaClient } from '@prisma/client';
import { ResumeTemplate } from '../types/resume';

const prisma = new PrismaClient();

const templates: Omit<ResumeTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Professional Classic',
    description: 'A clean, professional template suitable for most industries. Simple layout with emphasis on experience and skills.',
    thumbnail: '/templates/thumbnails/professional-classic.jpg',
    isActive: true,
    isPremium: false,
    category: 'professional',
    structure: {
      fontFamily: 'Inter, sans-serif',
      primaryColor: '#2563eb', // blue-600
      secondaryColor: '#1e40af', // blue-800
      sections: [
        'header',
        'summary',
        'experience',
        'education',
        'skills',
        'projects',
        'certifications'
      ],
      layout: 'standard'
    }
  },
  {
    name: 'Modern Split',
    description: 'Contemporary two-column layout with a sidebar for contact info and skills. Main section highlights experience and achievements.',
    thumbnail: '/templates/thumbnails/modern-split.jpg',
    isActive: true,
    isPremium: true,
    category: 'modern',
    structure: {
      fontFamily: 'Poppins, sans-serif',
      primaryColor: '#6d28d9', // purple-700
      secondaryColor: '#4c1d95', // purple-900
      sections: [
        'header',
        'summary',
        'experience',
        'education',
        'skills',
        'projects',
        'certifications'
      ],
      layout: 'split'
    }
  },
  {
    name: 'Creative Minimal',
    description: 'Bold, creative template with unique layout and typography. Perfect for design, marketing, and creative roles.',
    thumbnail: '/templates/thumbnails/creative-minimal.jpg',
    isActive: true,
    isPremium: true,
    category: 'creative',
    structure: {
      fontFamily: 'DM Sans, sans-serif',
      primaryColor: '#0f766e', // teal-700
      secondaryColor: '#134e4a', // teal-900
      sections: [
        'header',
        'summary',
        'skills',
        'experience',
        'projects',
        'education',
        'certifications'
      ],
      layout: 'minimal'
    }
  },
  {
    name: 'Executive Professional',
    description: 'Sophisticated template designed for executive and senior management positions. Emphasizes leadership and achievements.',
    thumbnail: '/templates/thumbnails/executive-professional.jpg',
    isActive: true,
    isPremium: false,
    category: 'professional',
    structure: {
      fontFamily: 'Libre Franklin, sans-serif',
      primaryColor: '#475569', // slate-600
      secondaryColor: '#334155', // slate-700
      sections: [
        'header',
        'summary',
        'experience',
        'education',
        'skills',
        'certifications'
      ],
      layout: 'standard'
    }
  }
];

async function seedTemplates() {
  console.log('Starting to seed templates...');
  
  try {
    // Delete existing templates if needed
    await prisma.template.deleteMany({});
    console.log('Cleared existing templates');
    
    for (const template of templates) {
      const createdTemplate = await prisma.template.create({
        data: template as any
      });
      console.log(`Created template with id: ${createdTemplate.id}`);
    }
    
    console.log('Templates seeding completed!');
  } catch (error) {
    console.error('Error seeding templates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// If this script is run directly
if (require.main === module) {
  seedTemplates()
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}

export { seedTemplates }; 