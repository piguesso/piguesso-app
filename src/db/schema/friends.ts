import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

const friends = pgTable("friends", {
  userId: varchar("user_id").notNull(),
  friendId: varchar("friend_id").notNull(),
  createdAt: varchar("created_at").notNull(),
});

export type InsertFriend = InferInsertModel<typeof friends>;
export type InsertFriends = InsertFriend[];

export type SelectFriend = InferSelectModel<typeof friends>;
export type SelectFriends = SelectFriend[];

export { friends };
