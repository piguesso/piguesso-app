import { db } from "@/db";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import DynamicIsland from "@/components/navigation/nav-bar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { WrappedCard } from "@/components/game/wrapped-card";

export default async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const results = await db.query.demo.findMany();

  // get results where guess is 337
  const correct = results.filter((res) => {
    return res.guess === res.term;
  });

  const others = results.filter((res) => {
    return res.guess !== res.term;
  });

  const nothing = results.filter((res) => {
    return res.guess === null;
  });

  return (
    <div className={"w-full h-full"}>
      <div className={twMerge(TextStyles.H2, "my-12 text-center w-full")}>Lets wrap this Up!</div>
      <div className={"w-full h-full flex flex-col xl:flex-row mx-auto items-center overflow-y-scroll pb-40"}>
        <div className={"h-full w-1/3 pb-40"}>
          <div className={twMerge(TextStyles.H4, "my-12 text-center w-full")}>Also beautiful...</div>
          <div className={"w-full flex flex-col gap-3 h-1/2 overflow-y-scroll"}>
            {others.map((result) => {
              if (result.imageUrl === null || result.username === null || result.termConfidence === null || result.guess === null || result.term === null) return;
              return (
                <WrappedCard imageUrl={result.imageUrl} username={result.username}
                             termconfidence={result.termConfidence}
                             term={result.term}
                             guess={result.guess} key={result.clerkId} />
              );
            })
            }
          </div>
        </div>
        <div className={"h-full w-1/3"}>
          <div className={twMerge(TextStyles.H4, "my-12 text-center w-full")}>Actual term</div>
          <div className={"w-full flex flex-col gap-3 h-1/2 overflow-y-scroll"}>
            {correct.map((result) => {
              if (result.imageUrl === null || result.username === null || result.termConfidence === null || result.guess === null || result.term === null) return;
              return (
                <WrappedCard imageUrl={result.imageUrl} username={result.username}
                             termconfidence={result.termConfidence}
                             term={result.term}
                             guess={result.guess} key={result.clerkId} />

              );
            })
            }
          </div>
        </div>
        <div className={"h-full w-1/3"}>
          <div className={twMerge(TextStyles.H4, "my-12 text-center w-full h-full pb-40 overflow-y-scroll")}>Nothing
            really...
          </div>
          <div className={"w-full flex flex-col gap-3 h-1/2 overflow-y-scroll"}>
            {nothing.map((result) => {
              if (result.imageUrl === null || result.username === null || result.termConfidence === null || result.guess === null || result.term === null) return;
              return (
                <WrappedCard imageUrl={result.imageUrl} username={result.username}
                             termconfidence={result.termConfidence}
                             term={result.term}
                             guess={result.guess} key={result.clerkId} />
              );
            })
            }
          </div>
        </div>
      </div>
      <DynamicIsland UserImageUrl={user.imageUrl ?? ""} UserTag={user.username ?? ""} />
    </div>
  );
}
