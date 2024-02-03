import GameStart from "@/components/game/game-start";
import TimedRedirectAfterScreen from "@/components/game/timed-redirect-after-screen";
import DynamicIsland from "@/components/navigation/nav-bar";

interface introProps {
  params: {
    game_slug: string;
  };
}

const TIME_TILL_START = 5000;
export default function page({ params }: introProps) {
  return (
    <div className={"w-full h-full bg-primary overflow-clip"}>
      <TimedRedirectAfterScreen time={TIME_TILL_START} href={"/drawing"}>
        <GameStart time={TIME_TILL_START} />
      </TimedRedirectAfterScreen>
      <DynamicIsland />
    </div>
  );
}
