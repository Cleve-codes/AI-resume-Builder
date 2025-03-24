"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, CreditCard, ArrowRight, DollarSign, Building, Zap } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function BillingInformation() {
  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" /> Billing Information
        </CardTitle>
        <CardDescription>Manage your subscription and payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <Zap className="h-4 w-4" /> Current Plan
            </h3>
            <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">Free Plan</span>
                  <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">Current</Badge>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white transition-colors">
                  Upgrade
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Basic features with limited resume exports and AI analyses
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>3 Resume Slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>5 PDF Exports/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Basic Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>3 AI Analyses/month</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <DollarSign className="h-4 w-4" /> Available Plans
            </h3>
            <div className="space-y-4">
              <div className="border border-border p-4 rounded-md hover:shadow-sm transition-shadow bg-white">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Pro Plan</span>
                    <Badge variant="outline" className="ml-2 border-primary/20 text-primary">
                      $9.99/month
                    </Badge>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white transition-colors">
                    Upgrade <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Advanced features with unlimited exports and priority support
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited Resumes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited PDF Exports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Premium Templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited AI Analyses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Version History</span>
                  </div>
                </div>
              </div>

              <div className="border border-border p-4 rounded-md hover:shadow-sm transition-shadow bg-white">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">Enterprise Plan</span>
                    <Badge variant="outline" className="ml-2 border-primary/20 text-primary">
                      Custom Pricing
                    </Badge>
                  </div>
                  <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                    Contact Sales
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Custom solutions for teams and organizations
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Team Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Custom Templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Dedicated Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Custom Integrations</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <CreditCard className="h-4 w-4" /> Payment Methods
            </h3>
            <div className="border border-border p-4 rounded-md mb-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">No payment methods added yet.</p>
            </div>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" /> Add Payment Method
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <Building className="h-4 w-4" /> Billing History
            </h3>
            <div className="border border-border p-4 rounded-md bg-muted/30">
              <p className="text-sm text-muted-foreground">No billing history available.</p>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
} 