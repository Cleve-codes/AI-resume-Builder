import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Sun, Moon, Palette, MonitorSmartphone } from 'lucide-react'
import { SettingsCard } from './SettingsCard'

interface AppearanceSettingsProps {
  appearance: {
    theme: string
    fontSize: string
    reducedMotion: boolean
    highContrast: boolean
  }
  onAppearanceChange: (key: keyof AppearanceSettingsProps['appearance'], value: any) => void
}

export function AppearanceSettings({ appearance, onAppearanceChange }: AppearanceSettingsProps) {
  return (
    // <SettingsCard title='Appearance Settings' icon={<Palette className='h-5 w-5' />} description='Customize how the application looks and feels'>
      <div className='space-y-6'>
        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Theme</Label>
          <RadioGroup
            value={appearance.theme}
            onValueChange={(value) => onAppearanceChange('theme', value)}
            className='flex flex-wrap gap-4'
          >
            <div className='flex flex-col items-center space-y-2 bg-white border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer'>
              <Sun className='h-8 w-8 text-amber-500 mb-1' />
              <RadioGroupItem value='light' id='theme-light' className="sr-only" />
              <Label htmlFor='theme-light' className='font-medium'>Light</Label>
            </div>
            
            <div className='flex flex-col items-center space-y-2  border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer'>
              <Moon className='h-8 w-8 text-indigo-400 mb-1' />
              <RadioGroupItem value='dark' id='theme-dark' className="sr-only" />
              <Label htmlFor='theme-dark' className='font-medium text-gray-700'>Dark</Label>
            </div>
            
            <div className='flex flex-col items-center space-y-2 bg-gray-900 border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer'>
              <MonitorSmartphone className='h-8 w-8 text-blue-500 mb-1' />
              <RadioGroupItem value='system' id='theme-system' className="sr-only" />
              <Label htmlFor='theme-system' className='font-medium text-white'>System</Label>
            </div>
          </RadioGroup>
        </div>

        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Font Size</Label>
          <Select
            value={appearance.fontSize}
            onValueChange={(value) => onAppearanceChange('fontSize', value)}
          >
            <SelectTrigger className="border-blue-100 focus:ring-blue-500">
              <SelectValue placeholder='Select font size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='small'>Small</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='large'>Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700">Reduced Motion</Label>
              <p className="text-xs text-gray-500 mt-1">Minimize animations throughout the interface</p>
            </div>
            <Switch 
              checked={appearance.reducedMotion}
              onCheckedChange={(checked) => onAppearanceChange('reducedMotion', checked)}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-700">High Contrast</Label>
              <p className="text-xs text-gray-500 mt-1">Increase contrast for better visibility</p>
            </div>
            <Switch 
              checked={appearance.highContrast}
              onCheckedChange={(checked) => onAppearanceChange('highContrast', checked)}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </div>
    // </SettingsCard>
  )
}
