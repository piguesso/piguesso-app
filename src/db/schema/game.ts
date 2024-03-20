import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import {
  integer,
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
  maxPlayers: integer("max_players").notNull().default(4),
  rounds: integer("rounds").notNull().default(3),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectGame = InferSelectModel<typeof games>;
export type SelectGames = SelectGame[];
export type InsertGame = InferInsertModel<typeof games>;
export type InsertGames = InsertGame[];

export { games };
