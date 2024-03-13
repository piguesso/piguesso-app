"use server";

import { db } from "@/db";
import { games, players } from "@/db/schema/game";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createGame = async (clerkId: string): Promise<{id: number}> => {
  const game_id = await db.insert(games).values({
    status: "waiting",
  }).returning({ id: games.id }).execute();

  await db.insert(players).values({
    gameId: game_id[0].id,
    playerId: clerkId,
    is_host: true,
  });

  return game_id[0];
}

export const joinGame = (slug: number) => {
  db.query.games.findFirst({
    where: eq(games.id, slug)
  });
  // join game
  redirect("/play/")
}