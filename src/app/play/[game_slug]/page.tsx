import { SignIn, currentUser } from "@clerk/nextjs";
import Wrapper from "./wrapper";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { games } from "@/db/schema/game";
import { redirect } from "next/navigation";
import { players } from "@/db/schema/players";

interface IntroProps {
  params: {
    game_slug: string;
  };
}

export default async function page({ params }: IntroProps) {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  const currentGame = await db.query.games.findFirst({
    where: eq(games.gameSlug, params.game_slug),
  });

  if (!currentGame) {
    return redirect("/play");
  }

  const isCurrentUserInGame = await db.query.players.findFirst({
    where: and(
      eq(players.playerId, user.id),
      eq(players.gameId, currentGame.id),
    ),
  });

  if (!isCurrentUserInGame) {
    db.insert(players).values({
      playerId: user.id,
      gameId: currentGame.id,
    });
  }

  return (
    <Wrapper
      gameSlug={params.game_slug}
      clerkId={user.id}
      name={user.username ?? "Guest"}
      avatar={user.imageUrl}
      userAuthToken={user.username ?? ""}
      gameId={currentGame.id}
    />
  );
}
