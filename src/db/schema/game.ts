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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

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

export type SelectRound = InferSelectModel<typeof rounds>;
export type SelectRounds = SelectRound[];

const playerScoringRound = pgTable("player_scoring_round", {
  playerId: varchar("player_id").notNull(),
  gameId: serial("game_id").notNull(),
  score: integer("score").default(0),
  roundId: serial("round_id").notNull(),
  place: integer("place").default(1),
  isWinner: boolean("is_winner").default(false),
  timeUsedToComplete: integer("time_used_to_complete").default(0),
  firstTopic: varchar("first_topic", { length: 100 }),
  secondTopic: varchar("second_topic", { length: 100 }),
  thirdTopic: varchar("third_topic", { length: 100 }),
  hasStoppedGame: boolean("has_stopped_game").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectPlayerScoringRound = InferSelectModel<typeof playerScoringRound>;
export type SelectPlayerScoringRounds = SelectPlayerScoringRound[];

const players = pgTable("players", {
  playerId: varchar("player_id").notNull(),
  gameId: serial("game_id").notNull(),
  is_host: boolean("is_host").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectPlayer = InferSelectModel<typeof players>;
export type SelectPlayers = SelectPlayer[];

export { games, rounds, players, gameState, playerScoringRound };
