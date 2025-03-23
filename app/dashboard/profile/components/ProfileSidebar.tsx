"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Calendar, Upload } from "lucide-react"

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
    <Card className="lg:col-span-1 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-2 border-blue-100">
              {profile.profileImage ? (
                <AvatarImage src={profile.profileImage} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{getUserInitials(profile.name)}</AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold text-blue-900">{profile.name}</h2>
          <p className="text-muted-foreground mb-2">{profile.jobTitle}</p>
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            Free Plan
          </Badge>

          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Member since Nov 2023</span>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-blue-100" />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-blue-700">Account Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-blue-600">Resumes</div>
              <div className="text-xl font-bold text-blue-900">{statistics.resumesCreated}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-blue-600">Exports</div>
              <div className="text-xl font-bold text-blue-900">{statistics.resumesExported}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-blue-600">Analyses</div>
              <div className="text-xl font-bold text-blue-900">{statistics.analysesRun}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md hover:shadow-sm transition-shadow">
              <div className="text-xs text-blue-600">Last Active</div>
              <div className="text-sm font-medium text-blue-900">Today</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 