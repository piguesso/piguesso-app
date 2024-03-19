import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const games = pgTable("games", {
  id: serial("id").primaryKey(),
  status: varchar("status").default("waiting"),
  gameSlug: varchar("game_slug").notNull(),
  winnerId: varchar("winner_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectGame = InferSelectModel<typeof games>;
export type SelectGames = SelectGame[];
export type InsertGame = InferInsertModel<typeof games>;
export type InsertGames = InsertGame[];

export { games };
