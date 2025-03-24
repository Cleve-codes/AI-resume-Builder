import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { Label } from '@/components/ui/label'

interface AISettingsProps {
  aiSettings: {
    enableAiSuggestions: boolean
    autoAnalyzeResume: boolean
    suggestImprovements: boolean
    useDataForTraining: boolean
    preferredLanguageModel: string
  }
  onAiSettingsChange: (key: keyof AISettingsProps['aiSettings'], value: any) => void
}

export function AISettings({ aiSettings, onAiSettingsChange }: AISettingsProps) {
  return (
    <SettingsCard title='AI Settings' icon={<Zap className='h-5 w-5' />} description='Configure AI-powered features and preferences'>
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <Label>AI Suggestions</Label>
              <p className='text-sm text-muted-foreground'>Enable AI-powered content suggestions</p>
            </div>
            <Switch
              checked={aiSettings.enableAiSuggestions}
              onCheckedChange={(value) => onAiSettingsChange('enableAiSuggestions', value)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <Label>Auto-Analyze Resume</Label>
              <p className='text-sm text-muted-foreground'>Analyze resume when changes are made</p>
            </div>
            <Switch
              checked={aiSettings.autoAnalyzeResume}
              onCheckedChange={(value) => onAiSettingsChange('autoAnalyzeResume', value)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <Label>Suggest Improvements</Label>
              <p className='text-sm text-muted-foreground'>Proactively suggest improvements</p>
            </div>
            <Switch
              checked={aiSettings.suggestImprovements}
              onCheckedChange={(value) => onAiSettingsChange('suggestImprovements', value)}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label>Preferred Language Model</Label>
          <Select
            value={aiSettings.preferredLanguageModel}
            onValueChange={(value) => onAiSettingsChange('preferredLanguageModel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select model' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='gpt-4o'>GPT-4o</SelectItem>
              <SelectItem value='gpt-4'>GPT-4</SelectItem>
              <SelectItem value='gpt-3.5-turbo'>GPT-3.5 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <Label>Data Usage for Training</Label>
            <p className='text-sm text-muted-foreground'>Improve AI models with anonymized data</p>
          </div>
          <Switch
            checked={aiSettings.useDataForTraining}
            onCheckedChange={(value) => onAiSettingsChange('useDataForTraining', value)}
          />
        </div>
      </div>
    </SettingsCard>
  )
}
