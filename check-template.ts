import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTemplate() {
  try {
    // The template ID from the error
    const templateId = 'cm8okde450001w7eflt5s2u1l';
    
    // Check if the template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });
    
    if (template) {
      console.log('Template found:', template);
    } else {
      console.log(`Template with ID ${templateId} not found.`);
    }
    
    // Check all available templates
    const allTemplates = await prisma.template.findMany();
    console.log(`Found ${allTemplates.length} templates in the database.`);
    allTemplates.forEach(t => {
      console.log(`- ID: ${t.id}, Name: ${t.name}, Category: ${t.category}`);
    });
    
  } catch (error) {
    console.error('Error checking template:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTemplate(); 