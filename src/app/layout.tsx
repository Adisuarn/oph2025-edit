import '@/app/globals.css'

import { type Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'

import Secret from '@/components/Secret'

export const metadata: Metadata = {
  title: 'oph2025-edit',
  description: 'Edit your OPH2025 information',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <CookiesProvider>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <html lang="en">
        <body className="font-Thai">
          {children}
          <Secret />
        </body>
      </html>
    </CookiesProvider>
  )
}
