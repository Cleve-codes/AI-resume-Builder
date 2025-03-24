import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Download } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { Label } from '@/components/ui/label'

interface ExportSettingsProps {
  exportSettings: {
    defaultFormat: string
    defaultPaperSize: string
    defaultColorMode: string
    optimizeForATS: boolean
    includeLinksInPDF: boolean
    compressionLevel: number
  }
  onExportSettingsChange: (key: keyof ExportSettingsProps['exportSettings'], value: any) => void
}

export function ExportSettings({ exportSettings, onExportSettingsChange }: ExportSettingsProps) {
  return (
    <SettingsCard title='Export Settings' icon={<Download className='h-5 w-5' />} description='Configure default export options'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label>Default Format</Label>
          <Select
            value={exportSettings.defaultFormat}
            onValueChange={(value) => onExportSettingsChange('defaultFormat', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select format' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pdf'>PDF</SelectItem>
              <SelectItem value='docx'>Word</SelectItem>
              <SelectItem value='txt'>Plain Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Default Paper Size</Label>
          <Select
            value={exportSettings.defaultPaperSize}
            onValueChange={(value) => onExportSettingsChange('defaultPaperSize', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select paper size' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='a4'>A4</SelectItem>
              <SelectItem value='letter'>Letter</SelectItem>
              <SelectItem value='legal'>Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <Label>Optimize for ATS</Label>
            <p className='text-sm text-muted-foreground'>Format for applicant tracking systems</p>
          </div>
          <Switch
            checked={exportSettings.optimizeForATS}
            onCheckedChange={(value) => onExportSettingsChange('optimizeForATS', value)}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <Label>Include Links in PDF</Label>
            <p className='text-sm text-muted-foreground'>Preserve clickable links in exported PDF</p>
          </div>
          <Switch
            checked={exportSettings.includeLinksInPDF}
            onCheckedChange={(value) => onExportSettingsChange('includeLinksInPDF', value)}
          />
        </div>

        <div className='space-y-2'>
          <Label>Compression Level</Label>
          <Slider
            value={[exportSettings.compressionLevel]}
            onValueChange={(value) => onExportSettingsChange('compressionLevel', value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
    </SettingsCard>
  )
}
