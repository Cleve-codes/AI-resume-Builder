import { useState } from 'react'

export function useSettingsForm<T extends Record<string, any>>(initialState: T) {
  const [settings, setSettings] = useState<T>(initialState)

  const handleChange = (key: keyof T, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return {
    settings,
    handleChange,
    setSettings
  }
}
