import DemoLobby from "./demo-lobby";
import { currentUser, SignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { demo } from "@/db/schema/demo";
import DynamicIsland from "@/components/navigation/nav-bar";
import { eq } from "drizzle-orm"
import { games } from "@/db/schema/game";
import { redirect } from "next/navigation";
import TrainingCanvas from "@/app/training/training-canvas";

export default async function Page() {
  // 1. get user
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }
  await db.insert(demo).values({
    clerkId: user.id,
    username: user.username ?? "no username",
    imageUrl: user.imageUrl,
    host: false,
  }).onConflictDoNothing()
  // get game
  const game = await db.query.games.findFirst({
    where: eq(games.id, 42069)
  })
  if (!game) return redirect("/")
  //
  //
  return (
    <div className={"w-full h-full bg-background overflow-hidden"}>
      { game.status === "waiting"
        ?
          <DemoLobby gameSlug={"demo"} gameId={42069} currentUserName={user.username ?? "no username"} host={false} />
        :
          <></>

      }
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? "No username"} />
    </div>
  );
}