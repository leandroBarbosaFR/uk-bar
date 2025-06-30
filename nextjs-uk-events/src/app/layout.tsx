import Header from './components/Header'
import CookieModal from './components/CookieModal'
import Footer from './components/Footer'
import './globals.css'
import {Chivo, Lora} from 'next/font/google'

const chivo = Chivo({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const lora = Lora({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Samba Bar Events',
  description: 'Samba Bar Events',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${chivo.variable} ${lora.variable} antialiased`}>
        <Header />
        <CookieModal />
        {children}
        <Footer />
      </body>
    </html>
  )
}
