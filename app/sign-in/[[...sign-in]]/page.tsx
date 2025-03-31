"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

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
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <h1 className="text-4xl font-bold">AI Resume Builder</h1>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <SignIn
                appearance={{
                  elements: {
                    footer: "hidden"
                  }
                }}
                fallbackRedirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </footer>
    </div>
  );
} 