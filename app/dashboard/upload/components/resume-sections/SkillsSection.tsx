"use client"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { X, Plus } from "lucide-react"

interface SkillsSectionProps {
  skills: string[]
}

export function SkillsSection({ skills: initialSkills }: SkillsSectionProps) {
  const [skills, setSkills] = useState<string[]>(initialSkills)
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Skills</h3>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} className="px-3 py-1 flex items-center gap-1">
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleAddSkill} size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Add relevant skills that showcase your expertise. Press Enter or click Add to add a skill.
        </p>
      </div>
    </div>
  )
}
