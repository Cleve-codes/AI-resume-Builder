// Script to check environment variables
console.log('Checking environment variables...');
console.log('Current working directory:', process.cwd());

// Load environment variables from different sources
console.log('\nTrying to load from ./env');
require('dotenv').config({ path: './.env' });
console.log('DATABASE_URL after loading ./.env:', process.env.DATABASE_URL ? 'Found ✅' : 'Not found ❌');

// Reset DATABASE_URL to check .env.local
delete process.env.DATABASE_URL;

console.log('\nTrying to load from ./.env.local');
require('dotenv').config({ path: './.env.local' });
console.log('DATABASE_URL after loading ./.env.local:', process.env.DATABASE_URL ? 'Found ✅' : 'Not found ❌');

// Reset DATABASE_URL to check from project root
delete process.env.DATABASE_URL;

console.log('\nTrying to load from project root .env');
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(projectRoot, '.env') });
console.log('DATABASE_URL after loading from project root .env:', process.env.DATABASE_URL ? 'Found ✅' : 'Not found ❌');

// Reset DATABASE_URL to check from project root .env.local
delete process.env.DATABASE_URL;

console.log('\nTrying to load from project root .env.local');
require('dotenv').config({ path: path.join(projectRoot, '.env.local') });
console.log('DATABASE_URL after loading from project root .env.local:', process.env.DATABASE_URL ? 'Found ✅' : 'Not found ❌');

// Print all environment variables for debugging
console.log('\nAll environment variables:');
const envVars = Object.keys(process.env)
  .filter(key => key.startsWith('DATABASE_') || key.startsWith('NEXTAUTH_'))
  .reduce((obj, key) => {
    obj[key] = process.env[key];
    return obj;
  }, {});

console.log(envVars); 