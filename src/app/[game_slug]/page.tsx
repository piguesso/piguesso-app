import GameStart from "@/components/game/game-start";
import TimedRedirectAfterScreen from "@/components/game/timed-redirect-after-screen";

interface introProps {
  params: {
    game_slug: string;
  };
}

const TIME_TILL_START = 500000;

export default function page({ params }: introProps) {
  return (
    <div className={"w-full h-full bg-primary overflow-clip"}>
      <TimedRedirectAfterScreen time={TIME_TILL_START} href={"/"}>
        <GameStart time={TIME_TILL_START} />
      </TimedRedirectAfterScreen>
    </div>
  );
}
