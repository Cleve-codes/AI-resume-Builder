"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Github,
} from "lucide-react"

interface PersonalInfoFormProps {
  profile: {
    name: string;
    email: string;
    jobTitle: string;
    location: string;
    phone: string;
    websiteUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    bio: string;
  };
  isUpdating: boolean;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function PersonalInfoForm({ profile, isUpdating, onProfileChange, onSubmit }: PersonalInfoFormProps) {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-blue-700">Personal Information</CardTitle>
        <CardDescription>Update your personal information and contact details</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-blue-700">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-700">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-blue-700">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="text-blue-700">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={profile.websiteUrl}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="text-blue-700">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={profile.linkedinUrl}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-blue-700">GitHub</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={profile.githubUrl}
                  onChange={onProfileChange}
                  className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-blue-700">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={onProfileChange}
              className="min-h-[100px] border-blue-100 focus:border-blue-300 focus:ring-blue-200"
            />
            <p className="text-xs text-muted-foreground">
              A brief description of your professional background and expertise.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-blue-50 bg-blue-50/50">
          <Button 
            type="submit" 
            disabled={isUpdating} 
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 