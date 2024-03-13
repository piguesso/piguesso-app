"use client";
import FriendCard from "@/components/friend-system/friend-card";
import DynamicIsland from "@/components/navigation/nav-bar";
import SearchBar from "@/components/navigation/search-bar";
import GameCard from "@/components/profile/game-card";
// import SearchBar from "@/components/navigation/search-bar";
import TextStyles from "@/utils/textstyles";
import SearchIcon from "@mui/icons-material/Search";
import { twMerge } from "tailwind-merge";

export default function Page() {
  return (
    <div className="w-full h-full bg-black py-5 gap-y-5">
      <div className="m-2 ">
        <div className="border border-background rounded-3xl p-2 justify-between items-center mt-2 mx-2 my-2 bg-background">
          <SearchBar />
        </div>
        <div className="">
          <p className={twMerge(TextStyles.H3, "")}>People</p>
          <FriendCard UserName="Lukas Piguesso" Status={true} Friends={false} />
        </div>
        <div className="">
          <h2 className={twMerge(TextStyles.H3, "")}>Games</h2>
          <GameCard id={1} status="completed" />
        </div>
        <DynamicIsland />
      </div>
    </div>
  );
}
