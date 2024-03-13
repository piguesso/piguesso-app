import TextStyles from "@/utils/textstyles";
import { Card } from "@mui/material";
import { twMerge } from "tailwind-merge";
import ShareIcon from "@mui/icons-material/Share";

export type GameCardProps = {
  id: number;
  status: string;
};

export default function GameCard({ id, status }: GameCardProps) {
  const getStatus = () => {
    if (status === "in-progress") {
      return (
        <p className="text-primary">
          <b>In Progress</b>
        </p>
      );
    } else if (status === "completed") {
      return (
        <p className="text-success">
          <b>Completed</b>
        </p>
      );
    } else {
      return (
        <p className="text-destructive">
          <b>Waiting for players</b>
        </p>
      );
    }
  };

  const HandleShareButton = () => {
    console.log("Share Button was pressed");
  };

  // TODO Change first div from div to Card

  return (
    <div>
      <div className="flex flex-row gap-4 items-center justify-between bg-surface p-2 m-2 border rounded-xl border-border">
        <div className="flex flex-row gap-x-3">
          <div className="flex justify-center items-center rounded-full w-[48px] h-[48px] bg-primary overflow-hidden">
            <p className={twMerge(TextStyles.Text, "font-bold")}>#{id}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <h2 className="text-white text-lg font-bold">Game #{id}</h2>
            {getStatus()}
          </div>
        </div>
        <div className="flex w-[48px] h-[48px] items-center justify-center bg-primary rounded-full">
          <button title="shareGame" onClick={HandleShareButton}>
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
