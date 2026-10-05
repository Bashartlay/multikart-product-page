import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Gym Coords Set | Multikart',
  description:
    'Shop the Gym Coords Set — a ribbed, breathable sports bra and crossover-waist leggings set in Brown, Blue and Green. Free returns within 7 days.',
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
