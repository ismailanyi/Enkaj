"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

const mockMessages: Message[] = [
  { id: 1, sender: "Alice", content: "Hi, I'm interested in the luxury apartment.", timestamp: "2023-06-10 10:30" },
  { id: 2, sender: "Bob", content: "Is the office space still available?", timestamp: "2023-06-11 14:15" },
  {
    id: 3,
    sender: "Charlie",
    content: "Can we schedule a viewing for the beach house?",
    timestamp: "2023-06-12 09:45",
  },
]

export function MessagingCenter() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-200px)]">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-primary">Conversations</h2>
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedMessage(message)}
          >
            <p className="font-semibold text-secondary">{message.sender}</p>
            <p className="text-sm text-gray-600 truncate">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              <h2 className="text-xl font-semibold mb-2 text-primary">Conversation with {selectedMessage.sender}</h2>
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-secondary">{selectedMessage.content}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedMessage.timestamp}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-primary text-white hover:bg-primary/90">
                Send
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a conversation to start messaging</p>
        )}
      </div>
    </div>
  )
}

