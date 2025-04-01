"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email)
    setSubmitted(true)
    setEmail("")

    // Reset the submitted state after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-['Roboto',sans-serif] text-gray-800">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="max-w-5xl mx-auto w-full px-4 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/logo.webp" alt="Enkaj Logo" width={40} height={40} />
            </div>
            <div className="flex space-x-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-gray-700 hover:text-teal-600 font-medium">About</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white text-gray-800 border-gray-200">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-teal-600">About Us</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-gray-600 py-4">
                    Enkaj is a comprehensive real estate web application that streamlines the entire process of finding
                    and booking ideal spaces. It empowers users to effortlessly search, shortlist, and reserve their
                    desired properties, while also providing robust management tools for property owners and managers to
                    efficiently oversee their portfolios.
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-gray-700 hover:text-teal-600 font-medium">Services</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white text-gray-800 border-gray-200">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-teal-600">Our Services</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="search" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                      <TabsTrigger
                        value="search"
                        className="data-[state=active]:bg-white data-[state=active]:text-teal-600"
                      >
                        Search & Shortlisting
                      </TabsTrigger>
                      <TabsTrigger
                        value="booking"
                        className="data-[state=active]:bg-white data-[state=active]:text-teal-600"
                      >
                        Booking & Management
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="search" className="mt-4 text-gray-600">
                      <h3 className="text-lg font-medium text-teal-600 mb-2">
                        Convenient space search and shortlisting
                      </h3>
                      <p>
                        Easily search and filter through a wide range of available spaces, and quickly shortlist the
                        ones that best fit your requirements.
                      </p>
                    </TabsContent>
                    <TabsContent value="booking" className="mt-4 text-gray-600">
                      <h3 className="text-lg font-medium text-teal-600 mb-2">Seamless booking and management</h3>
                      <p>
                        Streamline the booking process and manage your space efficiently with our user-friendly
                        platform.
                      </p>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto w-full flex-1 px-4 py-8 md:py-12">
          <div className="flex flex-col items-center">
            {/* Text Content - Always on top for both mobile and desktop */}
            <div className="w-full max-w-lg text-center mb-10">
              <div className="space-y-6">
                <div className="inline-block text-gray-500 text-sm font-medium">— Coming Soon</div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-teal-600">Enkaj | Home</h2>
                  <h3 className="text-xl font-medium">
                    <span className="text-gray-700">Your Perfect Space, </span>
                    <span className="text-yellow-500">Anytime, Anywhere.</span>
                  </h3>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Get Notified
                    <br />
                    When we Launch
                  </h1>
                </div>
                <form onSubmit={handleSubmit} className="flex max-w-md mx-auto gap-2 flex-col sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
                    Notify Me
                  </Button>
                </form>
                {submitted && (
                  <div className="text-sm text-teal-600 font-medium">Thank you! We'll notify you when we launch.</div>
                )}
                <div className="text-sm text-gray-500">*Don't worry we will not spam you...</div>
              </div>
            </div>

            {/* Mobile App Preview - Always below text content */}
            <div className="w-full flex justify-center mt-4">
              <div className="relative max-w-[300px] w-full">
                <div className="absolute -z-10 top-0 right-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-70 blur-3xl"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-4 rounded-3xl border border-gray-200 shadow-xl">
                    <div className="bg-[#0a3b3b] rounded-2xl overflow-hidden">
                      <div className="h-8 bg-black flex items-center justify-between px-4">
                        <div className="text-white text-xs">10:21</div>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                      <Image
                        src="/app-screenshot.jpeg"
                        width={300}
                        height={600}
                        alt="Enkaj App Preview"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full px-4 py-6 border-t border-gray-100">
        <div className="flex justify-center">
          <a
            href="https://www.tiktok.com/@enkaaj?_t=ZM-8twXXrGUNlN&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-teal-600 rounded-full border border-gray-200 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
            </svg>
            <span className="sr-only">TikTok</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

