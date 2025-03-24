"use client"

import { motion } from "framer-motion"
import { Send, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PopularResources } from "./PopularResources"
import type { ContactFormData } from "../hooks/useHelpPage"

interface ContactFormProps {
  contactFormData: ContactFormData
  onContactFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onContactFormSubmit: (e: React.FormEvent) => void
}

export function ContactForm({ contactFormData, onContactFormChange, onContactFormSubmit }: ContactFormProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Can't find what you're looking for? Send us a message and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onContactFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={contactFormData.name}
                onChange={onContactFormChange}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactFormData.email}
                onChange={onContactFormChange}
                placeholder="Your email address"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={contactFormData.subject}
                onChange={onContactFormChange}
                placeholder="What is your question about?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={contactFormData.message}
                onChange={onContactFormChange}
                placeholder="Please describe your issue or question in detail"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t pt-6">
          <h3 className="font-medium mb-2">Other Ways to Reach Us</h3>
          <div className="space-y-2 w-full">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">support@resumebuilder.com</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Live chat available 9am-5pm EST</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <PopularResources />
    </motion.div>
  )
}
