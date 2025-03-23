'use client'
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 rounded-full p-1.5 group-hover:bg-blue-700 transition-all">
              <CircleIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h3>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 