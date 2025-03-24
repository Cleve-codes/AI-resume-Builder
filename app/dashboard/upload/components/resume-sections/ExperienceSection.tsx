"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Work Experience</h3>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-6 border rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input defaultValue={exp.title} />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input defaultValue={exp.company} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue={exp.location} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input defaultValue={exp.startDate} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input defaultValue={exp.endDate} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue={exp.description} className="min-h-[100px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
