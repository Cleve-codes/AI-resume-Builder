import { Badge } from "@/components/ui/badge";
import { User } from "../types";
import { PlanBadge } from "./UserBadges";

interface UserBillingTabProps {
  user: User;
}

export function UserBillingTab({ user }: UserBillingTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Billing Information</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Plan:</span>
            <span className="text-sm"><PlanBadge plan={user.plan} /></span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Billing Cycle:</span>
            <span className="text-sm">Monthly</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="text-sm">$24.99/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Next Billing Date:</span>
            <span className="text-sm">January 15, 2024</span>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Payment Method</h4>
        <div className="flex items-center gap-3 p-3 border rounded-md">
          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-medium">VISA</span>
          </div>
          <div>
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/2025</p>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Billing History</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">December 15, 2023</p>
              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">$24.99</p>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Paid
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">November 15, 2023</p>
              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">$24.99</p>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Paid
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">October 15, 2023</p>
              <p className="text-xs text-muted-foreground">Premium Plan - Monthly</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">$24.99</p>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Paid
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 