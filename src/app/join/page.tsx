import { currentUser, UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";

export default async function Page() {
  const User = await currentUser();

  if (!User) {
    redirect("/");
  }

  let userExists = await db.query.users.findFirst({
    where: eq(users.clerkId, User.id),
  });

  if (!userExists) {
    await db
      .insert(users)
      .values({
        clerkId: User.id,
        biography: "I am a new",
      })
      .onConflictDoNothing();
  }

  return (
    <main className={"w-full h-full"}>
      <div className={twMerge("w-2/3 mx-auto", TextStyles.H4)}>Welcome</div>
      <div className="w-2/3 h-full bg-white mx-auto drop-shadow-2xl shadow-inner-2xl mb-10 mt-5 rounded-3xl">
        <UserDetail
          userDetail={User.unsafeMetadata.customBio}
          label={"Biography"}
        />
        <UserDetail userDetail={User.username} label={"Username"} />
      </div>
    </main>
  );
}

interface UserDetailProps {
  userDetail: any;
  label: string;
}
const UserDetail = ({ userDetail, label }: UserDetailProps) => {
  return (
    <div className="flex">
      <div className="text-center text-black">{label}</div>
      <div className="text-center text-black">{userDetail}</div>
    </div>
  );
};
