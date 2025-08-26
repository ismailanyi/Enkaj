import { mysqlTable, int, datetime, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { properties } from "./properties.schema";

export const visitBookings = mysqlTable("visit_bookings", {
  id: int("id").autoincrement().primaryKey(),
  visitorId: int("visitor_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  propertyId: int("property_id")
    .notNull()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  selectedAgent: int("selected_agent")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  visitDate: datetime("visit_date").notNull(),
  bookedOn: timestamp("booked_on").defaultNow(),
});
