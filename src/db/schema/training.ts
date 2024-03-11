import { integer, json, jsonb, makePgArray, pgTable, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


const training = pgTable("training", {
  clerkId: varchar("clerk_id").primaryKey().unique().notNull(),
  drawing: jsonb("drawing").$type<{data: number[][][]}>().notNull(),
});

export type InsertTraining = InferInsertModel<typeof training>;

export type SelectTraining = InferSelectModel<typeof training>;

export { training };
