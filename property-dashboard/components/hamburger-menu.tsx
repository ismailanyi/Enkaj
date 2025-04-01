"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Info, Settings, LogOut, Building, PlusSquare, DollarSign, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Menu className={cn("h-6 w-6 transition-all duration-200 ease-in-out", isOpen && "rotate-90 opacity-0")} />
          <X
            className={cn(
              "h-6 w-6 absolute transition-all duration-200 ease-in-out",
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
            )}
          />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <nav className="flex flex-col h-full p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Enkaj Dashboard</h2>
          </div>
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <Building className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/create-listing"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <PlusSquare className="h-5 w-5" />
              <span>Create Listing</span>
            </Link>
            <Link
              href="/dashboard/rent-tracking"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <DollarSign className="h-5 w-5" />
              <span>Rent Tracking</span>
            </Link>
            <Link
              href="/dashboard/tasks"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <CheckSquare className="h-5 w-5" />
              <span>Task Manager</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative w-5 h-5">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/msg%20icon.jpg-S9dOmBQ8w5ksnjTtRnzQamIctAbk57.jpeg"
                  alt="Messages"
                  fill
                  className="object-contain filter hue-rotate-[140deg]"
                />
              </div>
              <span>Messages</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span>About Us</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-primary hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>
          <div className="mt-auto pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

