import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testResumeCreation() {
  try {
    // The template ID from the error
    const templateId = 'cm8okde450001w7eflt5s2u1l';
    
    // Check if the template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });
    
    if (!template) {
      console.log(`Template with ID ${templateId} not found.`);
      return;
    }
    
    console.log('Template found:', template);
    
    // Create a test user if needed
    const testUser = await prisma.user.findFirst();
    
    if (!testUser) {
      console.log('No users found in the database. Cannot test resume creation.');
      return;
    }
    
    console.log('Using user:', testUser.id);
    
    // Attempt to create a resume
    const resumeTitle = `Test Resume (${new Date().toLocaleDateString()})`;
    const slug = `test-resume-${Date.now()}`;
    
    // Define the data to create a resume
    const resumeData = {
      title: resumeTitle,
      slug: slug,
      userId: testUser.id,
      templateId: template.id,
      status: "draft" as const,
    };
    
    console.log('Attempting to create resume with data:', resumeData);
    
    // Create a new resume with the template
    const resume = await prisma.resume.create({
      data: resumeData,
    });
    
    console.log('Resume created successfully:', resume);
    
  } catch (error) {
    console.error('Error testing resume creation:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}, message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testResumeCreation(); 