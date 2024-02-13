import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const playerScoring = pgTable("player_scoring", {
  playerId: varchar("player_id").notNull(),
  totalXP: integer("total_xp").default(0),
  highestScoreGame: integer("highest_score_game").default(0),
  highestScoreRound: integer("highest_score_round").default(0),
  gamesPlayed: integer("games_played").default(0),
  gamesWon: integer("games_won").default(0),
  gamesLost: integer("games_lost").default(0),
  gamesTop3: integer("games_top3").default(0),
  gamesBottom3: integer("games_bottom3").default(0),
});

export { playerScoring };
