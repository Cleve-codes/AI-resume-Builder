"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "../types";
import { formatDate } from "../utils/formatDate";

interface UserOverviewTabProps {
  user: User;
}

export function UserOverviewTab({ user }: UserOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h4 className="text-sm font-medium mb-4">User Information</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Full Name</div>
                <div className="font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="font-medium">
                  <Badge className={getStatusColor(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Role</div>
                <div className="font-medium">{user.role}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h4 className="text-sm font-medium mb-4">Account Details</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Join Date</div>
                <div className="font-medium">{formatDate(user.joinDate)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Last Active</div>
                <div className="font-medium">{formatDate(user.lastActive)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Subscription Plan</div>
                <div className="font-medium">{user.plan}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Resumes</div>
                <div className="font-medium">{user.resumes}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent className="p-4 sm:p-6">
          <h4 className="text-sm font-medium mb-4">Security Information</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Two-Factor Authentication</div>
                <div className="font-medium">Disabled</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email Verification</div>
                <div className="font-medium">Verified</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Password Last Changed</div>
                <div className="font-medium">30 days ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusColor(status: string) {
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
} 