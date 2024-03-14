import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { unstable_getServerSideProps } from "next/dist/build/templates/pages";
import { users } from "./user";

const players = pgTable("players", {
  id: serial("id").primaryKey().notNull(),
  playerId: varchar("player_id").notNull().references(() => users.clerkId),
  gameId: serial("game_id").notNull(),
  is_host: boolean("is_host").default(false),
  leftGameAt: timestamp("left_game_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const playersRelations = relations(players, ({ one }) => ({
  users: one(users, {
    fields: [players.playerId],
    references: [users.clerkId],
  }),
}));

export type SelectPlayer = InferSelectModel<typeof players>;
export type SelectPlayers = SelectPlayer[];
export type InsertPlayer = InferInsertModel<typeof players>;
export type InsertPlayers = InsertPlayer[];

export { players };