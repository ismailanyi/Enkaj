import { mysqlTable, int, text } from "drizzle-orm/mysql-core";
import { properties } from "./properties.schema";
import { users } from "./users.schema";

export const propertyReviews = mysqlTable("property_reviews", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("property_id")
    .notNull()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userID: int("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  review: text().notNull(),
});
