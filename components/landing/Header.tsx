'use client'
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 rounded-full p-1.5 group-hover:bg-blue-700 transition-all">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h3>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</Link>
          <Link href="/templates" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Templates</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonBox: "hover:bg-blue-50 rounded-full"
                  }
                }}
              />
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 