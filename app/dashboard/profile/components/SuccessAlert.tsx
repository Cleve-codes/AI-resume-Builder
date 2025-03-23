"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

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
  
  if (!message || !visible) return null
  
  return (
    <Alert className="mb-6 bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-sm animate-on-scroll">
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
} 