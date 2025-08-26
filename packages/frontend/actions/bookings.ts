"use server";

import { BASE_URL } from "@/constants";
import { ApiRtrn } from "@/types";

type Args = {
  name: string;
  email: string;
  demoDate: string;
};

export const saveDemoBooking = async (args: Args): Promise<ApiRtrn> => {
  try {
    const response = await fetch(`${BASE_URL}/booking-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
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

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const addToWaitingList = async (email: string): Promise<ApiRtrn> => {
  try {
    const response = await fetch(`${BASE_URL}/waitinglist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
