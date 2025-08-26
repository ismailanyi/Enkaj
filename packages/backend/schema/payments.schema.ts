import {
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./users.schema";

export const payments = mysqlTable("payments", {
  paymentId: varchar("payment_id", { length: 255 }).primaryKey(),
  payerId: int("payer_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  amount: int("amount").notNull(),
  paidOn: datetime("paid_on").notNull(),
  paymentMode: mysqlEnum("payment_mode", [
    "M-Pesa",
    "Paypal",
    "Bank",
  ]).notNull(),
  paymentType: mysqlEnum("payment_type", [
    "Deposit",
    "Rent",
    "Fine",
    "Visit",
  ]).notNull(),
});
