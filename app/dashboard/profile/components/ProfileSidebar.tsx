"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Calendar, Upload, User, BarChart, Clock } from "lucide-react"

interface ProfileSidebarProps {
  profile: {
    name: string;
    email: string;
    jobTitle: string;
    location: string;
    profileImage?: string;
  };
  statistics: {
    resumesCreated: number;
    resumesExported: number;
    analysesRun: number;
    lastActive: string;
  };
}

export function ProfileSidebar({ profile, statistics }: ProfileSidebarProps) {
  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    if (!name) return "U";
    
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-border">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              {profile.profileImage ? (
                <AvatarImage src={profile.profileImage} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-xl bg-primary/10 text-primary">{getUserInitials(profile.name)}</AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-muted-foreground mb-2">{profile.jobTitle}</p>
          <Badge variant="outline" className="mb-4 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
            Free Plan
          </Badge>

          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Member since Nov 2023</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-primary flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/5 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-primary/70">Resumes</div>
              <div className="text-xl font-bold">{statistics.resumesCreated}</div>
            </div>
            <div className="bg-primary/5 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-primary/70">Exports</div>
              <div className="text-xl font-bold">{statistics.resumesExported}</div>
            </div>
            <div className="bg-primary/5 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-primary/70">Analyses</div>
              <div className="text-xl font-bold">{statistics.analysesRun}</div>
            </div>
            <div className="bg-primary/5 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-primary/70 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last Active
              </div>
              <div className="text-sm font-medium">Today</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 