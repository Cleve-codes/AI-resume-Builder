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
  Save,
  Loader2
} from "lucide-react"

interface PersonalInfoFormProps {
  profile: {
    name: string;
    email: string;
    jobTitle: string | null;
    location: string | null;
    phone: string | null;
    websiteUrl: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
    bio: string | null;
  };
  isUpdating: boolean;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function PersonalInfoForm({ profile, isUpdating, onProfileChange, onSubmit }: PersonalInfoFormProps) {
  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Personal Information
        </CardTitle>
        <CardDescription>Update your personal information and contact details</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={profile.jobTitle || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="location"
                  name="location"
                  value={profile.location || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="phone"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={profile.websiteUrl || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={profile.linkedinUrl || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={profile.githubUrl || ""}
                  onChange={onProfileChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio || ""}
              onChange={onProfileChange}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              A brief description of your professional background and expertise.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20">
          <Button 
            type="submit" 
            disabled={isUpdating} 
            className="bg-primary hover:bg-primary/90 text-white transition-colors"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 