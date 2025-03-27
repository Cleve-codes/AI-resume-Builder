'use client';

import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useClerk } from '@clerk/nextjs';

export default function AuthMigrationNotice() {
  const [showNotice, setShowNotice] = useState(false);
  const { openSignIn } = useClerk();
  
  useEffect(() => {
    // Check if the user should see the migration notice
    // This could be based on localStorage or a cookie
    const hasSeenMigrationNotice = localStorage.getItem('auth_migration_dismissed');
    const hasOldAuthToken = document.cookie.includes('auth_token=');
    
    if (!hasSeenMigrationNotice && hasOldAuthToken) {
      setShowNotice(true);
    }
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem('auth_migration_dismissed', 'true');
    setShowNotice(false);
  };
  
  const handleSignIn = () => {
    openSignIn({
      afterSignInUrl: '/dashboard',
    });
    handleDismiss();
  };
  
  if (!showNotice) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert className="border-l-4 border-blue-500 shadow-lg">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <AlertTitle>Authentication System Updated</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">
            We've improved our authentication system for better security and features. 
            Please sign in again to continue using all features.
          </p>
          <div className="flex gap-2 mt-2">
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSignIn}
            >
              Sign in now
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDismiss}
            >
              Remind me later
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
} 