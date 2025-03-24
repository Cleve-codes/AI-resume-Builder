import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText } from 'lucide-react'
import { SettingsCard } from './SettingsCard'

interface ResumeDefaultsSettingsProps {
  resumeDefaults: {
    defaultTemplate: string
    defaultFontFamily: string
    defaultFontSize: string
    defaultMargins: string
    includeHeaderByDefault: boolean
    includePhotoByDefault: boolean
  }
  onResumeDefaultsChange: (key: keyof ResumeDefaultsSettingsProps['resumeDefaults'], value: any) => void
}

export function ResumeDefaultsSettings({ resumeDefaults, onResumeDefaultsChange }: ResumeDefaultsSettingsProps) {
  return (
    <SettingsCard 
      title='Resume Defaults' 
      icon={<FileText className='h-5 w-5' />} 
      description='Set default options for new resumes'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Default Template</Label>
          <Select
            value={resumeDefaults.defaultTemplate}
            onValueChange={(value) => onResumeDefaultsChange('defaultTemplate', value)}
          >
            <SelectTrigger className="border-blue-100 focus:ring-blue-500">
              <SelectValue placeholder='Select template' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='professional'>Professional</SelectItem>
              <SelectItem value='modern'>Modern</SelectItem>
              <SelectItem value='creative'>Creative</SelectItem>
              <SelectItem value='minimal'>Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Default Font Family</Label>
          <Select
            value={resumeDefaults.defaultFontFamily}
            onValueChange={(value) => onResumeDefaultsChange('defaultFontFamily', value)}
          >
            <SelectTrigger className="border-blue-100 focus:ring-blue-500">
              <SelectValue placeholder='Select font family' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='inter'>Inter</SelectItem>
              <SelectItem value='roboto'>Roboto</SelectItem>
              <SelectItem value='opensans'>Open Sans</SelectItem>
              <SelectItem value='montserrat'>Montserrat</SelectItem>
              <SelectItem value='georgia'>Georgia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Default Font Size</Label>
          <Select
            value={resumeDefaults.defaultFontSize}
            onValueChange={(value) => onResumeDefaultsChange('defaultFontSize', value)}
          >
            <SelectTrigger className="border-blue-100 focus:ring-blue-500">
              <SelectValue placeholder='Select font size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10pt</SelectItem>
              <SelectItem value='11'>11pt</SelectItem>
              <SelectItem value='12'>12pt</SelectItem>
              <SelectItem value='14'>14pt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label className="text-sm font-medium text-gray-700">Default Margins</Label>
          <Select
            value={resumeDefaults.defaultMargins}
            onValueChange={(value) => onResumeDefaultsChange('defaultMargins', value)}
          >
            <SelectTrigger className="border-blue-100 focus:ring-blue-500">
              <SelectValue placeholder='Select margins' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='narrow'>Narrow</SelectItem>
              <SelectItem value='normal'>Normal</SelectItem>
              <SelectItem value='wide'>Wide</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <div>
            <Label className="text-sm font-medium text-gray-700">Include Header by Default</Label>
            <p className="text-xs text-gray-500 mt-1">Add a header section to new resumes</p>
          </div>
          <Switch 
            checked={resumeDefaults.includeHeaderByDefault}
            onCheckedChange={(checked) => onResumeDefaultsChange('includeHeaderByDefault', checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
        
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <div>
            <Label className="text-sm font-medium text-gray-700">Include Photo by Default</Label>
            <p className="text-xs text-gray-500 mt-1">Add a photo placeholder to new resumes</p>
          </div>
          <Switch 
            checked={resumeDefaults.includePhotoByDefault}
            onCheckedChange={(checked) => onResumeDefaultsChange('includePhotoByDefault', checked)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>
    </SettingsCard>
  )
}
