import DynamicIsland from "@/components/navigation/nav-bar";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { Button, Input } from "@mui/material";
import { db } from "@/db";
import { games } from "@/db/schema/game";
import { eq } from "drizzle-orm";
import { CreateGame, JoinGame } from "@/app/play/join-create-games";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className={"w-full h-full py-10 overflow-hidden"}>
      <div className={"flex flex-col w-[90%] gap-10 mx-auto"}>
        <h1 className={twMerge(TextStyles.H2, "text-center")}>Create or Join a Game</h1>
        <div className={"flex flex-col gap-8 items-center"}>
          <CreateGame clerkId={user.id} />
          <JoinGame />
        </div>
      </div>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined} />
    </div>
  );
}


