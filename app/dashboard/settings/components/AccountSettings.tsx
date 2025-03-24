import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Download, LogOut, Trash2 } from 'lucide-react'
import { SettingsCard } from './SettingsCard'

export function AccountSettings() {
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    // and then call an API to delete the account
    alert("This would delete your account after confirmation in a real app")
  }

  return (
    <SettingsCard title='Account Management' description='Manage your account and data'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Account Information</h3>
          <div className='bg-muted/50 p-4 rounded-md'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-xs text-muted-foreground'>Email</p>
                <p className='text-sm font-medium'>john.doe@example.com</p>
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Account Type</p>
                <p className='text-sm font-medium'>Free Plan</p>
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Member Since</p>
                <p className='text-sm font-medium'>November 15, 2023</p>
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Last Login</p>
                <p className='text-sm font-medium'>Today at 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className='space-y-2'>
          <h3 className='text-sm font-medium'>Data & Privacy</h3>
          <div className='space-y-4'>
            <Button variant='outline' className='w-full sm:w-auto gap-2'>
              <Download className='h-4 w-4' /> Download My Data
            </Button>
            <p className='text-xs text-muted-foreground'>
              Request a copy of all your personal data stored in our system
            </p>
          </div>
        </div>

        <Separator />

        <div className='space-y-2'>
          <h3 className='text-sm font-medium text-destructive'>Danger Zone</h3>
          <div className='space-y-4'>
            <div className='bg-destructive/5 border border-destructive/20 p-4 rounded-md'>
              <h4 className='text-sm font-medium mb-2'>Delete Account</h4>
              <p className='text-xs text-muted-foreground mb-4'>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <div className='flex gap-2'>
                <Button variant='destructive' onClick={handleDeleteAccount} className='gap-2'>
                  <Trash2 className='h-4 w-4' /> Delete Account
                </Button>
              </div>
            </div>

            <div className='bg-muted/50 p-4 rounded-md'>
              <h4 className='text-sm font-medium mb-2'>Log Out Everywhere</h4>
              <p className='text-xs text-muted-foreground mb-4'>
                Log out from all devices where you're currently signed in
              </p>
              <Button variant='outline' className='gap-2'>
                <LogOut className='h-4 w-4' /> Log Out Everywhere
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}
