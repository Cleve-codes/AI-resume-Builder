"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Cloud, Database, Key, Lock, Mail, RefreshCw, Save, Server, Settings, Shield, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePageNotification } from "@/app/hooks/usePageNotification";

export default function SystemSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "AI Resume Builder",
    supportEmail: "support@airesumebuilder.com",
    maxFileSize: "5",
    defaultPlan: "free",
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    enforceStrongPasswords: true,
    requireEmailVerification: true,
    loginAttempts: "5",
    sessionTimeout: "30",
    enableTwoFactor: false,
  });
  
  const [aiSettings, setAiSettings] = useState({
    apiProvider: "openai",
    apiKey: "sk-••••••••••••••••••••••••",
    defaultModel: "gpt-4",
    maxTokens: "1000",
    temperature: "0.7",
    enableContentFilter: true,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@airesumebuilder.com",
    smtpPassword: "••••••••••••",
    senderName: "AI Resume Builder",
    senderEmail: "no-reply@airesumebuilder.com",
    enableTemplates: true,
  });

  // Show notification
  usePageNotification({
    title: "System Settings",
    description: "Configure application settings and preferences",
    duration: 4000,
    type: "info"
  });

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✅ Settings saved",
        description: "Your settings have been updated successfully",
      });
    }, 1000);
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset to default settings? This cannot be undone.")) {
      toast({
        title: "🔄 Settings reset",
        description: "All settings have been restored to their default values",
      });
    }
  };

  const handleTestEmailConfig = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✅ Email test successful",
        description: "A test email was sent successfully",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure global application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">AI Config</span>
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic application configuration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="siteName" className="text-right">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supportEmail" className="text-right">
                    Support Email
                  </Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxFileSize" className="text-right">
                    Max File Size (MB)
                  </Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={generalSettings.maxFileSize}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, maxFileSize: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="defaultPlan" className="text-right">
                    Default Plan
                  </Label>
                  <Select 
                    value={generalSettings.defaultPlan}
                    onValueChange={(value) =>
                      setGeneralSettings({ ...generalSettings, defaultPlan: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select default plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and authentication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enforceStrongPasswords">
                      Enforce Strong Passwords
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require passwords with at least 8 characters, numbers, and special characters
                    </p>
                  </div>
                  <Switch
                    id="enforceStrongPasswords"
                    checked={securitySettings.enforceStrongPasswords}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enforceStrongPasswords: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">
                      Require Email Verification
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email before accessing features
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={securitySettings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireEmailVerification: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="loginAttempts" className="text-right">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sessionTimeout" className="text-right">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTwoFactor">
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to set up 2FA for their accounts
                    </p>
                  </div>
                  <Switch
                    id="enableTwoFactor"
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Configure AI model settings and API connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apiProvider" className="text-right">
                    API Provider
                  </Label>
                  <Select 
                    value={aiSettings.apiProvider}
                    onValueChange={(value) =>
                      setAiSettings({ ...aiSettings, apiProvider: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select API provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="cohere">Cohere</SelectItem>
                      <SelectItem value="local">Local Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apiKey" className="text-right">
                    API Key
                  </Label>
                  <div className="col-span-3 flex">
                    <Input
                      id="apiKey"
                      type="password"
                      value={aiSettings.apiKey}
                      onChange={(e) =>
                        setAiSettings({ ...aiSettings, apiKey: e.target.value })
                      }
                      className="flex-1"
                    />
                    <Button variant="outline" className="ml-2">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="defaultModel" className="text-right">
                    Default Model
                  </Label>
                  <Select 
                    value={aiSettings.defaultModel}
                    onValueChange={(value) =>
                      setAiSettings({ ...aiSettings, defaultModel: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select default model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxTokens" className="text-right">
                    Max Tokens
                  </Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={aiSettings.maxTokens}
                    onChange={(e) =>
                      setAiSettings({ ...aiSettings, maxTokens: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="temperature" className="text-right">
                    Temperature
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aiSettings.temperature}
                    onChange={(e) =>
                      setAiSettings({ ...aiSettings, temperature: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableContentFilter">
                      Enable Content Filter
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Filter inappropriate content from AI responses
                    </p>
                  </div>
                  <Switch
                    id="enableContentFilter"
                    checked={aiSettings.enableContentFilter}
                    onCheckedChange={(checked) =>
                      setAiSettings({ ...aiSettings, enableContentFilter: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save AI Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email server settings and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtpServer" className="text-right">
                    SMTP Server
                  </Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpServer: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtpPort" className="text-right">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtpUsername" className="text-right">
                    SMTP Username
                  </Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtpPassword" className="text-right">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="senderName" className="text-right">
                    Sender Name
                  </Label>
                  <Input
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, senderName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="senderEmail" className="text-right">
                    Sender Email
                  </Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, senderEmail: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTemplates">
                      Enable Email Templates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use customizable email templates for notifications
                    </p>
                  </div>
                  <Switch
                    id="enableTemplates"
                    checked={emailSettings.enableTemplates}
                    onCheckedChange={(checked) =>
                      setEmailSettings({ ...emailSettings, enableTemplates: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTestEmailConfig}>
                <Mail className="mr-2 h-4 w-4" />
                Test Configuration
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Email Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system health and configuration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Database Connection</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Connected</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Server Status</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Running</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Email Service</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Operational</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Cloud className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Storage Service</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Connected</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>SSL Certificate</span>
              </div>
              <div className="flex items-center text-amber-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Expires in 30 days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 