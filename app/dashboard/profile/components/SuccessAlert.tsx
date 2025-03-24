"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SuccessAlertProps {
  message: string;
  autoHideDuration?: number;
}

export function SuccessAlert({ message, autoHideDuration = 3000 }: SuccessAlertProps) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    if (message) {
      setVisible(true)
      
      const timer = setTimeout(() => {
        setVisible(false)
      }, autoHideDuration)
      
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [message, autoHideDuration])
  
  if (!message) return null
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="mb-6 bg-primary/10 text-primary border-primary/20 shadow-sm">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </div>
              <button onClick={() => setVisible(false)} className="text-primary/60 hover:text-primary transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 