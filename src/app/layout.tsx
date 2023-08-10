import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "../../public/assets/css/main.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aquiles',
  description: 'Cuide dos seus jogadores com o Aquiles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
