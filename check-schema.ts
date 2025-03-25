import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSchema() {
  try {
    // Print the available models and fields
    console.log('Checking Prisma schema...');
    
    // This will output available methods on the Prisma client
    console.log('Available models:', Object.keys(prisma));
    
    // Let's try to create a minimal template
    const template = await prisma.template.create({
      data: {
        name: 'Test Template',
        description: 'Test description',
        category: 'Test',
        thumbnail: '/test.jpg',
        isPremium: false,
        structure: { test: 'data' }
      }
    });
    
    console.log('Successfully created template:', template);
    
    // Clean up
    await prisma.template.delete({
      where: { id: template.id }
    });
    
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema(); 