"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactInfoProps {
  contactInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
}

export function ContactInfoSection({ contactInfo }: ContactInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue={contactInfo.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={contactInfo.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" defaultValue={contactInfo.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue={contactInfo.location} />
        </div>
      </div>
    </div>
  )
}
