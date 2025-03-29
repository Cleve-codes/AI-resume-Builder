"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
  type?: "default" | "success" | "info" | "warning" | "error";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

// Map of emoji icons for different notification types
const typeToEmoji = {
  default: "✨ ",
  success: "✅ ",
  info: "ℹ️ ",
  warning: "⚠️ ",
  error: "❌ ",
};

export function usePageNotification({
  title = "In development",
  description = "This feature is currently under development",
  duration = 3000,
  type = "default",
  position
}: NotificationOptions = {}) {
  // Use a ref to track if the toast has been shown
  const toastShownRef = useRef(false);

  useEffect(() => {
    // Only show the toast if it hasn't been shown already
    if (toastShownRef.current) return;
    
    // Mark the toast as shown to prevent duplicates
    toastShownRef.current = true;
    
    // Get the emoji for the specified type
    const emoji = typeToEmoji[type] || typeToEmoji.default;
    
    // Add emoji to the title
    const titleWithEmoji = `${emoji}${title}`;
    
    // Show toast notification on initial render
    const options: any = {
      description,
      duration,
      position,
      id: `page-notification-${Date.now()}` // Add unique ID to prevent duplicates
    };

    switch (type) {
      case "success":
        toast.success(titleWithEmoji, options);
        break;
      case "info":
        toast.info(titleWithEmoji, options);
        break;
      case "warning":
        toast.warning(titleWithEmoji, options);
        break;
      case "error":
        toast.error(titleWithEmoji, options);
        break;
      default:
        toast(titleWithEmoji, options);
        break;
    }
  }, []); // Empty dependency array means this only runs once
} 