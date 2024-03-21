import textstyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import LandingPageLink from "@/components/draw-link";
import DynamicIsland from "@/components/navigation/nav-bar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import * as tf from "@tensorflow/tfjs";
import LandingCanvas from "@/components/game/landing-canvas";
import { Crosshair2Icon, PlayIcon } from "@radix-ui/react-icons";
export default async function Home() {
  const user = await currentUser();
  return (
    <main className="min-h-screen items-center gap-4 bg-white w-full h-full overflow-hidden">
      <LandingCanvas />
      <div
        className={twMerge(
          textstyles.H1,
          "flex flex-col items-center justify-center select-none mt-14",
        )}
      >
        <div className={"text-black"}>Welcome to</div>
        <div className={"mb-14 text-black"}>Piguesso</div>
        <div className={"flex flex-col gap-6 lg:w-1/4 md:w-1/3 sm:w-3/4 w-[90%]"}>
          <LandingPageLink text={"Play"} href={"/play"}>
            <PlayIcon className={"w-5 h-5"} />
          </LandingPageLink>
          <LandingPageLink text={"Training"} href={"/training"}>
            <Crosshair2Icon className={"w-5 h-5"} />
          </LandingPageLink>
        </div>
      </div>
      <DynamicIsland
        UserImageUrl={user?.imageUrl || ""}
        UserTag={user?.username ?? undefined}
      />
    </main>
  );
}
