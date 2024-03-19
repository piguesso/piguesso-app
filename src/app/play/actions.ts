"use server";

import { db } from "@/db";
import { games } from "@/db/schema/game";
import { players } from "@/db/schema/players";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import slugGenerator from "@/utils/slug-generator";

export const createGame = async (clerkId: string): Promise<{id: number}> => {
  const gameSlug = slugGenerator();
  const game_id = await db.insert(games).values({
    status: "waiting",
    gameSlug: gameSlug,
  }).returning({ id: games.id });

  await db.insert(players).values({
    gameId: game_id[0].id,
    playerId: clerkId,
    is_host: true,
  });

  return redirect(`/play/${gameSlug}`);
}

export const joinGame = (slug: string) => {
  if (slug == "demo") return redirect("/demo");
  const game = db.query.games.findFirst({
    where: eq(games.gameSlug, slug)
  });
  if (!game) {
    return redirect("/play");
  }
  return redirect(`/play/${slug}`);
}