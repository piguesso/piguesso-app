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

const gameState = pgEnum("game_state", ["waiting", "playing", "finished"]);

const games = pgTable("games", {
  id: serial("id").primaryKey(),
  status: gameState("status").default("waiting"),
  winnerId: varchar("winner_id"),
});

export type InsertGame = InferInsertModel<typeof games>;

export type SelectGame = InferSelectModel<typeof games>;
export type SelectGames = SelectGame[];

const rounds = pgTable("rounds", {
  id: serial("id").primaryKey(),
  gameId: serial("game_id").notNull(),
  roundNumber: integer("round_number").notNull(),
  topic: varchar("topic", { length: 100 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
});

export type InsertRound = InferInsertModel<typeof rounds>;
export type InsertRounds = InsertRound[];

export type SelectRound = InferSelectModel<typeof rounds>;
export type SelectRounds = SelectRound[];

const players = pgTable("players", {
  playerId: varchar("player_id").notNull(),
  gameId: serial("game_id").notNull(),
  score: integer("score").default(0),
  round: integer("round").default(1),
  place: integer("place").default(1),
  isHost: boolean("is_host").default(false),
  isWinner: boolean("is_winner").default(false),
});

export type InsertPlayer = InferInsertModel<typeof players>;
export type InsertPlayers = InsertPlayer[];

export type SelectPlayer = InferSelectModel<typeof players>;
export type SelectPlayers = SelectPlayer[];

export { games, rounds, players, gameState };
