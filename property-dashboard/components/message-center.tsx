"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Message = {
  id: number
  sender: string
  recipient: string
  content: string
  timestamp: string
  type: "general" | "repair" | "renovation" | "notice" | "warning"
  status: "new" | "in-progress" | "completed"
}

type Tenant = {
  id: number
  name: string
  email: string
  username: string
}

export function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Admin",
      recipient: "John Doe",
      content: "The sink in unit 301 is leaking.",
      timestamp: "2023-07-01 10:30",
      type: "repair",
      status: "new",
    },
    {
      id: 2,
      sender: "Admin",
      recipient: "Jane Smith",
      content: "Can we discuss renovating the lobby?",
      timestamp: "2023-07-02 14:15",
      type: "renovation",
      status: "new",
    },
    {
      id: 3,
      sender: "Admin",
      recipient: "Mike Johnson",
      content: "The elevator is making strange noises.",
      timestamp: "2023-07-03 09:45",
      type: "repair",
      status: "in-progress",
    },
    {
      id: 4,
      sender: "Admin",
      recipient: "Sarah Williams",
      content: "Notice to vacate: Please vacate the premises by the end of the month.",
      timestamp: "2023-07-04 11:00",
      type: "notice",
      status: "new",
    },
    {
      id: 5,
      sender: "Admin",
      recipient: "Tom Brown",
      content: "WARNING: Late rent payment. Please settle your dues immediately to avoid further action.",
      timestamp: "2023-07-05 15:30",
      type: "warning",
      status: "new",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [messageType, setMessageType] = useState<"general" | "repair" | "renovation" | "notice" | "warning">("general")
  const [selectedTenant, setSelectedTenant] = useState<string>("")

  // Mock tenant data
  const tenants: Tenant[] = [
    { id: 1, name: "John Doe", email: "john@example.com", username: "johnd" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", username: "janes" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", username: "mikej" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", username: "sarahw" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", username: "tomb" },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "" || selectedTenant === "") return

    const tenant = tenants.find((t) => t.id.toString() === selectedTenant)
    if (!tenant) return

    const message: Message = {
      id: messages.length + 1,
      sender: "Admin",
      recipient: tenant.name,
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      type: messageType,
      status: "new",
    }

    setMessages([...messages, message])
    setNewMessage("")
    setMessageType("general")
    setSelectedTenant("")
  }

  const handleStatusChange = (id: number, newStatus: "new" | "in-progress" | "completed") => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status: newStatus } : message)))
  }

  const getMessageStyle = (type: Message["type"]) => {
    switch (type) {
      case "notice":
        return "text-orange-600 font-semibold"
      case "warning":
        return "text-red-600 font-bold"
      default:
        return ""
    }
  }

  return (
    <div className="flex h-[calc(100vh-200px)]">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 hover:bg-gray-100 cursor-pointer ${getMessageStyle(message.type)}`}
            onClick={() => setSelectedMessage(message)}
          >
            <p className="font-semibold">{message.recipient}</p>
            <p className="text-sm text-gray-600 truncate">{message.content}</p>
            <p className="text-xs text-gray-500">{message.timestamp}</p>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              <h2 className="text-xl font-semibold mb-2">Message to {selectedMessage.recipient}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className={getMessageStyle(selectedMessage.type)}>{selectedMessage.content}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedMessage.timestamp}</p>
                  <div className="mt-4">
                    <p className="font-semibold">Type: {selectedMessage.type}</p>
                    <div className="flex items-center mt-2">
                      <p className="font-semibold mr-2">Status:</p>
                      <Select
                        value={selectedMessage.status}
                        onValueChange={(value: "new" | "in-progress" | "completed") =>
                          handleStatusChange(selectedMessage.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-center text-gray-500 mb-4">Select a message to view details or send a new message</p>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenant">Tenant</Label>
                    <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                      <SelectTrigger id="tenant">
                        <SelectValue placeholder="Select tenant" />
                      </SelectTrigger>
                      <SelectContent>
                        {tenants.map((tenant) => (
                          <SelectItem key={tenant.id} value={tenant.id.toString()}>
                            {tenant.name} ({tenant.username})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-type">Message Type</Label>
                    <Select value={messageType} onValueChange={(value: typeof messageType) => setMessageType(value)}>
                      <SelectTrigger id="message-type">
                        <SelectValue placeholder="Select message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="notice">Notice to Vacate</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message-content">Message</Label>
                    <Textarea
                      id="message-content"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                  </div>
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

