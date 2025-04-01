import { mysqlTable, int } from "drizzle-orm/mysql-core";
import { properties } from "./properties.schema";
import { users } from "./users.schema";

export const propertyAgents = mysqlTable("property_agents", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("property_id")
    .notNull()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  agentId: int("agent_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
