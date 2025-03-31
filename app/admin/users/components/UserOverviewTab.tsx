"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "../types";
import { formatDate } from "../utils/formatDate";
import { Badge } from "@/components/ui/badge";

interface UserOverviewTabProps {
  user: User;
}

export function UserOverviewTab({ user }: UserOverviewTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`
                    ${user.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
                    ${user.status === 'inactive' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                    ${user.status === 'suspended' ? 'bg-red-500 hover:bg-red-600' : ''}
                    ${user.status === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  `}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="outline" className="font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Join Date</p>
              <p className="font-medium">{formatDate(user.joinDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Active</p>
              <p className="font-medium">{formatDate(user.lastActive)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subscription Plan</p>
              <Badge variant="secondary" className="font-medium">
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Resumes</p>
              <p className="font-medium">{user.resumes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Security Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">2FA Enabled</p>
              <Badge variant={user.role === 'admin' ? "default" : "secondary"} className="font-medium">
                {user.role === 'admin' ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Verified</p>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600 font-medium">
                Yes
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 