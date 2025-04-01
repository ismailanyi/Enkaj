import { mysqlTable, int, primaryKey } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";

export const userRatings = mysqlTable(
  "user_ratings",
  {
    ratedBy: int("rated_by")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ratedUser: int("rated_user")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    rate: int("rate").notNull(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.ratedBy, table.ratedUser] }),
      },
    ];
  }
);
