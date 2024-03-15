import Image from "next/image";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import LobbyCanvas from "@/components/game/lobby-canvas";
import { getLobbyPlayers } from "@/app/play/[game_slug]/actions";
import { useEffect, useState } from "react";

interface LobbyProps {
  gameId: number;
  gameSlug: string;
  currentUserName: string;
}

export interface LobbyPlayer {
  userName: string | null,
  avatarUrl: string
  isHost: boolean
}

export default function Lobby({ gameId, currentUserName, gameSlug }: LobbyProps) {
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>();

  useEffect(() => {
    const fetchLobbyPlayers = async () => {
      const lobbyPlayers = await getLobbyPlayers(gameId);
      setLobbyPlayers(lobbyPlayers);
    }
    fetchLobbyPlayers()
  }, [gameId]);

  return (
    <div className={"w-full h-full bg-back p-6"}>
      <div className={"w-[90%] md:w-2/5 h-1 flex mt-32 content-center mx-auto lg:gap-12 rounded-3xl lg:p-10 flex-col"}>
        <div className={"w-full bg-primary rounded-3xl p-10"}>
          <div className={twMerge(TextStyles.H3, "text-center")}>Game: #{gameId}</div>
          <div className={twMerge(TextStyles.H6, "text-center")}>Game Mode: Fasted Games</div>
          <div className={twMerge(TextStyles.H6, "text-center")}>Game Code: {gameSlug}</div>
        </div>
        <div className={"w-full flex flex-col gap-3 h-full overflow-y-scroll mx-auto"}>
          {lobbyPlayers && lobbyPlayers.map((player, index) => (
            <LobbyPlayerCard userName={player.userName ?? "No Username"} avatarUrl={player.avatarUrl}
                             key={index} currentUserName={currentUserName} isHost={player.isHost} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LobbyPlayerCardProps {
  userName: string,
  avatarUrl: string,
  isHost: boolean,
  currentUserName: string
}

const LobbyPlayerCard = ({ userName, avatarUrl, currentUserName, isHost }: LobbyPlayerCardProps) => {
  return (
    <div className={twMerge("w-full h-20 rounded-xl py-5 px-5 flex gap-6 items-center", userName === currentUserName ? "bg-primary/40" : "bg-surface")}>
      <Image src={avatarUrl} width={50} height={50} alt={""} className={"rounded-full"} />
      <div className={"flex flex-col"}>
        <div className={twMerge(TextStyles.H7)}>{userName}</div>
        <div className={twMerge(TextStyles.RobotoHint)}>{isHost ? "Host" : "Player"} {userName === currentUserName ? "& Me" : ""}</div>
      </div>
    </div>
  );
};