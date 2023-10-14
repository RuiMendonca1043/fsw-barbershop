import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import ToastProvider from '@/providers/toast'

const inter = Poppins({ subsets: ['latin'], weight: [
  '400', '500', '600', '700', '800', '900'
]})

export const metadata: Metadata = {
  title: 'Barbearia Real',
  description: 'A melhor barbearia em Vila-Meã e arredores!',
  icons: './favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
