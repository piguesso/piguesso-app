import { db } from "@/db";
import { InsertFriends, friends } from "@/db/schema/friends";
import { and, eq } from "drizzle-orm";

export const insertFriends = async (friendsData: InsertFriends) => {
  return await db.insert(friends).values(friendsData).execute();
};

export const deleteFriend = async (userId: string, friendId: string) => {
  return await db
    .delete(friends)
    .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)))
    .execute();
};

export const fetchFriends = async (userId: string) => {
  return await db
    .select()
    .from(friends)
    .where(eq(friends.userId, userId))
    .execute();
};

export const fetchFriend = async (userId: string, friendId: string) => {
  return await db
    .select()
    .from(friends)
    .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)))
    .execute();
};
