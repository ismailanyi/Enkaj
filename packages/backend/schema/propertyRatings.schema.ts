import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { properties } from "./properties.schema";

export const propertyRatings = mysqlTable("property_ratings", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("property_id")
    .notNull()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  rating: int("rating").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
