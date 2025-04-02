"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import StructuredData from "@/components/structured-data"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  // Check if email has been submitted before
  const checkEmailSubmitted = (emailToCheck: string) => {
    if (typeof window === "undefined") return false

    try {
      // Get previously submitted emails from localStorage with a more specific key
      const submittedEmails = JSON.parse(localStorage.getItem("enkaj_waitlist_emails") || "[]")
      return submittedEmails.includes(emailToCheck.toLowerCase())
    } catch (error) {
      console.error("Error checking submitted emails:", error)
      // If there's an error, return false to allow submission
      return false
    }
  }

  // Save email to localStorage
  const saveSubmittedEmail = (emailToSave: string) => {
    if (typeof window === "undefined") return

    try {
      // Get current list and add new email
      const submittedEmails = JSON.parse(localStorage.getItem("enkaj_waitlist_emails") || "[]")
      if (!submittedEmails.includes(emailToSave.toLowerCase())) {
        submittedEmails.push(emailToSave.toLowerCase())
        localStorage.setItem("enkaj_waitlist_emails", JSON.stringify(submittedEmails))
      }
    } catch (error) {
      console.error("Error saving submitted email:", error)
      // Create a new array if there's an error
      localStorage.setItem("enkaj_waitlist_emails", JSON.stringify([emailToSave.toLowerCase()]))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if email is valid
    if (!email || !email.includes("@")) {
      return
    }

    // Check if email has already been submitted
    if (checkEmailSubmitted(email)) {
      setAlreadySubmitted(true)
      setSubmitted(false)

      // Reset the already submitted message after 5 seconds
      setTimeout(() => {
        setAlreadySubmitted(false)
      }, 5000)

      return
    }

    // Save email as submitted
    saveSubmittedEmail(email)

    // Show success message
    setSubmitted(true)
    setAlreadySubmitted(false)

    // Reset the form after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setEmail("")
    }, 5000)
  }

  // Add this function for admin use
  const clearSubmittedEmails = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("enkaj_waitlist_emails")
      alert("Submitted emails list has been cleared")
    }
  }

  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col bg-white text-gray-800">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm">
          <div className="max-w-5xl mx-auto w-full px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src="/logo.webp" alt="Enkaj Logo" width={40} height={40} priority />
              </div>
              <nav className="flex space-x-8" aria-label="Main Navigation">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-gray-700 hover:text-teal-600 font-medium text-base">About</button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[500px] bg-white text-gray-800 border-gray-200"
                    aria-describedby="about-description"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-teal-600">About Us</DialogTitle>
                    </DialogHeader>
                    <DialogDescription id="about-description" className="text-gray-600 py-4 text-base">
                      Enkaj is a comprehensive real estate web application that streamlines the entire process of
                      finding and booking ideal spaces. It empowers users to effortlessly search, shortlist, and reserve
                      their desired properties, while also providing robust management tools for property owners and
                      managers to efficiently oversee their portfolios.
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-gray-700 hover:text-teal-600 font-medium text-base">Services</button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[500px] bg-white text-gray-800 border-gray-200"
                    aria-describedby="services-description"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-teal-600">Our Services</DialogTitle>
                    </DialogHeader>
                    <div id="services-description">
                      <Tabs defaultValue="search" className="w-full mt-4">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                          <TabsTrigger
                            value="search"
                            className="data-[state=active]:bg-white data-[state=active]:text-teal-600 text-base"
                          >
                            Search & Shortlisting
                          </TabsTrigger>
                          <TabsTrigger
                            value="booking"
                            className="data-[state=active]:bg-white data-[state=active]:text-teal-600 text-base"
                          >
                            Booking & Management
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="search" className="mt-4 text-gray-600">
                          <h3 className="text-lg font-medium text-teal-600 mb-2">
                            Convenient space search and shortlisting
                          </h3>
                          <p className="text-base">
                            Easily search and filter through a wide range of available spaces, and quickly shortlist the
                            ones that best fit your requirements.
                          </p>
                        </TabsContent>
                        <TabsContent value="booking" className="mt-4 text-gray-600">
                          <h3 className="text-lg font-medium text-teal-600 mb-2">Seamless booking and management</h3>
                          <p className="text-base">
                            Streamline the booking process and manage your space efficiently with our user-friendly
                            platform.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-gray-700 hover:text-teal-600 font-medium text-base">FAQ</button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[500px] bg-white text-gray-800 border-gray-200"
                    aria-describedby="faq-description"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-teal-600">Frequently Asked Questions</DialogTitle>
                    </DialogHeader>
                    <div id="faq-description" className="text-gray-600 py-2 text-base">
                      Find answers to common questions about Enkaj.
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-left">What is Enkaj?</AccordionTrigger>
                          <AccordionContent>
                            Enkaj is a comprehensive real estate platform that connects property seekers with their
                            ideal spaces. Our platform streamlines the entire process from searching to booking, making
                            it easier than ever to find and secure the perfect property.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="text-left">When will Enkaj launch?</AccordionTrigger>
                          <AccordionContent>
                            We're currently in the final stages of development and will be launching soon. Sign up with
                            your email to be notified as soon as we go live and get early access to our platform.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="text-left">
                            What types of properties will be available on Enkaj?
                          </AccordionTrigger>
                          <AccordionContent>
                            Enkaj will feature a diverse range of properties including:
                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                              <li>Residential properties</li>
                              <li>Commercial spaces</li>
                              <li>Student accommodations</li>
                              <li>Storage facilities</li>
                              <li>Furnished apartments</li>
                            </ol>
                            Our platform is designed to accommodate various real estate needs for both short and
                            long-term arrangements.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger className="text-left">How does the booking process work?</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div>
                                <p className="font-medium">Property Search and Selection:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>
                                    Online Browsing: Users browse available rental and lease listings on the Enkaj
                                    platform.
                                  </li>
                                  <li>
                                    Detailed property information, photos, and virtual tours (if available) are
                                    reviewed.
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">Verification:</p>
                                <ul className="list-disc pl-5">
                                  <li>
                                    Enkaj's verified listings ensure users are viewing legitimate properties from
                                    verified agents and property managers.
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">Reservation and Deposit:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>
                                    Reservation Deposit: Once a user decides to secure a listing, they are required to
                                    pay a reservation deposit. This deposit marks the property as "reserved,"
                                    effectively taking it off the market.
                                  </li>
                                  <li>
                                    Purpose of Deposit: The deposit demonstrates the user's serious intent and provides
                                    security for the agent or property manager.
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <p className="font-medium">Transparent Deposit Management:</p>
                                <p>
                                  For cancellations, a 50% refund is automatically processed through our secure payment
                                  gateway, ensuring transparent and auditable transaction records.
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                          <AccordionTrigger className="text-left">
                            I'm a property owner. Can I list my properties on Enkaj?
                          </AccordionTrigger>
                          <AccordionContent>
                            Enkaj provides property owners with powerful tools to list, manage, and track their
                            properties. You'll be able to upload details, set availability, manage bookings, and
                            communicate with potential tenants all in one place.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                          <AccordionTrigger className="text-left">
                            Is Enkaj available on mobile devices?
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes, Enkaj is fully responsive and works seamlessly across all devices including
                            smartphones, tablets, and desktop computers. We're also developing dedicated mobile apps for
                            iOS and Android to enhance the user experience further.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-7">
                          <AccordionTrigger className="text-left">
                            How does Enkaj ensure security and trust?
                          </AccordionTrigger>
                          <AccordionContent>
                            <p>
                              <strong>Rigorous Entity Validation:</strong> Enkaj employs a multi-layered verification
                              process, including identity authentication and credential validation, to ensure the
                              legitimacy of all listings, agents, and property managers.
                            </p>
                            <p className="mt-2">
                              <strong>Secure Reservation Protocol:</strong> Upon reservation, a secure deposit
                              transaction is processed, immediately tagging the listing as reserved within our
                              platform's database, effectively removing it from public view.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </DialogContent>
                </Dialog>
              </nav>
            </div>
          </div>
        </header>

        {/* Content Container - Add padding-top to account for fixed header */}
        <div className="flex-1 flex flex-col pt-16">
          {/* Main Content */}
          <main className="max-w-5xl mx-auto w-full flex-1 px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center">
              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
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
                  <section aria-labelledby="email-signup">
                    <h2 id="email-signup" className="sr-only">
                      Email Signup
                    </h2>
                    <form onSubmit={handleSubmit} className="flex max-w-md mx-auto md:mx-0 gap-2 flex-col sm:flex-row">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 flex-1 text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="Email address"
                        name="email"
                      />
                      <Button
                        type="submit"
                        className="bg-black hover:bg-gray-800 text-white rounded-full px-6 text-base"
                      >
                        Notify Me
                      </Button>
                    </form>
                    {submitted && (
                      <div className="text-sm text-teal-600 font-medium" role="status">
                        Thank you! We'll notify you when we launch.
                      </div>
                    )}
                    {alreadySubmitted && (
                      <div className="text-sm text-amber-600 font-medium" role="status">
                        This email has already been submitted. Thank you for your interest!
                      </div>
                    )}
                    <div className="text-sm text-gray-500">*Don't worry we will not spam you...</div>
                  </section>
                </div>
              </div>

              {/* Mobile App Preview */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative max-w-[300px] w-full">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-4 rounded-3xl border border-gray-200 shadow-xl">
                      <div className="bg-[#0a3b3b] rounded-2xl overflow-hidden">
                        <div className="h-8 bg-black flex items-center justify-between px-4">
                          <div className="text-white text-xs">Enkaj</div>
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
                          alt="Enkaj App Preview showing the property search interface"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mt-16" aria-labelledby="faq-heading">
              <div className="text-center mb-8">
                <h2 id="faq-heading" className="text-3xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-gray-600">Everything you need to know about Enkaj</p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left text-lg font-medium">What is Enkaj?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Enkaj is a comprehensive real estate platform that connects property seekers with their ideal
                      spaces. Our platform streamlines the entire process from searching to booking, making it easier
                      than ever to find and secure the perfect property.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left text-lg font-medium">
                      When will Enkaj launch?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      We're currently in the final stages of development and will be launching soon. Sign up with your
                      email to be notified as soon as we go live and get early access to our platform.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left text-lg font-medium">
                      What types of properties will be available on Enkaj?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p>Enkaj will feature a diverse range of properties including:</p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>Residential properties</li>
                        <li>Commercial spaces</li>
                        <li>Student accommodations</li>
                        <li>Storage facilities</li>
                        <li>Furnished apartments</li>
                      </ol>
                      <p className="mt-2">
                        Our platform is designed to accommodate various real estate needs for both short and long-term
                        arrangements.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left text-lg font-medium">
                      How does the booking process work?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">Property Search and Selection:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Online Browsing: Users browse available rental and lease listings on the Enkaj platform.
                            </li>
                            <li>
                              Detailed property information, photos, and virtual tours (if available) are reviewed.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium">Verification:</p>
                          <ul className="list-disc pl-5">
                            <li>
                              Enkaj's verified listings ensure users are viewing legitimate properties from verified
                              agents and property managers.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium">Reservation and Deposit:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Reservation Deposit: Once a user decides to secure a listing, they are required to pay a
                              reservation deposit. This deposit marks the property as "reserved," effectively taking it
                              off the market.
                            </li>
                            <li>
                              Purpose of Deposit: The deposit demonstrates the user's serious intent and provides
                              security for the agent or property manager.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium">Transparent Deposit Management:</p>
                          <p>
                            For cancellations, a 50% refund is automatically processed through our secure payment
                            gateway, ensuring transparent and auditable transaction records.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left text-lg font-medium">
                      How does Enkaj ensure security and trust?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p>
                        <strong>Rigorous Entity Validation:</strong> Enkaj employs a multi-layered verification process,
                        including identity authentication and credential validation, to ensure the legitimacy of all
                        listings, agents, and property managers.
                      </p>
                      <p className="mt-2">
                        <strong>Secure Reservation Protocol:</strong> Upon reservation, a secure deposit transaction is
                        processed, immediately tagging the listing as reserved within our platform's database,
                        effectively removing it from public view.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="max-w-5xl mx-auto w-full px-4 py-6 border-t border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center">
                <a
                  href="https://www.tiktok.com/@enkaaj?_t=ZM-8twXXrGUNlN&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-teal-600 rounded-full border border-gray-200 p-2"
                  aria-label="Follow us on TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                  </svg>
                  <span className="sr-only">TikTok</span>
                </a>
              </div>
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Enkaj. All rights reserved.</p>
              {/* Hidden admin button to clear localStorage */}
              <button
                onClick={clearSubmittedEmails}
                className="text-xs text-gray-300 hover:text-gray-500 mt-4 opacity-30"
                aria-label="Admin: Clear submitted emails"
              >
                Reset Submissions
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

