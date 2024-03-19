import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean, decimal,
  integer, jsonb,
  pgTable,
  serial, text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

const demo = pgTable("demo", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id").notNull().unique(),
  drawing: jsonb("drawing").$type<{data: number[][][]}>(),
  term: integer("term"),
  guess: integer("guess"),
  termConfidence: decimal("term_confidence"),
  host: boolean("host").notNull().default(false),
  imageUrl: text("image_url"),
  username: text("username").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectDemo = InferSelectModel<typeof demo>;
export type SelectDemos = SelectDemo[];
export type InsertDemo = InferInsertModel<typeof demo>;
export type InsertDemos = InsertDemo[];

export { demo };