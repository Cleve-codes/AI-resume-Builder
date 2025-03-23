// Test script for resume API endpoints
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
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    return data;
  } else {
    const text = await response.text();
    console.log('Response text:', text);
    return text;
  }
}

// Login first to get auth cookie
async function login() {
  try {
    // Try to load saved credentials
    let email, password;
    try {
      const credentials = JSON.parse(fs.readFileSync('./test-credentials.json'));
      email = credentials.email;
      password = credentials.password;
      console.log(`\nUsing saved credentials: ${email}`);
    } catch (error) {
      // If no saved credentials, use defaults (you should change these if needed)
      email = 'test@example.com';
      password = 'password123';
      console.log(`\nNo saved credentials found, using defaults: ${email}`);
    }
    
    console.log(`\nLogging in with email: ${email}`);
    
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
    
    return { success: response.ok, userId: data.user?.id };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false };
  }
}

// Test getting all resumes for the user
async function testGetResumes() {
  console.log('\nTesting GET /resumes endpoint');
  
  try {
    const response = await fetch(`${baseUrl}/resumes`, {
      headers: {
        Cookie: cookies,
      },
    });
    
    const data = await logResponse(response, 'Get Resumes');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Get resumes test error:', error);
    return { success: false };
  }
}

// Test creating a new resume
async function testCreateResume() {
  console.log('\nTesting POST /resumes endpoint');
  
  try {
    const response = await fetch(`${baseUrl}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies,
      },
      body: JSON.stringify({
        title: `Test Resume ${Date.now()}`,
      }),
    });
    
    const data = await logResponse(response, 'Create Resume');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Create resume test error:', error);
    return { success: false };
  }
}

// Test getting a specific resume by ID
async function testGetResumeById(resumeId) {
  console.log(`\nTesting GET /resumes/${resumeId} endpoint`);
  
  try {
    const response = await fetch(`${baseUrl}/resumes/${resumeId}`, {
      headers: {
        Cookie: cookies,
      },
    });
    
    const data = await logResponse(response, 'Get Resume by ID');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Get resume by ID test error:', error);
    return { success: false };
  }
}

// Test updating a resume
async function testUpdateResume(resumeId) {
  console.log(`\nTesting PUT /resumes/${resumeId} endpoint`);
  
  try {
    const response = await fetch(`${baseUrl}/resumes/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies,
      },
      body: JSON.stringify({
        title: `Updated Resume ${Date.now()}`,
      }),
    });
    
    const data = await logResponse(response, 'Update Resume');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Update resume test error:', error);
    return { success: false };
  }
}

// Test analyzing a resume
async function testAnalyzeResume(resumeId) {
  console.log(`\nTesting POST /analyze-resume for resume ${resumeId}`);
  
  try {
    const response = await fetch(`${baseUrl}/analyze-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies,
      },
      body: JSON.stringify({
        resumeId,
        jobDescription: "Software Developer with experience in React, Node.js, and TypeScript. Must have 3+ years of experience."
      }),
    });
    
    const data = await logResponse(response, 'Analyze Resume');
    return { success: response.ok, data };
  } catch (error) {
    console.error('Analyze resume test error:', error);
    return { success: false };
  }
}

// Run all tests
async function runTests() {
  console.log('Starting Resume API tests...');
  
  // Login first
  const loginResult = await login();
  
  if (!loginResult.success) {
    console.log('Login failed, cannot proceed with resume tests');
    return;
  }
  
  // Test creating a resume
  const createResult = await testCreateResume();
  
  if (createResult.success && createResult.data && createResult.data.id) {
    const resumeId = createResult.data.id;
    
    // Test getting the resume
    await testGetResumeById(resumeId);
    
    // Test updating the resume
    await testUpdateResume(resumeId);
    
    // Test analyzing the resume
    await testAnalyzeResume(resumeId);
  }
  
  // Test getting all resumes
  await testGetResumes();
  
  console.log('\nResume API tests completed');
}

// Run the tests
runTests().catch(console.error); 