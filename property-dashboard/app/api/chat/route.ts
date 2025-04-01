import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system:
      "You are Enkaj Assistant, a helpful chatbot for property management platform. Your role is to assist users with their inquiries and relay important issues to the admin. Always be friendly and professional.",
  })

  return response.toDataStreamResponse()
}

