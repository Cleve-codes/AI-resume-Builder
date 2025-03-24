"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Education {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
}

interface EducationSectionProps {
  educations: Education[]
}

export function EducationSection({ educations }: EducationSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Education</h3>
      {educations.map((edu, index) => (
        <div key={index} className="mb-6 border rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input defaultValue={edu.degree} />
            </div>
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input defaultValue={edu.institution} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue={edu.location} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Year</Label>
                <Input defaultValue={edu.startDate} />
              </div>
              <div className="space-y-2">
                <Label>End Year</Label>
                <Input defaultValue={edu.endDate} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
