import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTemplates() {
  try {
    const templates = await prisma.template.findMany();
    console.log(`Found ${templates.length} templates in the database:`);
    
    templates.forEach(template => {
      console.log(`- ${template.name} (${template.category}) - Thumbnail: ${template.thumbnail || 'None'}`);
    });
    
    if (templates.length === 0) {
      console.log('No templates found in the database. This explains the "No templates found" message.');
    }
  } catch (error) {
    console.error('Error fetching templates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTemplates(); 