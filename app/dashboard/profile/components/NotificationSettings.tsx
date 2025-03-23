"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell } from "lucide-react"

interface NotificationSettingsProps {
  notifications: {
    emailUpdates: boolean;
    newTemplates: boolean;
    resumeTips: boolean;
    jobAlerts: boolean;
  };
  onNotificationChange: (key: string, checked: boolean) => void;
}

export function NotificationSettings({ notifications, onNotificationChange }: NotificationSettingsProps) {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Bell className="h-5 w-5 text-blue-500" /> Notification Settings
        </CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Email Updates</p>
            <p className="text-xs text-muted-foreground">Receive important account updates via email</p>
          </div>
          <Switch
            checked={notifications.emailUpdates}
            onCheckedChange={(checked) => onNotificationChange("emailUpdates", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">New Templates</p>
            <p className="text-xs text-muted-foreground">
              Get notified when new resume templates are available
            </p>
          </div>
          <Switch
            checked={notifications.newTemplates}
            onCheckedChange={(checked) => onNotificationChange("newTemplates", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Resume Tips</p>
            <p className="text-xs text-muted-foreground">Receive weekly tips to improve your resume</p>
          </div>
          <Switch
            checked={notifications.resumeTips}
            onCheckedChange={(checked) => onNotificationChange("resumeTips", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Job Alerts</p>
            <p className="text-xs text-muted-foreground">
              Get notified about job opportunities matching your profile
            </p>
          </div>
          <Switch
            checked={notifications.jobAlerts}
            onCheckedChange={(checked) => onNotificationChange("jobAlerts", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </CardContent>
    </Card>
  );
} 