import {
  mysqlTable,
  varchar,
  int,
  text,
  json,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

type Manager = {
  name: string;
  email: string;
  phone: string;
};

export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),

  area: varchar("area", { length: 100 }).notNull(), //Kitisuru, Muthainga, Runda e.t.c
  location: varchar("location", { length: 255 }).notNull(), // Off Ngong Road Near bla bla bla...

  propertyType: mysqlEnum("property_type", [
    "House",
    "Apartment/Flat",
    "Town House",
    "Vacant Land/Plot",
    "Farm",
    "Commercial Property",
    "Industrial Property",
  ]).notNull(),
  listingType: mysqlEnum("listing_type", [
    "FOR_RENT",
    "FOR_SALE",
    "FOR_LEASE",
    "FOR_DEVELOPMENT",
  ]).notNull(),

  price: int("price").notNull(),

  priceType: mysqlEnum("price_type", [
    "PER_MONTH", // For rent
    "TOTAL_PRICE", // For sale
    "PER_SQFT", // For development
    "PER_YEAR", // For lease
  ]).notNull(),

  media: json("media").$type<string[]>().notNull(), // can be multiple

  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  features: json("features").$type<string[]>(),

  description: text("description").notNull(),
  funFact: text("fun_fact"),

  requirements: json("requirements").$type<string[]>(),

  additionalRequirements: text("additional_requirements"),

  status: mysqlEnum("status", [
    "Vacant",
    "Occupied",
    "In Construction",
    "Booked",
    "Sold",
  ]).default("Vacant"),
  // .notNull(),

  // manager details
  manager: json("manager").$type<Manager>().notNull(),
});
