"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, LogOut } from "lucide-react"

interface SecuritySettingsProps {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  isUpdating: boolean;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function SecuritySettings({
  passwordData,
  isUpdating,
  onPasswordChange,
  onSubmit,
}: SecuritySettingsProps) {
  return (
    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-blue-700 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" /> Security Settings
        </CardTitle>
        <CardDescription>Manage your password and account security</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-blue-700">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={onPasswordChange}
                className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-blue-700">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={onPasswordChange}
                className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters and include a number and a special character.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-blue-700">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={onPasswordChange}
                className="pl-10 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>
          </div>

          <Separator className="bg-blue-100" />

          <div>
            <h3 className="text-sm font-medium mb-3 text-blue-700">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Protect your account with 2FA</p>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" className="border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Enable 2FA
              </Button>
            </div>
          </div>

          <Separator className="bg-blue-100" />

          <div>
            <h3 className="text-sm font-medium mb-3 text-blue-700">Account Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-100">
                <div>
                  <p className="text-sm font-medium">Current Session</p>
                  <p className="text-xs text-muted-foreground">San Francisco, CA • Chrome on macOS</p>
                </div>
                <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">Active</Badge>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout of All Sessions
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-blue-50 bg-blue-50/50">
          <Button 
            type="submit" 
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {isUpdating ? "Updating..." : "Change Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 