"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { players, SelectPlayers } from "@/db/schema/players";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { LobbyPlayer } from "@/components/game/lobby";

async function getClerkUserById(clerkId: string) {
  return await clerkClient.users.getUser(clerkId);
}

export async function getLobbyPlayers(gameId: number) {
  const playersInGame:SelectPlayers = await db.query.players.findMany({
    where: eq(players.gameId, gameId),
    with: { users: true }
  });

  return await Promise.all(playersInGame.map(async (player) => {
    const clerkUser = await getClerkUserById(player.playerId);
    const lobbyPlayer: LobbyPlayer = {
      userName: clerkUser.username,
      avatarUrl: clerkUser.imageUrl,
      isHost: player.is_host || false,
    };
    return lobbyPlayer;
  }))
}

