"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import LobbyCanvas from "@/app/play/[game_slug]/lobby-canvas";

interface LobbyProps {
  gameId: number;
}

interface LobbyPlayer {
  userName: string,
  avatarUrl: string
}

export default function Lobby({ gameId }: LobbyProps) {
  const [players, setPlayers] = useState<LobbyPlayer[]>();

  useEffect(() => {
    // get current players in Lobby by Gameslug or something
    const gs = gameId;
  }, [gameId]);

  return (
    <div className={"w-full h-full bg-back p-6"}>
      <div className={"w-full flex flex-col gap-3"}></div>
      <div className={twMerge(TextStyles.H2, "text-center")}>Lobby</div>
      <div className={twMerge(TextStyles.H4, "text-center")}>Don&apos t go anywhere the game will start soon!</div>
      <div className={twMerge(TextStyles.BigText, "text-center")}>Game Code: {gameId}</div>
      <div className={"w-[90%] h-2/3 flex mt-32 content-center mx-auto lg:gap-12 lg:border-2 rounded-3xl lg:p-10"}>
        <div className={"flex flex-col gap-3 h-full overflow-y-scroll mx-auto"}>
          {players?.map((player, index) => (
            <LobbyPlayerCard {...player} key={index} />
          ))}
        </div>
        <div className={"lg:block hidden"}>
          <div className={twMerge(TextStyles.BigText, "font-bold")}>While you wait ...</div>
          <LobbyCanvas />
        </div>
      </div>
    </div>
  );
}

const LobbyPlayerCard = (player: LobbyPlayer, index:number) => {
  return (
    <div className={"h-16 border-2 border-white rounded-3xl py-5 px-10 flex gap-6 items-center justify-between"}>
      <div className={"flex items-center gap-3"}>
        <div className={twMerge(TextStyles.H4)}>#1</div>
        <div className={twMerge(TextStyles.BigText)}>SpielerName</div>
      </div>
      <Image src={"/next.svg"} width={50} height={50} alt={""} className={"rounded-full bg-white"} />
    </div>
  );
};