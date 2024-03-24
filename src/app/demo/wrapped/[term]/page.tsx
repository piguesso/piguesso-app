import { WrappedCard } from "@/components/game/wrapped-card";
import DynamicIsland from "@/components/navigation/nav-bar";
import { db } from "@/db";
import { demo } from "@/db/schema/demo";
import { getCategoryFromNumber } from "@/utils/categories";
import TextStyles from "@/utils/textstyles";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export interface WrappedTermPageProps {
    params: {
        term: string;
    }
}

export default async function Page({ params }: WrappedTermPageProps) {
    const user = await currentUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const termNumber = parseInt(params.term);

    if (isNaN(termNumber)) {
        return redirect("/demo/wrapped");
    }

    if (getCategoryFromNumber(termNumber) === null) {
        return redirect("/demo/wrapped");
    }

    const results = await db.select().from(demo).where(eq(demo.term, termNumber)).execute();

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
              <div className={twMerge(TextStyles.H4, "my-12 text-center w-full")}>Actual { getCategoryFromNumber(termNumber) ?? "unknown term" }</div>
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