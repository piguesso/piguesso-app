import { db } from "@/db";
import {
  InsertGame,
  InsertPlayer,
  InsertPlayers,
  InsertRound,
  InsertRounds,
  games,
  players,
  rounds,
} from "@/db/schema/game";
import { eq } from "drizzle-orm";

export const insertGame = async (game: InsertGame) => {
  return await db.insert(games).values(game).execute();
};

export const deleteGame = async (id: number) => {
  return await db.transaction(async (tx) => {
    await tx.delete(games).where(eq(games.id, id));
    await tx.delete(players).where(eq(players.gameId, id));
    await tx.delete(rounds).where(eq(rounds.gameId, id));
  });
};

export const fetchGames = async () => {
  return await db.select().from(games).execute();
};

export const fetchGame = async (id: number) => {
  return await db.select().from(games).where(eq(games.id, id)).execute();
};

export const updateGame = async (id: number, game: Partial<InsertGame>) => {
  return await db.update(games).set(game).where(eq(games.id, id)).execute();
};

export const insertRounds = async (roundData: InsertRounds) => {
  return await db.insert(rounds).values(roundData).execute();
};

export const fetchRounds = async (gameId: number) => {
  return await db
    .select()
    .from(rounds)
    .where(eq(rounds.gameId, gameId))
    .execute();
};

export const fetchRound = async (id: number) => {
  return await db.select().from(rounds).where(eq(rounds.id, id)).execute();
};

export const updateRound = async (id: number, round: Partial<InsertRound>) => {
  return await db.update(rounds).set(round).where(eq(rounds.id, id)).execute();
};

export const insertPlayers = async (playerData: InsertPlayers) => {
  return await db.insert(players).values(playerData).execute();
};

export const fetchPlayers = async (gameId: number) => {
  return await db
    .select()
    .from(players)
    .where(eq(players.gameId, gameId))
    .execute();
};

export const fetchPlayer = async (playerId: string) => {
  return await db
    .select()
    .from(players)
    .where(eq(players.playerId, playerId))
    .execute();
};

export const updatePlayer = async (
  playerId: string,
  player: Partial<InsertPlayer>,
) => {
  return await db
    .update(players)
    .set(player)
    .where(eq(players.playerId, playerId))
    .execute();
};
