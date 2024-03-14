import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

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
export type InsertRound = InferInsertModel<typeof rounds>;
export type InsertRounds = InsertRound[];

export { rounds };