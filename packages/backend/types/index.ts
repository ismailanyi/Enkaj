// START OF: User Types
export type UserType = "Landlord" | "Tenant" | "Admin" | "Agent" | "Visitor";

export type PropertyAgent = {
  propertyId: number;
  agentId: number;
};
// END OF: User Types

// END OF: Property Types
export type PropertyType =
  | "House"
  | "Apartment/Flat"
  | "Town House"
  | "Vacant Land/Plot"
  | "Farm"
  | "Commercial Property"
  | "Industrial Property";

export type ListingType =
  | "FOR_RENT"
  | "FOR_SALE"
  | "FOR_LEASE"
  | "FOR_DEVELOPMENT";

export type PriceType = "PER_MONTH" | "TOTAL_PRICE" | "PER_SQFT" | "PER_YEAR";

export type PropertyStatus =
  | "Vacant"
  | "Occupied"
  | "In Construction"
  | "Booked"
  | "Sold";
// END OF: Property Types
