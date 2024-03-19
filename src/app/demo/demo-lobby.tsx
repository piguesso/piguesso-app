import Image from "next/image";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import LandingCanvas from "@/components/game/landing-canvas";
import { getLobbyPlayers } from "@/app/play/[game_slug]/actions";
import { useEffect, useState } from "react";
import { db } from "@/db";
import { Button } from "@mui/material";
import { games } from "@/db/schema/game";
import { State } from "@/utils/enums";
import { eq } from "drizzle-orm";
import StartDemoButton from "@/app/demo/start-demo-button";
import { startGame } from "@/app/demo/actions";
interface LobbyProps {
  gameId: number;
  gameSlug: string;
  currentUserName: string;
  host: boolean;
}

export interface LobbyPlayer {
  userName: string | null;
  avatarUrl: string;
  host: boolean;
}

export default async function DemoLobby({
  gameId,
  currentUserName,
  gameSlug,
  host,
}: LobbyProps) {
  const lobbyPlayers = await db.query.demo.findMany();
  console.log(lobbyPlayers);

  return (
    <div className={"w-full h-full bg-back p-6"}>
      <div
        className={
          "w-[90%] md:w-2/5 h-1 flex mt-32 content-center mx-auto lg:gap-12 rounded-3xl lg:p-10 flex-col"
        }
      >
        <div className={"w-full bg-primary rounded-3xl p-10"}>
          <div className={twMerge(TextStyles.H3, "text-center")}>
            Game: #{gameId}
          </div>
          <div className={twMerge(TextStyles.H6, "text-center")}>
            Game Mode: Fasted Games
          </div>
          <div className={twMerge(TextStyles.H6, "text-center")}>
            Game Code: {gameSlug}
          </div>
        </div>
        <div
          className={
            "w-full flex flex-col gap-3 h-full overflow-y-scroll mx-auto"
          }
        >
          {lobbyPlayers.map((player, index) => (
            <LobbyPlayerCard
              userName={player.username ?? "No Username"}
              avatarUrl={player.imageUrl ?? ""}
              key={index}
              currentUserName={currentUserName}
              isHost={player.host}
            />
          ))}
        </div>
        <div className={"w-full flex justify-between"}>
          <StartDemoButton startGame={startGame} />
        </div>
      </div>
    </div>
  );
}

interface LobbyPlayerCardProps {
  userName: string;
  avatarUrl: string;
  isHost: boolean;
  currentUserName: string;
}

const LobbyPlayerCard = ({
  userName,
  avatarUrl,
  currentUserName,
  isHost,
}: LobbyPlayerCardProps) => {
  return (
    <div
      className={twMerge(
        "w-full h-20 rounded-xl py-5 px-5 flex gap-6 items-center border-2 border-white",
        userName === currentUserName ? "bg-primary/40" : "bg-surface",
      )}
    >
      <Image
        src={avatarUrl}
        width={50}
        height={50}
        alt={""}
        className={"rounded-full"}
      />
      <div className={"flex flex-col"}>
        <div className={twMerge(TextStyles.H7)}>{userName}</div>
        <div className={twMerge(TextStyles.RobotoHint)}>
          {isHost ? "Host" : "Player"}{" "}
          {userName === currentUserName ? "& Me" : ""}
        </div>
      </div>
    </div>
  );
};
