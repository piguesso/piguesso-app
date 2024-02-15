import { pgTable, varchar } from "drizzle-orm/pg-core";

const friends = pgTable("friends", {
  userId: varchar("user_id").notNull(),
  friendId: varchar("friend_id").notNull(),
  createdAt: varchar("created_at").notNull(),
});

export { friends };