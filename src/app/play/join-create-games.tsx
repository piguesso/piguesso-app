"use client";

import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import { Button, Input } from "@mui/material";
import { createGame, joinGame } from "@/app/play/actions";
import { useState } from "react";
import { redirect } from "next/navigation";

interface createGameProps {
  clerkId: string;
}


export function CreateGame({ clerkId }: createGameProps) {

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGame = () => {
    setIsLoading(true);
    createGame(clerkId).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className={"sm:w-2/3 w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"}>
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Create Game</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>
        Create a game with your parameters and invite friends
      </div>
      { isLoading
        ? <div>Loading...</div>
        : <Button variant={"contained"} className={"rounded-full bg-black py-3 px-8 mx-auto"} onClick={() => handleCreateGame()}>
          Create Game
        </Button>
      }
    </div>
  );
}

export function JoinGame() {
  const [gameCode, setGameCode] = useState<number>();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // sollte das weiter number bleiben?
    setGameCode(parseInt(e.target.value));
  };

  const handleJoin = () => {
    if (!gameCode) return;
    joinGame(gameCode);
  };

  return (
    <div className={"sm:w-2/3 w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"}>
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Quick Play</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>Join a Game with the Game Code.</div>
      <Input placeholder={"Game Code"} className={"rounded-full bg-white py-3 px-8 mx-auto"} onChange={inputChange} />
      <Button variant={"contained"} className={"rounded-full bg-black py-3 px-8 mx-auto"} onClick={handleJoin} disabled={!gameCode}>
        Join Game
      </Button>
    </div>
  );
}