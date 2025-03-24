"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqTab() {
  const faqItems = [
    {
      question: "How do I create a new resume?",
      answer: "To create a new resume, navigate to the Dashboard and click on the \"Create New Resume\" button. You can either start from scratch or use one of our templates. You can also upload an existing resume and our AI will help you enhance it."
    },
    {
      question: "How does the job matching algorithm work?",
      answer: "Our job matching algorithm analyzes your resume and compares it with job descriptions to find the best matches. It considers your skills, experience, education, and keywords to calculate a match score. The higher the score, the better the match."
    },
    {
      question: "Can I export my resume to PDF?",
      answer: "Yes, you can export your resume to PDF format. Open the resume you want to export, click on the \"Export\" button, and select \"PDF\" from the dropdown menu. You can also customize the PDF settings before exporting."
    },
    {
      question: "How can I optimize my resume for ATS?",
      answer: "Our platform automatically analyzes your resume for ATS compatibility. To optimize your resume, follow the suggestions in the \"AI Analysis\" section. This includes using relevant keywords, proper formatting, and avoiding complex layouts or graphics that ATS systems might not read correctly."
    },
    {
      question: "What subscription plans do you offer?",
      answer: "We offer several subscription plans to meet different needs. The Free plan allows you to create one resume and apply to a limited number of jobs. The Premium plan offers unlimited resumes, advanced AI features, and priority support. The Enterprise plan includes team collaboration features and dedicated account management."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "To cancel your subscription, go to the Settings page, select the \"Billing\" tab, and click on \"Cancel Subscription.\" You'll continue to have access to premium features until the end of your current billing period."
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find answers to the most common questions about our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
