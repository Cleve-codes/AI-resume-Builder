import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-8">
          <svg className="mx-auto w-64 h-64" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M375 150H125V350H375V150Z"
              fill="#f1f5f9"
              stroke="#94a3b8"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M150 180H350M150 220H350M150 260H250M150 300H200"
              stroke="#94a3b8"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.circle
              cx="320"
              cy="280"
              r="40"
              fill="#f1f5f9"
              stroke="#7c3aed"
              strokeWidth="4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <motion.path
              d="M310 280L320 290L330 270"
              stroke="#7c3aed"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
          </svg>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
          <h2 className="text-2xl font-bold mb-3">Create Your First Resume</h2>
          <p className="text-muted-foreground mb-8">
            Get started by creating a new resume or uploading an existing one to enhance with AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/resume/create">
              <Button size="lg" className="gap-2 w-full">
                <Plus className="h-4 w-4" /> Create New Resume
              </Button>
            </Link>
            <Link href="/dashboard/upload">
            <Button variant="outline" size="lg" className="gap-2 w-full">
              <FileText className="h-4 w-4" /> Upload Existing Resume
            </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
