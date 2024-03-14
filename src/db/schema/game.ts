import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { gameState } from "@/db/schema/game-state";



const games = pgTable("games", {
  id: serial("id").primaryKey(),
  status: gameState("status").default("waiting"),
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
