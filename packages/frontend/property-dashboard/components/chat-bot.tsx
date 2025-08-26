"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { useChat } from "ai/react"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-16 h-16 p-0 hover:scale-105 transition-transform bg-transparent hover:bg-transparent"
      >
        <div className="relative w-16 h-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-12%20at%206.52.26%20AM-gAQVPYp0PeOz4GXGwu8VWa2wMtKGDx.jpeg"
            alt="Enkaj Assistant"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </Button>

      {isOpen && (
        <Card className="absolute bottom-20 right-0 w-80 shadow-lg">
          <CardHeader className="p-4 border-b flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-12%20at%206.52.26%20AM-gAQVPYp0PeOz4GXGwu8VWa2wMtKGDx.jpeg"
                alt="Enkaj Assistant"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold">Enkaj Assistant</h3>
              <p className="text-sm text-gray-500">How can I help you today?</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-white" : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="flex gap-2">
                <Input value={input} onChange={handleInputChange} placeholder="Type your message..." />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

