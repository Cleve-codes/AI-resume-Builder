// Script to check Prisma connection
const { PrismaClient } = require('@prisma/client');

async function checkPrismaConnection() {
  console.log('Checking Prisma connection...');
  console.log('DATABASE_URL from env:', process.env.DATABASE_URL ? 'Found ✅' : 'Not found ❌');
  
  try {
    // Attempt to initialize Prisma client
    console.log('Initializing Prisma client...');
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/resume_builder?schema=public",
        },
      },
    });
    
    console.log('Prisma client initialized successfully ✅');
    
    // Try to connect to the database
    console.log('\nAttempting to connect to database...');
    await prisma.$connect();
    console.log('Database connection successful ✅');
    
    // Clean up
    await prisma.$disconnect();
    console.log('Disconnected from database');
  } catch (error) {
    console.error('Prisma error:', error);
  }
}

// Run the check
require('dotenv').config({ path: '../.env' });
checkPrismaConnection().catch(console.error); 