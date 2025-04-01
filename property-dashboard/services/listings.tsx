"use server";

import { BASE_URL } from "@/constants";
import { ApiRtrn } from "@/types/properties";
import { revalidatePath } from "next/cache";

export async function createListing(data: FormData) {
  // In a real application, you would save this data to a database

  // console.log("Creating new listing:", data);

  const formValues: any = {};

  // Add all other form fields
  for (const [key, value] of data.entries()) {
    formValues[key] = value;
  }

  if (data.has("requirements")) {
    const requirements = JSON.parse(data.get("requirements") as string);

    // START OF: Requirements
    const requirementsArray = Object.entries(requirements)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key);

    if (requirementsArray.length > 0) {
      formValues.requirements = requirementsArray;
    }
    // END OF: Requirements
  }

  formValues.manager = JSON.parse(data.get("manager") as string);
  formValues.media = JSON.parse(data.get("media") as string);

  const { images, ...valuesToSendToApi } = formValues;

  const response = await fetch(`${BASE_URL}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valuesToSendToApi),
    credentials: "include",
  });

  const resp = await response.json();

  if (!response.ok) {
    return {
      success: false,

      ...(resp?.error && {
        message: resp.error,
      }),
    };
  }

  // revalidatePath("/dashboard");

  return { success: true };
}

export async function getListings(): Promise<ApiRtrn> {
  try {
    const response = await fetch(`${BASE_URL}/properties`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
      };
    }

    const theData = await response.json();

    return {
      success: true,
      data: theData,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
    };
  }
}
