import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resume AI',
  description: 'AI-powered resume analysis and optimization tool. Get instant feedback on your resume and job matches.',
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
      <body>{children}</body>
    </html>
  )
}
