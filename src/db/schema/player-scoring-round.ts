import { bigint, boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

const playerScoringRound = pgTable("player_scoring_round", {
  id: serial("id").primaryKey(),
  playerId: varchar("player_id").notNull(),
  gameId: serial("game_id").notNull(),
  score: integer("score").default(0),
  roundId: serial("round_id").notNull(),
  place: integer("place").default(1),
  isWinner: boolean("is_winner").default(false),
  timeUsedToComplete: bigint("time_used_to_complete", { mode: 'number' }).default(0),
  firstTopic: varchar("first_topic", { length: 100 }),
  secondTopic: varchar("second_topic", { length: 100 }),
  thirdTopic: varchar("third_topic", { length: 100 }),
  hasStoppedGame: boolean("has_stopped_game").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectPlayerScoringRound = InferSelectModel<typeof playerScoringRound>;
export type SelectPlayerScoringRounds = SelectPlayerScoringRound[];
export type InsertPlayerScoringRound = InferInsertModel<typeof playerScoringRound>;
export type InsertPlayerScoringRounds = InsertPlayerScoringRound[];

export { playerScoringRound };