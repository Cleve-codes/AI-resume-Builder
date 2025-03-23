// Setup database script for resume builder application
const { Client } = require('pg');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

let databaseUrl = process.env.DATABASE_URL;
console.log('Current DATABASE_URL:', databaseUrl || 'Not found');

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not found in environment variables.');
  console.log('Please ensure your .env.local file has a valid DATABASE_URL');
  process.exit(1);
}

// Parse the connection string
const connectionMatch = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)(\?.*)?/);
if (!connectionMatch) {
  console.error('❌ Invalid DATABASE_URL format. Expected: postgresql://username:password@host:port/database');
  process.exit(1);
}

const [, username, password, host, port, database, queryParams] = connectionMatch;

async function setupDatabase() {
  console.log('🔍 Checking PostgreSQL connection...');
  
  // Try connecting to PostgreSQL server first (without specific database)
  const pgClient = new Client({
    user: username,
    password: password,
    host: host,
    port: parseInt(port),
    database: 'postgres', // Connect to default postgres database first
  });

  try {
    await pgClient.connect();
    console.log('✅ Successfully connected to PostgreSQL server');
    
    // Check if our database exists
    const res = await pgClient.query(
      "SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1) as exists",
      [database]
    );
    
    const databaseExists = res.rows[0].exists;
    if (databaseExists) {
      console.log(`✅ Database '${database}' already exists`);
    } else {
      console.log(`⚠️ Database '${database}' does not exist. Attempting to create...`);
      
      // Create the database
      await pgClient.query(`CREATE DATABASE ${database}`);
      console.log(`✅ Database '${database}' created successfully`);
    }
    
    // Close connection to server
    await pgClient.end();
    
    // Run Prisma migrations
    console.log('\n🔄 Running Prisma migrations...');
    try {
      execSync('npx prisma migrate dev --name init', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      console.log('✅ Prisma migrations completed successfully');
    } catch (error) {
      console.error('❌ Error running Prisma migrations:', error.message);
    }
    
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error.message);
    console.log('\n📋 Troubleshooting checklist:');
    console.log('1. Is PostgreSQL server running? Try: sudo service postgresql status');
    console.log('2. Are the username and password correct in .env.local?');
    console.log('3. Is PostgreSQL configured to accept connections on localhost?');
    console.log('4. Try connecting manually: psql -U postgres -h localhost');
    await pgClient.end().catch(() => {});
  }
}

setupDatabase().catch(console.error); 