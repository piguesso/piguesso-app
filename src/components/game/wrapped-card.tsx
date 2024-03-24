import { getCategoryFromNumber } from "@/utils/categories";
import TextStyles from "@/utils/textstyles";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export interface WrappedCardProps {
    imageUrl: string;
    username: string;
    termconfidence: number;
    guess: number;
    term: number;
  }
  
export const WrappedCard = ({ imageUrl, username, termconfidence, guess, term }: WrappedCardProps) => {
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