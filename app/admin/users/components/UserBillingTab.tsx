import { Badge } from "@/components/ui/badge";
import { User } from "../types";

interface UserBillingTabProps {
  user: User;
}

export function UserBillingTab({ user }: UserBillingTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Billing Information</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md">
              <div className="text-xs text-muted-foreground">Current Plan</div>
              <div className="text-base font-medium">{user.plan}</div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-xs text-muted-foreground">Next Payment</div>
              <div className="text-base font-medium">$15.00</div>
            </div>
            <div className="p-3 border rounded-md">
              <div className="text-xs text-muted-foreground">Payment Status</div>
              <div>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h4 className="text-sm font-medium mb-4">Payment History</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Amount</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-left py-2 font-medium">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Dec 15, 2023</td>
                <td className="py-2">$15.00</td>
                <td className="py-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Paid
                  </Badge>
                </td>
                <td className="py-2">Visa •••• 4242</td>
              </tr>
              <tr>
                <td className="py-2">Nov 15, 2023</td>
                <td className="py-2">$15.00</td>
                <td className="py-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Paid
                  </Badge>
                </td>
                <td className="py-2">Visa •••• 4242</td>
              </tr>
              <tr>
                <td className="py-2">Oct 15, 2023</td>
                <td className="py-2">$15.00</td>
                <td className="py-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Paid
                  </Badge>
                </td>
                <td className="py-2">Visa •••• 4242</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 