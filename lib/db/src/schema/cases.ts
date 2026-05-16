import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { clientsTable } from "./clients";

export const casesTable = pgTable("cases", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clientsTable.id, { onDelete: "cascade" }),
  trademarkNumber: text("trademark_number").notNull(),
  trademarkClass: integer("trademark_class").notNull(),
  stage: integer("stage").notNull().default(1),
  requiredDate: date("required_date"),
  description: text("description"),
  due: numeric("due", { precision: 15, scale: 2 }).default("0").notNull(),
  received: numeric("received", { precision: 15, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCaseSchema = createInsertSchema(casesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCaseSchema = insertCaseSchema.partial();

export type InsertCase = z.infer<typeof insertCaseSchema>;
export type UpdateCase = z.infer<typeof updateCaseSchema>;
export type Case = typeof casesTable.$inferSelect;
