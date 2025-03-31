import { Badge } from "@/components/ui/badge";
import { User } from "../types";
import { AlertTriangle, Shield, UserCheck, UserX } from "lucide-react";

interface StatusBadgeProps {
  status: User["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <UserCheck className="h-3 w-3 mr-1" /> Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          <AlertTriangle className="h-3 w-3 mr-1" /> Inactive
        </Badge>
      );
    case "suspended":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          <UserX className="h-3 w-3 mr-1" /> Suspended
        </Badge>
      );
    default:
      return null;
  }
}

interface PlanBadgeProps {
  plan: User["plan"];
}

export function PlanBadge({ plan }: PlanBadgeProps) {
  switch (plan) {
    case "free":
      return <Badge variant="outline">Free</Badge>;
    case "basic":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          Basic
        </Badge>
      );
    case "premium":
      return (
        <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
          <Shield className="h-3 w-3 mr-1" /> Premium
        </Badge>
      );
    case "enterprise":
      return (
        <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
          Enterprise
        </Badge>
      );
    default:
      return null;
  }
} 