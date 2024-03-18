import { db } from "@/db";
import { playerScoring } from "@/db/schema/scoring";
import { InsertUser, users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export const insertUser = async (user: InsertUser) => {
  return await db.transaction(async (tx) => {
    const createdUser = await tx.insert(users).values(user).execute();
    await tx.insert(playerScoring).values({ playerId: user.clerkId }).execute();
    return createdUser;
  });
};

export const deleteUser = async (clerkId: string) => {
  return await db.transaction(async (tx) => {
    await tx.delete(users).where(eq(users.clerkId, clerkId)).execute();
    await tx
      .delete(playerScoring)
      .where(eq(playerScoring.playerId, clerkId))
      .execute();
  });
};

export const updateUser = async (
  clerkId: string,
  user: Partial<InsertUser>,
) => {
  return await db
    .update(users)
    .set(user)
    .where(eq(users.clerkId, clerkId))
    .execute();
};


export const fetchUsers = async (userName: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userName))
    .execute();
};