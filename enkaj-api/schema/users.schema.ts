import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  date,
  text,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  userType: mysqlEnum("user_type", [
    "Landlord",
    "Tenant",
    "Admin",
    "Agent",
    "Visitor",
  ])
    .default("Visitor")
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  dob: date("dob"),
  phone: varchar("phone", { length: 20 }).unique(),
  bio: text("bio"),
  image: varchar("image", { length: 255 }),
  lastLogin: timestamp("last_login"),
  password: varchar("password", { length: 255 }).notNull(),
});
