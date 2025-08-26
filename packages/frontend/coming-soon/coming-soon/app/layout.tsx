import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

// Initialize the Roboto font with the weights we need
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Enkaj | Find Your Perfect Space, Anytime, Anywhere",
  description:
    "Enkaj is a comprehensive real estate platform that helps you find and book your ideal space. Join our waitlist to be notified when we launch.",
  keywords: "real estate, property booking, space rental, property management, Enkaj",
  authors: [{ name: "Enkaj Team" }],
  creator: "Enkaj",
  publisher: "Enkaj",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://enkaj.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://enkaj.com",
    title: "Enkaj | Find Your Perfect Space, Anytime, Anywhere",
    description:
      "Enkaj is a comprehensive real estate platform that helps you find and book your ideal space. Join our waitlist to be notified when we launch.",
    siteName: "Enkaj",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Enkaj - Your Perfect Space, Anytime, Anywhere",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enkaj | Find Your Perfect Space, Anytime, Anywhere",
    description:
      "Enkaj is a comprehensive real estate platform that helps you find and book your ideal space. Join our waitlist to be notified when we launch.",
    images: ["/twitter-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'