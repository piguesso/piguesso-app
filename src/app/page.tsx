import textstyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { PlayLink, AboutLink, GithubLink, TrainingLink } from "@/components/draw-link";
import DynamicIsland from "@/components/navigation/nav-bar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import * as tf from '@tensorflow/tfjs';
import LandingCanvas from "@/components/game/landing-canvas";
export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main
      className="min-h-screen items-center gap-4 bg-white w-full h-full overflow-hidden">
      <LandingCanvas />
      <div className={twMerge(textstyles.H1, "flex flex-col items-center justify-center select-none mt-14")}>
        <div className={"text-black"}>
          Welcome to
        </div>
        <div className={"mb-14 text-black"}>
          Piguesso
        </div>
        <div className={"md:flex-row gap-6 grid grid-cols-2"}>
          <PlayLink />
          <AboutLink />
          <GithubLink />
          <TrainingLink />
        </div>
      </div>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined} />
    </main>
  );
}