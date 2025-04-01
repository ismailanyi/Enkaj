"use server";

import { BASE_URL } from "@/constants";
import { ApiRtrn, Property } from "@/types";

/* const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Modern Downtown Apartment",
    description: "Luxurious 2-bedroom apartment with stunning city views",
    price: 2500,
    listingType: "FOR_RENT",
    location: "Downtown, City",
    media: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    ],
    features: ["2 beds", "2 baths", "parking"],
    status: "available",
  },
  {
    id: 2,
    name: "Suburban Family Home",
    description: "Spacious 4-bedroom house with large backyard",
    price: 450000,
    listingType: "FOR_SALE",
    location: "Suburb Area",
    media: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    ],
    features: ["4 beds", "3 baths", "garden"],
    status: "available",
  },
  {
    id: 3,
    name: "Cozy Studio Loft",
    description: "Perfect starter home in the arts district",
    price: 1800,
    listingType: "FOR_RENT",
    location: "Arts District",
    media: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80",
    ],
    features: ["1 bed", "1 bath", "furnished"],
    status: "available",
  },
  {
    id: 4,
    name: "Luxury Penthouse",
    description: "Exclusive top-floor penthouse with panoramic views",
    price: 5000,
    listingType: "FOR_RENT",
    location: "Financial District",
    media: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    ],
    features: ["3 beds", "3 baths", "terrace"],
    status: "available",
  },
  {
    id: 5,
    name: "Beachfront Villa",
    description: "Stunning villa with direct beach access",
    price: 850000,
    listingType: "FOR_SALE",
    location: "Coastal Area",
    media: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    ],
    features: ["5 beds", "4 baths", "pool"],
    status: "available",
  },
  {
    id: 6,
    name: "Urban Micro Apartment",
    description: "Efficiently designed space in prime location",
    price: 1500,
    listingType: "FOR_RENT",
    location: "City Center",
    media: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
    ],
    features: ["1 bed", "1 bath", "furnished"],
    status: "available",
  },
  {
    id: 7,
    name: "Mountain View Cabin",
    description: "Rustic luxury cabin with breathtaking views",
    price: 350000,
    listingType: "FOR_SALE",
    location: "Mountain Range",
    media: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&q=80",
    ],
    features: ["3 beds", "2 baths", "fireplace"],
    status: "available",
  },
  {
    id: 8,
    name: "Historic Townhouse",
    description: "Beautifully restored historic townhouse",
    price: 3200,
    listingType: "FOR_RENT",
    location: "Historic District",
    media: [
      "https://images.unsplash.com/photo-1520697227012-1a7f0586d085?auto=format&fit=crop&q=80",
    ],
    features: ["4 beds", "3 baths", "garden"],
    status: "available",
  },
  {
    id: 9,
    name: "Eco-Friendly Apartment",
    description: "Modern sustainable living space",
    price: 2800,
    listingType: "FOR_RENT",
    location: "Green Valley",
    media: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80",
    ],
    features: ["2 beds", "2 baths", "solar"],
    status: "available",
  },
  {
    id: 10,
    name: "Garden Cottage",
    description: "Charming cottage with private garden",
    price: 2200,
    listingType: "FOR_RENT",
    location: "Suburban Area",
    media: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
    ],
    features: ["2 beds", "1 bath", "garden"],
    status: "available",
  },
  {
    id: 11,
    name: "City View Apartment",
    description: "Modern apartment with stunning skyline views",
    price: 3500,
    listingType: "FOR_RENT",
    location: "Downtown",
    media: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&q=80",
    ],
    features: ["2 beds", "2 baths", "balcony"],
    status: "available",
  },
  {
    id: 12,
    name: "Lakefront Property",
    description: "Serene home with direct lake access",
    price: 675000,
    listingType: "FOR_SALE",
    location: "Lake District",
    media: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    ],
    features: ["4 beds", "3 baths", "dock"],
    status: "available",
  },
]; */

export const getProperties = async (qry: string = ""): Promise<ApiRtrn> => {
  try {
    const response = await fetch(`${BASE_URL}/properties${qry}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`${BASE_URL}/properties${qry}`);

    if (!response.ok) {
      return {
        success: false,
        // code: resp?.
        data: [],
      };
    }

    const resp = await response.json();

    return {
      success: true,
      data: Array.isArray(resp) ? resp : [resp],
      //   data: SAMPLE_PROPERTIES,
    };
  } catch (error) {
    console.log("getProperties error", error);
    return {
      success: false,
      data: [],
    };
  }
};

export const getAgentsAssigned = async (
  propertyId: number
): Promise<ApiRtrn> => {
  try {
    const response = await fetch(
      `${BASE_URL}/properties/agentsAssigned?propertyId=${propertyId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        data: [],
      };
    }

    const resp = await response.json();

    return {
      success: true,
      data: resp,
    };
  } catch (error) {
    console.log("getProperties error", error);
    return {
      success: false,
      data: [],
    };
  }
};

type BookingArgs = {
  propertyId: number;
  selectedAgent: number;
  visitDate: string;
};

export const saveBooking = async (
  bookingDetails: BookingArgs
): Promise<ApiRtrn> => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingDetails),
    });

    if (!response.ok) {
      return {
        success: false,
        data: [],
      };
    }

    const resp = await response.json();

    return {
      success: true,
      data: resp,
    };
  } catch (error) {
    console.log("savingBooking", error);
    return {
      success: false,
      data: [],
    };
  }
};
