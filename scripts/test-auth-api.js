// Test script for authentication API endpoints
const fetch = require('node-fetch');
const fs = require('fs');

// Base URL for the API
const baseUrl = 'http://localhost:3000/api';

// Store auth cookies between requests
let cookies = '';

// Helper function to log responses
async function logResponse(response, label) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  console.log(`\n--- ${label} ---`);
  console.log(`Status: ${response.status} ${response.statusText}`);
  
  if (isJson) {
    try {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      const text = await response.text();
      console.log('Response text:', text);
      return text;
    }
  } else {
    const text = await response.text();
    console.log('Response text:', text);
    return text;
  }
}

// Test registration
async function testRegister() {
  const email = `test${Date.now()}@example.com`;
  const password = 'password123';
  
  console.log(`\nTesting registration with email: ${email}`);
  
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name: 'Test User',
      }),
    });
    
    const data = await logResponse(response, 'Register');
    
    if (response.ok) {
      // Save the credentials for other tests
      fs.writeFileSync('./test-credentials.json', JSON.stringify({ email, password }));
      console.log('Credentials saved to test-credentials.json');
    }
    
    return { success: response.ok, email, password };
  } catch (error) {
    console.error('Registration test error:', error);
    return { success: false };
  }
}

// Test login
async function testLogin(email, password) {
  if (!email || !password) {
    try {
      const credentials = JSON.parse(fs.readFileSync('./test-credentials.json'));
      email = credentials.email;
      password = credentials.password;
      console.log(`\nUsing saved credentials: ${email}`);
    } catch (error) {
      console.error('No saved credentials found');
      return { success: false };
    }
  }
  
  console.log(`\nTesting login with email: ${email}`);
  
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    const data = await logResponse(response, 'Login');
    
    // Save cookies for subsequent requests
    if (response.headers.get('set-cookie')) {
      cookies = response.headers.get('set-cookie');
      console.log('Cookies received and saved');
    }
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('Login test error:', error);
    return { success: false };
  }
}

// Test me endpoint
async function testMe() {
  console.log('\nTesting /me endpoint');
  
  try {
    const response = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        Cookie: cookies,
      },
    });
    
    const data = await logResponse(response, 'Me');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Me endpoint test error:', error);
    return { success: false };
  }
}

// Test logout
async function testLogout() {
  console.log('\nTesting logout');
  
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Cookie: cookies,
      },
    });
    
    const data = await logResponse(response, 'Logout');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Logout test error:', error);
    return { success: false };
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  
  // Test me endpoint first to see what happens without auth
  console.log('\nTesting /me endpoint without authentication:');
  await testMe();
  
  // Test registration
  const registerResult = await testRegister();
  
  // Test login (with new credentials if registration was successful)
  const loginResult = await testLogin(
    registerResult.success ? registerResult.email : null,
    registerResult.success ? registerResult.password : null
  );
  
  // Test me endpoint if login was successful
  if (loginResult.success) {
    await testMe();
    
    // Test logout
    await testLogout();
    
    // Test me endpoint again after logout
    console.log('\nTesting /me endpoint after logout:');
    await testMe();
  }
  
  console.log('\nAPI tests completed');
}

// Run the tests
runTests().catch(console.error); 