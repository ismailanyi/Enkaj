export type pageProps = {
  params: any;
  searchParams: any;
};

export type PROPERTY_STATUS =
  | "Vacant"
  | "Occupied"
  | "In Construction"
  | "Booked"
  | "Sold";

export type PRICING_TYPE =
  | "PER_MONTH"
  | "TOTAL_PRICE"
  | "PER_SQFT"
  | "PER_YEAR";

export type LISTING_TYPE =
  | "FOR_RENT"
  | "FOR_SALE"
  | "FOR_LEASE"
  | "FOR_DEVELOPMENT";

export type PROPERTY_TYPE =
  | "House"
  | "Apartment/Flat"
  | "Town House"
  | "Vacant Land/Plot"
  | "Farm"
  | "Commercial Property"
  | "Industrial Property";

export interface Property {
  id: number;
  name: string;
  description: string;
  slug: string;
  location: string;
  propertyType: PROPERTY_TYPE;
  listingType: LISTING_TYPE;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  priceType: PRICING_TYPE;
  media: string[];
  features: string[];
  status: string;
  rating: number;
}

export interface User {
  id: number;
  name: string;
  image?: string;
  email?: string;
  phone?: string;
  role: "Landlord" | "Tenant" | "Admin" | "Agent" | "Visitor";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  createdAt: Date;
}

export type ApiRtrn = {
  success: boolean;
  data?: any;
  message?: string;
  code?: number;
};
