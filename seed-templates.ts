import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTemplates() {
  console.log('Creating templates...');
  
  try {
    // Clear existing templates
    await prisma.template.deleteMany({});
    
    // Create templates with all required fields
    const templates = await Promise.all([
      prisma.template.create({
        data: {
          name: 'Modern Professional',
          description: 'Clean, professional template with a modern touch.',
          category: 'Professional',
          thumbnail: '/templates/thumbnails/professional.jpg',
          isPremium: false,
          structure: {
            header: {
              type: 'header',
              elements: ['name', 'title', 'contact']
            },
            body: {
              type: 'columns',
              columns: [
                {
                  width: 0.7,
                  sections: ['summary', 'experience', 'education']
                },
                {
                  width: 0.3,
                  sections: ['skills']
                }
              ]
            }
          }
        },
      }),
      prisma.template.create({
        data: {
          name: 'Creative Designer',
          description: 'Unique template for creative professionals.',
          category: 'Creative',
          thumbnail: '/templates/thumbnails/creative.jpg',
          isPremium: true,
          structure: {
            header: {
              type: 'sidebar',
              width: 0.3,
              elements: ['name', 'photo', 'contact', 'skills']
            },
            body: {
              type: 'main',
              width: 0.7,
              sections: ['summary', 'experience']
            }
          }
        },
      }),
      prisma.template.create({
        data: {
          name: 'Executive',
          description: 'Sophisticated template for executives and senior managers.',
          category: 'Professional',
          thumbnail: '/templates/thumbnails/executive.jpg',
          isPremium: true,
          structure: {
            header: {
              type: 'header',
              elements: ['name', 'title', 'contact']
            },
            body: {
              type: 'sections',
              sections: ['summary', 'experience', 'education', 'skills']
            }
          }
        },
      }),
    ]);
    
    console.log(`Created ${templates.length} templates:`);
    templates.forEach(template => {
      console.log(`- ${template.name} (${template.category}) - ${template.thumbnail}`);
    });
    
  } catch (error) {
    console.error('Error seeding templates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTemplates(); 