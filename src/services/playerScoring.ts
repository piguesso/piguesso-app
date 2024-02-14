import { db } from "@/db";
import { InsertPlayerScoring, playerScoring } from "@/db/schema/scoring";
import { eq } from "drizzle-orm";

export const updatePlayerScoring = async (
  playerId: string,
  scoring: Partial<InsertPlayerScoring>,
) => {
  return await db
    .update(playerScoring)
    .set(scoring)
    .where(eq(playerScoring.playerId, playerId))
    .execute();
};

export const fetchPlayerScoring = async (playerId: string) => {
  return await db
    .select()
    .from(playerScoring)
    .where(eq(playerScoring.playerId, playerId))
    .execute();
};
