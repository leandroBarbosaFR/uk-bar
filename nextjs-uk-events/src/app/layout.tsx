import type {Metadata} from 'next'
import {Geist, Lora} from 'next/font/google'
import './globals.css'
import Footer from '../app/components/Footer'
import Header from '../app/components/Header'
import CookieModal from '../app/components/CookieModal'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Lora({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '🍸 Samba Bar Events',
  description: 'Samba Bar Events',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <CookieModal />
        {children}
        <Footer />
      </body>
    </html>
  )
}
