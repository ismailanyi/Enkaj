import { mysqlTable, varchar, int, datetime } from "drizzle-orm/mysql-core";

export const demoBooking = mysqlTable("demo_booking", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  demoDate: datetime("date_time").unique(),
});
