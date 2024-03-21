import { currentUser, SignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { demo } from "@/db/schema/demo";
import DynamicIsland from "@/components/navigation/nav-bar";
import { eq } from "drizzle-orm";
import { games } from "@/db/schema/game";
import { redirect } from "next/navigation";
import DemoCanvas from "@/app/demo/demoCanvas";
import { submitDemo } from "@/app/demo/actions";
import { categories, getCategoryFromNumber } from "@/utils/categories";
import DemoSheet from "@/app/demo/demo-sheet";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  await db
    .insert(demo)
    .values({
      clerkId: user.id,
      username: user.username ?? "no username",
      imageUrl: user.imageUrl,
      host: false,
      term: categories.yoga,
    })
    .onConflictDoNothing();

  const game = await db.query.games.findFirst({
    where: eq(games.id, 42069),
  });
  if (!game) return redirect("/");

  return (
    <div className={"w-full h-full bg-background overflow-hidden"}>
      <DemoCanvas
        UserImageUrl={user.imageUrl}
        UserTag={user.username ?? ""}
        UserClerkId={user.id}
        submit={submitDemo}
        term={categories.yoga}
      />
    </div>
  );
}
