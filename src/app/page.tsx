import textstyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import DrawLink, { AboutLink, GithubLink } from "@/components/draw-link";
import DynamicIsland from "@/components/navigation/nav-bar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main
      // className="flex min-h-screen flex-col items-center gap-8 bg-gray w-full h-full bg-gradient-to-r from-primary to-warning background-animate">
      className="flex min-h-screen flex-col items-center gap-8 bg-gray w-full h-full">
      <div className={twMerge(textstyles.H1, "h-full flex flex-col items-center justify-center")}>
        <div>
          Welcome to
        </div>
        <div className={"mb-20"}>
          Piguesso
        </div>
        <div className={"flex flex-col md:flex-row gap-6"}>
          <DrawLink />
          <AboutLink />
          <GithubLink />
        </div>
      </div>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined} />
    </main>
  );
}
