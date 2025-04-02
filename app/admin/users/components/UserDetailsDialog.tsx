"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { User } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Edit, UserCog } from "lucide-react";
import { UserOverviewTab } from "./UserOverviewTab";
import { UserActivityTab } from "./UserActivityTab";
import { UserResumesTab } from "./UserResumesTab";
import { UserBillingTab } from "./UserBillingTab";

export interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'inactive':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'suspended':
        return 'bg-red-500 hover:bg-red-600';
      case 'pending':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{user.name}</DialogTitle>
                <DialogDescription>{user.email}</DialogDescription>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className={getStatusColor(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                  </Badge>
                  <Badge variant="secondary">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 self-start sm:self-auto mt-2 sm:mt-0">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit User</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="resumes">Resumes</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-2">
            <UserOverviewTab user={user} />
          </TabsContent>
          <TabsContent value="activity" className="mt-2">
            <UserActivityTab user={user} />
          </TabsContent>
          <TabsContent value="resumes" className="mt-2">
            <UserResumesTab user={user} />
          </TabsContent>
          <TabsContent value="billing" className="mt-2">
            <UserBillingTab user={user} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
