import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import AuthProvider from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

const siteConfig = {
  name: "Nextjs-supabase-starter",
  description: "A modern Next.js supabase starter template with authentication, and real-time features",
  ogImage: "http://localhost:3000/og.png",
  url: "http://localhost:3000",
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ["Next.js", "Supabase", "React", "TypeScript", "Authentication", "Real-time", "Starter Template"],
  authors: [{ 
    name: "ysskrishna",
    url: "ysskrishna.vercel.app"
  }],
  creator: "ysskrishna",
  publisher: "ysskrishna",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ysskrishna",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "linkedin": "https://www.linkedin.com/in/ysskrishna/",
    "github": "https://github.com/ysskrishna",
    "producthunt": "https://www.producthunt.com/@ysskrishna",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
