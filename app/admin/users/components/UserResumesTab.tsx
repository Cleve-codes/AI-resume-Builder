import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { User } from "../types";

interface UserResumesTabProps {
  user: User;
}

export function UserResumesTab({ user }: UserResumesTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">User Resumes</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Software Engineer Resume</p>
                <p className="text-xs text-muted-foreground">Last updated: Dec 10, 2023</p>
              </div>
            </div>
            <Badge variant="outline">85% Score</Badge>
          </div>

          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Product Manager Resume</p>
                <p className="text-xs text-muted-foreground">Last updated: Nov 28, 2023</p>
              </div>
            </div>
            <Badge variant="outline">78% Score</Badge>
          </div>

          <div className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">UX Designer Resume</p>
                <p className="text-xs text-muted-foreground">Last updated: Oct 15, 2023</p>
              </div>
            </div>
            <Badge variant="outline">92% Score</Badge>
          </div>
        </div>
      </div>
    </div>
  );
} 