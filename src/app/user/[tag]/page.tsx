import { db } from "@/db";
import { users } from "@/db/schema/user";
import { clerkClient } from "@clerk/nextjs/server";
import { Rating } from "@mui/material";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { playerScoring } from "@/db/schema/scoring";
import ProfileNavigation from "./profileNavigation";
import StatisticsTab from "./tabs/statistics";
import GamesTab from "./tabs/games";
import FriendsTab from "./tabs/friends";
import { currentUser } from "@clerk/nextjs";

interface UserProfileProps {
  params: { tag: string };
}

export default async function Page({ params }: UserProfileProps) {
  const user = await db.query.users.findFirst({
    where: eq(users.tag, params.tag)
  });

  if (!user) {
    console.log("no user");
    redirect("/");
  }

  const clerkUser = await currentUser();

  if (!clerkUser || (clerkUser.id !== user.clerkId)) {
    console.log("no clerk user");
    redirect("/");
  }

  const scoring = await db.query.playerScoring.findFirst({
    where: eq(playerScoring.playerId, user.clerkId)
  });

  if (!scoring) {
    redirect("/");
  }

  const rating =
    scoring.gamesWon && scoring.gamesPlayed
      ? (scoring.gamesWon / scoring.gamesPlayed) * 5
      : 0;

  return (
    <div className="flex flex-col w-11/12 mx-auto gap-4 mt-2">
      <div className="flex flex-row gap-4 bg-primary rounded-md p-4">
        <div>
          <Image
            className="rounded-full"
            src={clerkUser.imageUrl}
            width="48"
            height="48"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold">{user.tag}</h1>
            <p className="text-white/80">{user.biography}</p>
          </div>
          <div className="flex flex-col rounded-md bg-surface p-2">
            <Rating
              name="perfromance-rating"
              defaultValue={rating}
              max={5}
              precision={0.5}
              emptyIcon={<StarBorderOutlinedIcon className="text-white" />}
              readOnly
            />
            <p className="text-sm">
              Based on
              <span className="font-semibold"> {scoring.gamesPlayed} </span>
              {scoring.gamesPlayed === 1 ? "game" : "games"}
            </p>
          </div>
        </div>
      </div>
      <ProfileNavigation
        statsTab={<StatisticsTab userId={user.clerkId} />}
        gamesTab={<GamesTab playerId={user.clerkId} />}
        friendsTab={<FriendsTab />}
      />
    </div>
  );
}
