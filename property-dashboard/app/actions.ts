"use server"

import { revalidatePath } from "next/cache"

export async function createListing(data: {
  title: string
  description: string
  price: string
  location: string
}) {
  // In a real application, you would save this data to a database
  console.log("Creating new listing:", data)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the listings page to show the new listing
  revalidatePath("/dashboard/listings")

  return { success: true }
}

