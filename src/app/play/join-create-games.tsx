"use client";

import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import { joinDemoGame } from "./actions";

interface createGameProps {
  clerkId: string;
}

export function CreateGame({ clerkId }: createGameProps) {

  const handleJoinGameClick = () => {
    joinDemoGame();
  }

  return (
    <div
      className={
        "sm:w-2/3 w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"
      }
    >
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Join Game</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>
        Join our demo multiplayer game where you can compete with other players.
      </div>
        <Button
          variant={"contained"}
          className={"rounded-full bg-black py-3 px-8 mx-auto"}
          onClick={() => handleJoinGameClick()}
        >
          Join Game
        </Button>
    </div>
  );
}

/*export function JoinGame() {
  const [gameCode, setGameCode] = useState<string>();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameCode(e.target.value);
  };

  const handleJoin = () => {
    if (!gameCode) return;
    joinGame(gameCode);
  };

  return (
    <div
      className={
        "sm:w-2/3 w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"
      }
    >
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Quick Play</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>
        Join a Game with the Game Code.
      </div>
      <Input
        placeholder={"Game Code"}
        className={"rounded-full bg-white py-3 px-8 mx-auto"}
        onChange={inputChange}
      />
      <Button
        variant={"contained"}
        className={"rounded-full bg-black py-3 px-8 mx-auto"}
        onClick={handleJoin}
        disabled={!gameCode}
      >
        Join Game
      </Button>
    </div>
  );
}*/
