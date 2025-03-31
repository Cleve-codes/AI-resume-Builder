import { Badge } from "@/components/ui/badge";
import { Download, Edit, FileText, Zap } from "lucide-react";
import { User } from "../types";

interface UserActivityTabProps {
  user: User;
}

export function UserActivityTab({ user }: UserActivityTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Recent Activity</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm">Created a new resume</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Download className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm">Downloaded resume as PDF</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Zap className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-sm">Upgraded to Premium plan</p>
              <p className="text-xs text-muted-foreground">1 week ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Edit className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm">Updated profile information</p>
              <p className="text-xs text-muted-foreground">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Login History</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Today, 2:30 PM</p>
              <p className="text-xs text-muted-foreground">Chrome on Windows</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Success
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Yesterday, 10:15 AM</p>
              <p className="text-xs text-muted-foreground">Safari on macOS</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Success
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Dec 12, 2023, 8:45 PM</p>
              <p className="text-xs text-muted-foreground">Firefox on Windows</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Success
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
} 