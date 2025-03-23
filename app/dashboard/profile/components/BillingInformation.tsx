"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard } from "lucide-react"

export function BillingInformation() {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <CreditCard className="h-5 w-5 text-blue-500" /> Billing Information
        </CardTitle>
        <CardDescription>Manage your subscription and payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-blue-700">Current Plan</h3>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-medium text-blue-900">Free Plan</span>
                <Badge className="ml-2 bg-blue-200 text-blue-800 hover:bg-blue-300 border-blue-300">Current</Badge>
              </div>
              <Button variant="outline" className="border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Upgrade
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Basic features with limited resume exports and AI analyses
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>3 Resume Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>5 PDF Exports/month</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Basic Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>3 AI Analyses/month</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-blue-700">Available Plans</h3>
          <div className="space-y-4">
            <div className="border border-blue-100 p-4 rounded-md hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium text-blue-900">Pro Plan</span>
                  <Badge variant="outline" className="ml-2 border-blue-200 text-blue-600">
                    $9.99/month
                  </Badge>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  Upgrade
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Advanced features with unlimited exports and priority support
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Unlimited Resumes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Unlimited PDF Exports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Premium Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Unlimited AI Analyses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Version History</span>
                </div>
              </div>
            </div>

            <div className="border border-blue-100 p-4 rounded-md hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium text-blue-900">Enterprise Plan</span>
                  <Badge variant="outline" className="ml-2 border-blue-200 text-blue-600">
                    Custom Pricing
                  </Badge>
                </div>
                <Button variant="outline" className="border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Contact Sales
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Custom solutions for teams and organizations
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Team Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Custom Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Dedicated Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Custom Integrations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-blue-700">Payment Methods</h3>
          <div className="border border-blue-100 p-4 rounded-md mb-4">
            <p className="text-sm text-muted-foreground">No payment methods added yet.</p>
          </div>
          <Button variant="outline" className="border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" /> Add Payment Method
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-blue-700">Billing History</h3>
          <div className="border border-blue-100 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">No billing history available.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 