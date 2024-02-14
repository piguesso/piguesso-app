import { db } from "@/db";
import { users } from "@/db/schema/user";
import { insertUser } from "@/services/users";
import { currentUser } from "@clerk/nextjs/server";
import { eq, or } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.username) {
    return redirect("/");
  }

  const fetchedUsers = await db
    .select()
    .from(users)
    .where(
      or(eq(users.clerkId, clerkUser.id), eq(users.tag, clerkUser.username)),
    )
    .execute();
  if (fetchedUsers[0]) {
    return redirect(`/user/${fetchedUsers[0].tag}`);
  }

  try {
    await insertUser({
      clerkId: clerkUser.id,
      tag: clerkUser.username,
    });
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <h1>You have joined piguesso.</h1>
      <Link href={`/user/${clerkUser.username}`}>Go to your profile</Link>
    </>
  );
}
