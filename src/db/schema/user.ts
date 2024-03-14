import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  clerkId: varchar("clerk_id").notNull(),
  biography: varchar("biography", { length: 1000 }),
  tag: varchar("tag").unique().notNull(),
});

export type InsertUser = InferInsertModel<typeof users>;

export type SelectUser = InferSelectModel<typeof users>;
export type SelectUsers = SelectUser[];
