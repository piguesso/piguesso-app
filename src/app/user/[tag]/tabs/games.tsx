import GameCard from "@/components/profile/game-card";
import { db } from "@/db";
import { games, players, rounds } from "@/db/schema/game";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export default async function GamesTab({ playerId }: { playerId: string }) {
  const fetchedGames = await db
    .select()
    .from(games)
    .innerJoin(players, eq(players.gameId, games.id))
    .where(eq(players.playerId, playerId))
    .execute();

  return (
    <div className={"w-[90%]"}>
      {fetchedGames.length === 0 && (
        <h1 className="text-center text-xl font-bold">No games found</h1>
      )}
      {fetchedGames.map((game) => (
        <GameCard
          key={game.games.id}
          id={game.games.id}
          status={game.games.status ?? "waiting"}
        />
      ))}
    </div>
  );
}
