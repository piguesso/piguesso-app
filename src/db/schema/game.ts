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
  winnerId: serial("winner_id"),
});

const rounds = pgTable("rounds", {
  id: serial("id").primaryKey(),
  gameId: serial("game_id").notNull(),
  roundNumber: integer("round_number").notNull(),
  topic: varchar("topic", { length: 100 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
});

const players = pgTable("players", {
  playerId: varchar("player_id").notNull(),
  gameId: serial("game_id").notNull(),
  score: integer("score").default(0),
  round: integer("round").default(1),
  place: integer("place").default(1),
  isHost: boolean("is_host").default(false),
  isWinner: boolean("is_winner").default(false),
});

export { games, rounds, players, gameState };
