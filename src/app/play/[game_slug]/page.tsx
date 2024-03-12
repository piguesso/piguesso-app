import GameStart from "@/components/game/game-start";
import TimedRedirectAfterScreen from "@/components/game/timed-redirect-after-screen";
import DynamicIsland from "@/components/navigation/nav-bar";
import { SignIn, currentUser } from "@clerk/nextjs";
import Game from "./game"

interface introProps {
  params: {
    game_slug: string;
  };
}

export default async function page({ params }: introProps) {

  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  return (
    <div className={"w-full h-full bg-black overflow-clip"}>
      <Game gameSlug={params.game_slug}/>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined}/>
    </div>
  );
}
