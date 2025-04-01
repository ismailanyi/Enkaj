import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { properties } from "./properties.schema";

export const userProperties = mysqlTable(
  "user_properties",
  {
    tenant_id: int("tenant_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    property_id: int("property_id")
      .notNull()
      .references(() => properties.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.tenant_id, table.property_id] }),
      },
    ];
  }
);
