import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/context/auth-context'
import DevelopmentNotice from '@/components/DevelopmentNotice'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resume Builder - Create ATS-optimized resumes',
  description: 'Build professional, ATS-optimized resumes that get you noticed',
  openGraph: {
    images: ['/og-image.png'],
  },
  // Removed invalid 'url' property
  keywords: ['resume', 'ai', 'analysis', 'optimization', 'job', 'career'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
          <DevelopmentNotice />
        </AuthProvider>
      </body>
    </html>
  )
}
