import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean, decimal,
  integer, jsonb,
  pgTable, real,
  serial, text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { Mat } from "opencv-ts";

const demo = pgTable("demo", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id").notNull().unique(),
  drawing: jsonb("drawing").$type<{data: Mat}>(),
  term: integer("term"),
  guess: integer("guess"),
  termConfidence: real("term_confidence").default(0.0),
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