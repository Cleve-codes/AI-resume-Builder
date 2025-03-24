"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TroubleshootingTab() {
  const troubleshootingItems = [
    {
      id: "issue-1",
      indicator: "red",
      question: "I can't log in to my account",
      answer: (
        <div className="space-y-2">
          <p>If you're having trouble logging in, try these steps:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure you're using the correct email address</li>
            <li>Check that Caps Lock is turned off</li>
            <li>Clear your browser cache and cookies</li>
            <li>Try using a different browser</li>
            <li>Click on "Forgot Password" to reset your password</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            If you still can't log in, please contact our support team.
          </p>
        </div>
      )
    },
    {
      id: "issue-2",
      indicator: "amber",
      question: "My resume isn't being saved",
      answer: (
        <div className="space-y-2">
          <p>If your resume isn't saving properly:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Check your internet connection</li>
            <li>Make sure you're clicking the "Save" button after making changes</li>
            <li>Try refreshing the page (your changes might be auto-saved)</li>
            <li>Clear your browser cache and try again</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            We automatically save your work every few minutes, but it's always good practice to manually
            save important changes.
          </p>
        </div>
      )
    },
    {
      id: "issue-3",
      indicator: "blue",
      question: "PDF export looks different than the preview",
      answer: (
        <div className="space-y-2">
          <p>If your exported PDF looks different from the preview:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure all fonts are properly loaded before exporting</li>
            <li>Check that you haven't exceeded page limits for your template</li>
            <li>Some special formatting may render differently in PDF format</li>
            <li>Try using a different template if the issue persists</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            For best results, use our recommended templates that are optimized for PDF export.
          </p>
        </div>
      )
    },
    {
      id: "issue-4",
      indicator: "green",
      question: "AI analysis isn't working",
      answer: (
        <div className="space-y-2">
          <p>If the AI analysis feature isn't working:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure your resume has enough content for analysis</li>
            <li>Check that you haven't reached your plan's AI analysis limit</li>
            <li>Try refreshing the page or waiting a few minutes</li>
            <li>Ensure your resume is in a supported language</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            Our AI analysis works best with resumes that have at least one work experience entry and a
            skills section.
          </p>
        </div>
      )
    },
    {
      id: "issue-5",
      indicator: "purple",
      question: "Job matching shows no results",
      answer: (
        <div className="space-y-2">
          <p>If you're not seeing any job matches:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure your resume has detailed skills and experience sections</li>
            <li>Try broadening your job search filters</li>
            <li>Check that your location settings are correct</li>
            <li>Add more relevant keywords to your resume</li>
            <li>Wait 24 hours for our system to process new job listings</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            Our job matching algorithm works best when your resume contains specific skills and detailed
            work experience.
          </p>
        </div>
      )
    }
  ]

  const getIndicatorClasses = (indicator: string) => {
    switch (indicator) {
      case 'red':
        return {
          bg: "bg-red-100 dark:bg-red-900/20",
          dot: "bg-red-500"
        }
      case 'amber':
        return {
          bg: "bg-amber-100 dark:bg-amber-900/20",
          dot: "bg-amber-500"
        }
      case 'blue':
        return {
          bg: "bg-blue-100 dark:bg-blue-900/20",
          dot: "bg-blue-500"
        }
      case 'green':
        return {
          bg: "bg-green-100 dark:bg-green-900/20",
          dot: "bg-green-500"
        }
      case 'purple':
        return {
          bg: "bg-purple-100 dark:bg-purple-900/20",
          dot: "bg-purple-500"
        }
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/20",
          dot: "bg-gray-500"
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Troubleshooting</CardTitle>
        <CardDescription>Solutions to common issues you might encounter</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {troubleshootingItems.map((item) => {
            const classes = getIndicatorClasses(item.indicator)
            return (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <div className="flex items-center text-left">
                    <div className={`mr-2 p-1 rounded-full ${classes.bg}`}>
                      <span className={`block h-2 w-2 rounded-full ${classes.dot}`}></span>
                    </div>
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Still having issues?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you couldn't find a solution to your problem, our support team is ready to help.
          </p>
          <Button variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
