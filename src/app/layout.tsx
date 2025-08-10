import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs' // Temporarily disabled for demo
// import './globals.css' // Comment out for now to avoid module resolution issues

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopify CRO Copilot',
  description: 'AI-powered Shopify store optimization recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}