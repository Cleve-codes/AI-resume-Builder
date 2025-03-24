"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield, LogOut, KeyRound, Loader2 } from "lucide-react"

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
    <Card className="border-border shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Security Settings
        </CardTitle>
        <CardDescription>Manage your password and account security</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={onPasswordChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={onPasswordChange}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters and include a number and a special character.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={onPasswordChange}
                className="pl-10"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <Shield className="h-4 w-4" /> Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Protect your account with 2FA</p>
                <p className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                Enable 2FA
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
              <LogOut className="h-4 w-4" /> Account Sessions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md border border-border">
                <div>
                  <p className="text-sm font-medium">Current Session</p>
                  <p className="text-xs text-muted-foreground">San Francisco, CA • Chrome on macOS</p>
                </div>
                <Badge className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">Active</Badge>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout of All Sessions
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20">
          <Button 
            type="submit" 
            disabled={isUpdating}
            className="bg-primary hover:bg-primary/90 text-white transition-colors"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 