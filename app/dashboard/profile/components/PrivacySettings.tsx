"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Download, Globe, BarChart, Sparkles } from "lucide-react"

interface PrivacySettingsProps {
  privacy: {
    publicProfile: boolean;
    shareAnalytics: boolean;
    allowAiImprovement: boolean;
  };
  onPrivacyChange: (key: string, checked: boolean) => void;
}

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function PrivacySettings({ privacy, onPrivacyChange }: PrivacySettingsProps) {
  return (
    <Card className="border-border shadow-sm overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Privacy Settings
        </CardTitle>
        <CardDescription>Control your data and privacy preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            <Globe className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Public Profile</p>
              <p className="text-xs text-muted-foreground">
                Make your profile visible to recruiters and employers
              </p>
            </div>
          </div>
          <Switch
            checked={privacy.publicProfile}
            onCheckedChange={(checked) => onPrivacyChange("publicProfile", checked)}
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
            <BarChart className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Share Analytics</p>
              <p className="text-xs text-muted-foreground">
                Share anonymous usage data to help improve our service
              </p>
            </div>
          </div>
          <Switch
            checked={privacy.shareAnalytics}
            onCheckedChange={(checked) => onPrivacyChange("shareAnalytics", checked)}
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
            <Sparkles className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">AI Improvement</p>
              <p className="text-xs text-muted-foreground">
                Allow us to use your anonymized data to improve our AI models
              </p>
            </div>
          </div>
          <Switch
            checked={privacy.allowAiImprovement}
            onCheckedChange={(checked) => onPrivacyChange("allowAiImprovement", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </motion.div>
        
        <Separator />
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Button 
            variant="outline" 
            className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" /> Download My Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Request a copy of all your personal data stored in our system
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
} 