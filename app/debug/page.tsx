"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export default function DebugPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [debugKey, setDebugKey] = useState("");
  const [logOutput, setLogOutput] = useState<string[]>([]);
  
  // Debug form states
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: ""
  });
  
  const [registerResult, setRegisterResult] = useState<any>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  // Database test results
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation to avoid showing debug page to unauthorized users
    setIsAuthorized(debugKey === process.env.NEXT_PUBLIC_DEBUG_KEY);
  };
  
  const logMessage = (message: string) => {
    setLogOutput((prev) => [...prev, `[${new Date().toISOString()}] ${message}`]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };
  
  const testDatabase = async () => {
    setDbStatus(null);
    setDbError(null);
    logMessage("Testing database connection...");
    
    try {
      const response = await fetch(`/api/debug/database?key=${debugKey}`);
      const data = await response.json();
      
      setDbStatus(data);
      logMessage(`Database test ${data.status === 'success' ? 'succeeded' : 'failed'}`);
    } catch (error) {
      console.error("Database test error:", error);
      setDbError(error instanceof Error ? error.message : "Unknown error occurred");
      logMessage(`Database test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  const testRegistration = async () => {
    setRegisterResult(null);
    setRegisterError(null);
    logMessage(`Testing registration with email: ${registerData.email}`);
    
    try {
      const response = await fetch(`/api/debug/auth/register?key=${debugKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      
      const data = await response.json();
      setRegisterResult(data);
      logMessage(`Registration test ${data.status === 'success' ? 'succeeded' : 'failed'}`);
    } catch (error) {
      console.error("Registration test error:", error);
      setRegisterError(error instanceof Error ? error.message : "Unknown error occurred");
      logMessage(`Registration test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  if (!isAuthorized) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Debug Access</CardTitle>
            <CardDescription>Enter debug key to access this page</CardDescription>
          </CardHeader>
          <form onSubmit={handleAuthSubmit}>
            <CardContent>
              <Input
                type="password"
                placeholder="Debug key"
                value={debugKey}
                onChange={(e) => setDebugKey(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Access Debug Tools</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Console</h1>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This page is for debugging purposes only. Do not use on production servers.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="database">
        <TabsList className="mb-4">
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection Test</CardTitle>
              <CardDescription>Test connection to your database</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={testDatabase}>Test Database Connection</Button>
              
              {dbStatus && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Results:</h3>
                  <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto max-h-60">
                    {JSON.stringify(dbStatus, null, 2)}
                  </pre>
                </div>
              )}
              
              {dbError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{dbError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle>Registration Test</CardTitle>
              <CardDescription>Test user registration with debug mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <Input 
                  name="email"
                  value={registerData.email}
                  onChange={handleInputChange}
                  placeholder="test@example.com"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Password</label>
                <Input 
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <Input 
                  name="name"
                  value={registerData.name}
                  onChange={handleInputChange}
                  placeholder="Test User"
                />
              </div>
              
              <Button onClick={testRegistration} className="mt-4">Test Registration</Button>
              
              {registerResult && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Results:</h3>
                  <pre className="bg-slate-100 p-4 rounded text-sm overflow-auto max-h-60">
                    {JSON.stringify(registerResult, null, 2)}
                  </pre>
                </div>
              )}
              
              {registerError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{registerError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Debug Logs</CardTitle>
              <CardDescription>Log output from debug operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-60 overflow-auto">
                {logOutput.length === 0 ? (
                  <p>No logs yet. Run some tests to see output.</p>
                ) : (
                  logOutput.map((log, index) => <div key={index}>{log}</div>)
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setLogOutput([])}>Clear Logs</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 