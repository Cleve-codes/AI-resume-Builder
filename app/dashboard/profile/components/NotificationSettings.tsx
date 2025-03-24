"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, AlertCircle, BookOpen, Briefcase } from "lucide-react"

interface NotificationSettingsProps {
  notifications: {
    emailUpdates: boolean;
    newTemplates: boolean;
    resumeTips: boolean;
    jobAlerts: boolean;
  };
  onNotificationChange: (key: string, checked: boolean) => void;
}

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function NotificationSettings({ notifications, onNotificationChange }: NotificationSettingsProps) {
  return (
    <Card className="border-border shadow-sm overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" /> Notification Settings
        </CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            <Mail className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Email Updates</p>
              <p className="text-xs text-muted-foreground">Receive important account updates via email</p>
            </div>
          </div>
          <Switch
            checked={notifications.emailUpdates}
            onCheckedChange={(checked) => onNotificationChange("emailUpdates", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
        
        <Separator />
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">New Templates</p>
              <p className="text-xs text-muted-foreground">
                Get notified when new resume templates are available
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.newTemplates}
            onCheckedChange={(checked) => onNotificationChange("newTemplates", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
        
        <Separator />
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            <BookOpen className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Resume Tips</p>
              <p className="text-xs text-muted-foreground">Receive weekly tips to improve your resume</p>
            </div>
          </div>
          <Switch
            checked={notifications.resumeTips}
            onCheckedChange={(checked) => onNotificationChange("resumeTips", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
        
        <Separator />
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            <Briefcase className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Job Alerts</p>
              <p className="text-xs text-muted-foreground">
                Get notified about job opportunities matching your profile
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.jobAlerts}
            onCheckedChange={(checked) => onNotificationChange("jobAlerts", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
      </CardContent>
    </Card>
  );
} 