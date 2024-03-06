import GameStart from "@/components/game/game-start";
import TimedRedirectAfterScreen from "@/components/game/timed-redirect-after-screen";
import DynamicIsland from "@/components/navigation/nav-bar";
import { SignIn, currentUser } from "@clerk/nextjs";

interface introProps {
  params: {
    game_slug: string;
  };
}

const TIME_TILL_START = 5000;
export default async function page({ params }: introProps) {

  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  return (
    <div className={"w-full h-full bg-primary overflow-clip"}>
      <TimedRedirectAfterScreen time={TIME_TILL_START} href={"/training"}>
        <GameStart time={TIME_TILL_START} />
      </TimedRedirectAfterScreen>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined}/>
    </div>
  );
}
