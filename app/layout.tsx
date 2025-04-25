import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Music FX Generator',
  description: 'Generate high-quality sound effects for music production using AI',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex items-center justify-between p-4 bg-gray-100">
          <h1 className="text-2xl font-bold">AI Music FX Generator</h1>
          <Image
            src="placeholder-logo.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="text-center p-4 bg-gray-100">
          <p>&copy; 2023 AI Music FX Generator. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

