import GameStart from "@/components/game/game-start";
import TimedRedirectAfterScreen from "@/components/game/timed-redirect-after-screen";
import DynamicIsland from "@/components/navigation/nav-bar";
import { SignIn, currentUser } from "@clerk/nextjs";
import Game from "./game"
import GameCanvas from "@/app/play/[game_slug]/game-canvas";
import submit from "@/app/play/[game_slug]/submit";

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
      <Game gameSlug={params.game_slug} currentUserAvatar={user.imageUrl} currentUserId={user.id} currentUserName={user.username ?? "Guest"} />
  );
}
