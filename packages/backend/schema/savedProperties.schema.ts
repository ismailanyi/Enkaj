import { mysqlTable, int, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { properties } from "./properties.schema";

export const savedProperties = mysqlTable(
  "saved_properties",
  {
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
    savedOn: timestamp("saved_on").defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.propertyId, table.userID] }),
      },
    ];
  }
);
