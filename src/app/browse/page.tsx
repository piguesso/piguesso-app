"use client";
import FriendCard from "@/components/friend-system/friend-card";
import SearchBar from "@/components/navigation/search-bar";
import GameCard from "@/components/profile/game-card";
// import SearchBar from "@/components/navigation/search-bar";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";

interface Player {
  id: number;
  name: string;
}

interface PageProps {
  players: Player[];
}

export default function Page() {
  let friends: number = 4;

  return (
    <div className="bg-background pt-16 h-full pl-3 pr-3 flex flex-col gap-y-10">
      <SearchBar />
      <div className="">
        <p className={twMerge(TextStyles.Text, "text-white")}>People</p>
        <div className="flex flex-col gap-y-1">
          <FriendCard Friends={false} UserName="Example Name" Status={false} />
          <FriendCard Friends={false} UserName="Example Name1" Status={true} />
          <FriendCard Friends={false} UserName="Example Name2" Status={true} />
          <FriendCard Friends={false} UserName="Example Name3" Status={true} />
        </div>
      </div>
      <div>
        <p className={twMerge(TextStyles.Text, "text-white")}>Games</p>
        <div className="flex flex-col gap-y-1">
          <GameCard id={1} status="completed" />
          <GameCard id={2} status="completed" />
          <GameCard id={3} status="completed" />
        </div>
      </div>
    </div>
  );
}
