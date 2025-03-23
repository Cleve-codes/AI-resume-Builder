"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Download } from "lucide-react"

interface PrivacySettingsProps {
  privacy: {
    publicProfile: boolean;
    shareAnalytics: boolean;
    allowAiImprovement: boolean;
  };
  onPrivacyChange: (key: string, checked: boolean) => void;
}

export function PrivacySettings({ privacy, onPrivacyChange }: PrivacySettingsProps) {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Shield className="h-5 w-5 text-blue-500" /> Privacy Settings
        </CardTitle>
        <CardDescription>Control your data and privacy preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Public Profile</p>
            <p className="text-xs text-muted-foreground">
              Make your profile visible to recruiters and employers
            </p>
          </div>
          <Switch
            checked={privacy.publicProfile}
            onCheckedChange={(checked) => onPrivacyChange("publicProfile", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">Share Analytics</p>
            <p className="text-xs text-muted-foreground">
              Share anonymous usage data to help improve our service
            </p>
          </div>
          <Switch
            checked={privacy.shareAnalytics}
            onCheckedChange={(checked) => onPrivacyChange("shareAnalytics", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">AI Improvement</p>
            <p className="text-xs text-muted-foreground">
              Allow us to use your anonymized data to improve our AI models
            </p>
          </div>
          <Switch
            checked={privacy.allowAiImprovement}
            onCheckedChange={(checked) => onPrivacyChange("allowAiImprovement", checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        <Separator className="bg-blue-100" />
        <div>
          <Button 
            variant="outline" 
            className="w-full border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" /> Download My Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Request a copy of all your personal data stored in our system
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 