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

export type Property = {
  id: number;
  name: string;
  description: string;
  slug: string;
  media: string[];
  location: string;
  propertyType: PROPERTY_TYPE;
  listingType: LISTING_TYPE;
  price: number;
  bedrooms: null;
  bathrooms: null;
  area: string;
  priceType: PRICING_TYPE;
  status: PROPERTY_STATUS;
  rating: number;
};

export type ApiRtrn = {
  success: boolean;
  data?: any;
  message?: string;
  code?: number;
};
