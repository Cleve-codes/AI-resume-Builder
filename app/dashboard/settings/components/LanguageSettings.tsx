import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Globe } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { Label } from '@/components/ui/label'

interface LanguageSettingsProps {
  languageSettings: {
    language: string
    dateFormat: string
    timeFormat: string
  }
  onLanguageSettingsChange: (key: keyof LanguageSettingsProps['languageSettings'], value: any) => void
}

export function LanguageSettings({ languageSettings, onLanguageSettingsChange }: LanguageSettingsProps) {
  return (
    <SettingsCard title='Language & Region' icon={<Globe className='h-5 w-5' />} description='Set your preferred language and regional formats'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label>Language</Label>
          <Select
            value={languageSettings.language}
            onValueChange={(value) => onLanguageSettingsChange('language', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='english'>English</SelectItem>
              <SelectItem value='spanish'>Spanish</SelectItem>
              <SelectItem value='french'>French</SelectItem>
              <SelectItem value='german'>German</SelectItem>
              <SelectItem value='chinese'>Chinese</SelectItem>
              <SelectItem value='japanese'>Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label>Date Format</Label>
            <Select
              value={languageSettings.dateFormat}
              onValueChange={(value) => onLanguageSettingsChange('dateFormat', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select date format' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='mm/dd/yyyy'>MM/DD/YYYY (US)</SelectItem>
                <SelectItem value='dd/mm/yyyy'>DD/MM/YYYY (UK/EU)</SelectItem>
                <SelectItem value='yyyy-mm-dd'>YYYY-MM-DD (ISO)</SelectItem>
                <SelectItem value='mmmm d, yyyy'>Month D, YYYY (Long)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Time Format</Label>
            <Select
              value={languageSettings.timeFormat}
              onValueChange={(value) => onLanguageSettingsChange('timeFormat', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select time format' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='12h'>12-hour (AM/PM)</SelectItem>
                <SelectItem value='24h'>24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}
