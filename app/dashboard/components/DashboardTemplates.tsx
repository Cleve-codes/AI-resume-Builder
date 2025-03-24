import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { TemplateCard } from "./TemplateCard"
import { useRouter } from "next/navigation"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

// Template IDs for the dashboard templates
const TEMPLATE_IDS = {
  Professional: "professional-template",
  Modern: "modern-template",
  Minimal: "minimal-template"
}

export function DashboardTemplates() {
  const router = useRouter()

  // Function to handle template selection
  const handleTemplateSelect = (templateName: string) => {
    // Get the template ID for the selected template
    const templateId = TEMPLATE_IDS[templateName as keyof typeof TEMPLATE_IDS]
    
    // Navigate to the resume creation page with the template ID as a query parameter
    router.push(`/dashboard/resume/create?templateId=${templateId}`)
  }

  return (
    <>
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <TemplateCard 
            name="Professional" 
            category="Traditional" 
            onClick={() => handleTemplateSelect("Professional")}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TemplateCard 
            name="Modern" 
            category="Creative" 
            onClick={() => handleTemplateSelect("Modern")}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TemplateCard 
            name="Minimal" 
            category="Clean" 
            onClick={() => handleTemplateSelect("Minimal")}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 text-center">
        <Button variant="link" className="gap-1">
          Browse all templates <ArrowUpRight className="h-3 w-3" />
        </Button>
      </motion.div>
    </>
  )
}
