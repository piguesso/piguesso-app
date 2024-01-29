"use client";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";
import ClientCountdown from "@/components/game/client-countdown";
import Textstyles from "@/utils/textstyles";

const workOfCurrentRound = "skull";

interface GameStartProps {
  time: number;
}

export default function GameStart({ time }: GameStartProps) {
  return (
    <div className={"w-full h-full bg-primary overflow-clip"}>
      <div className={"flex w-full h-full"}>
        <div className={"flex flex-col w-full h-full justify-evenly"}>
          <div className={"w-full flex flex-col text-center gap-11"}>
            <div className={twMerge(TextStyles.H1)}>Start</div>
            <div>
              <div className={twMerge(TextStyles.H2)}>Round 1</div>
              <div className={"text-2xl text-white"}>
                Draw a {workOfCurrentRound}
              </div>
            </div>
          </div>
          <ClientCountdown
            className={twMerge(
              Textstyles.H4,
              "flex w-full mx-auto justify-center",
            )}
            time={time}
            text={"The game starts in"}
          />
        </div>
      </div>
    </div>
  );
}
