import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const waitlist = mysqlTable("waitlist", {
  email: varchar("email", { length: 255 }).unique().notNull(),
});
