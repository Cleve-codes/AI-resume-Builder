"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header with back button */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 font-medium rounded-lg",
                card: "border border-blue-100 shadow-lg rounded-xl",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-500",
                socialButtonsIconButton: "border border-gray-300 hover:bg-gray-50",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                formFieldInput: "rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300",
                footerActionText: "text-gray-600",
                footerActionLink: "text-blue-600 hover:text-blue-800 hover:underline font-medium",
              },
            }}
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </footer>
    </div>
  );
} 