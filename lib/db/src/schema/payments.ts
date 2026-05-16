import {
  pgTable,
  serial,
  integer,
  numeric,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { clientsTable } from "./clients";
import { casesTable } from "./cases";

export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clientsTable.id, { onDelete: "cascade" }),
  caseId: integer("case_id").references(() => casesTable.id, {
    onDelete: "set null",
  }),
  type: text("type").notNull(), // "due" | "received"
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  date: date("date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPaymentSchema = createInsertSchema(paymentsTable).omit({
  id: true,
  createdAt: true,
});

export const updatePaymentSchema = insertPaymentSchema.partial();

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type UpdatePayment = z.infer<typeof updatePaymentSchema>;
export type Payment = typeof paymentsTable.$inferSelect;
