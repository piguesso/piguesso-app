import DynamicIsland from "@/components/navigation/nav-bar";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { Button } from "@mui/material";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className={"w-full h-full py-10 overflow-hidden"}>
      <div className={"flex flex-col w-[90%] gap-6 mx-auto"}>
        <h1 className={twMerge(TextStyles.H2, "text-center")}>Create or Join a Game</h1>
        <div className={"flex flex-col gap-4 items-center"}>
          <CreateGame clerkId={user.id} />
          <JoinGame />
        </div>
      </div>
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined} />
    </div>
  );
}


interface createGameProps {
  clerkId: string;
}

function CreateGame({ clerkId }: createGameProps) {
  return (
    <div className={"w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"}>
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Create Game</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>Create a game with your parameters and invite
        friends
      </div>
      <Button variant={"contained"}>
        Create Game
      </Button>
    </div>
  );
}

function JoinGame() {
  return (
    <div className={"w-[80%] bg-primary rounded-2xl p-8 flex flex-col gap-4"}>
      <h2 className={twMerge(TextStyles.H3, "text-center")}>Quick Play</h2>
      <div className={twMerge(TextStyles.BigText, "text-center")}>Join a Game with the Game Code.</div>
      <Button>
        Create Game
      </Button>
    </div>
  );
}
