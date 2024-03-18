import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const playerScoring = pgTable("player_scoring", {
  id: serial("id").primaryKey(),
  playerId: varchar("player_id").notNull(),
  totalXP: integer("total_xp").default(0),
  highestScoreGame: integer("highest_score_game").default(0),
  highestScoreRound: integer("highest_score_round").default(0),
  gamesPlayed: integer("games_played").default(0),
  gamesWon: integer("games_won").default(0),
  gamesLost: integer("games_lost").default(0),
  gamesTop3: integer("games_top3").default(0),
  gamesBottom3: integer("games_bottom3").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertPlayerScoring = InferInsertModel<typeof playerScoring>;

export type SelectPlayerScoring = InferSelectModel<typeof playerScoring>;

export { playerScoring };
