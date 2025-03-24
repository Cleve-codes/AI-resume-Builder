import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface SettingsCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export function SettingsCard({ title, description, icon, children }: SettingsCardProps) {
  return (
    <Card className="border-blue-100 shadow-sm mb-6">
      <CardHeader className="pb-4">
        <CardTitle className='flex items-center gap-2 text-blue-600'>
          {icon && <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>}
          {title}
        </CardTitle>
        {description && <CardDescription className="text-gray-500 mt-1">{description}</CardDescription>}
      </CardHeader>
      <Separator className="bg-blue-50" />
      <CardContent className='space-y-6 pt-6'>
        {children}
      </CardContent>
    </Card>
  )
}
