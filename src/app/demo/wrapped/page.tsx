import { db } from "@/db";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import DynamicIsland from "@/components/navigation/nav-bar";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCategoryFromNumber } from "@/utils/categories";
import Image from "next/image";

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


interface wrappedCardProps {
  imageUrl: string;
  username: string;
  termconfidence: number;
  guess: number;
  term: number;
}

const WrappedCard = ({ imageUrl, username, termconfidence, guess, term }: wrappedCardProps) => {
  return (
    <div className={"w-3/4 mx-auto h-20 bg-surface border-2 border-white rounded-3xl"}>
      <div className={"flex flex-row justify-between w-full h-20 items-center gap-6 px-6"}>
        <Image
          src={imageUrl}
          height={50}
          width={50}
          alt={""}
          className={"rounded-full"}
        />
        <div className={"flex flex-col"}>
          <div className={twMerge(TextStyles.RobotoBigText, "w-full")}>{username}</div>
          <div className={twMerge(TextStyles.H7, "w-full")}>{getCategoryFromNumber(guess)}</div>
        </div>
        <div className={twMerge(TextStyles.BigText, "text-warning text-center w-full flex flex-row gap-2")}>
          <span>
            {(termconfidence * 100).toPrecision(2)}%
          </span>
          <span>
            { getCategoryFromNumber(term) ?? "unknown" }
          </span>
        </div>
      </div>
    </div>
  );
};