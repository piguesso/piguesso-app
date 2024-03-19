import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import TextStyles from "@/utils/textstyles";
import { Rating } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { submit } from "@/app/join/form-actions";
import UserJoinForm from "@/app/join/user-join-form";

export default async function Page() {
  const User = await currentUser();

  if (!User || !User.username) {
    redirect("/");
  }

  let userExists = await db.query.users.findFirst({
    where: eq(users.clerkId, User.id),
  });

  if (!userExists) {
    redirectToSignIn();
  } else {
    redirect("/");
  }

  return (
    <main className={"w-full h-full bg-background"}>
      <div
        className={twMerge(
          "h-full w-full overflow-y-scroll bg-background p-5 flex flex-col gap-3",
        )}
      >
        <div className="flex flex-row gap-4 bg-primary rounded-md p-4">
          <div>
            <Image
              className="rounded-full"
              src={User.imageUrl}
              width="72"
              height="72"
              alt="Profile"
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <div>
              <div className={TextStyles.H4}>{User.username}</div>
            </div>
            <div className="flex flex-col rounded-md bg-surface p-2">
              <Rating
                name="perfromance-rating"
                defaultValue={0}
                max={5}
                precision={0.5}
                emptyIcon={<StarBorderOutlinedIcon className="text-white" />}
                readOnly
              />
              <p className="text-sm">
                Based on
                <span className="font-semibold"> {0} </span>
                {"games"}
              </p>
            </div>
          </div>
        </div>
        <div className={"flex flex-row gap-4 rounded-md p-4"}>
          <UserJoinForm submit={submit} afterSubmitUrl={"/"} />
        </div>
      </div>
    </main>
  );
}
