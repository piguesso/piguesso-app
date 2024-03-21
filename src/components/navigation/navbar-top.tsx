import { GitHubLogoIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@mui/material";
import Link from "next/link";

export default function NavbarTop() {
  return (
    <div className={"bg-transparent flex absolute top-3 right-3 z-20"}>
      <Link
        href={"https://www.github.com/piguesso/piguesso-app"}
        className={"flex m-3 cursor-pointer"}
      >
        <GitHubLogoIcon className={"w-5 h-5 text-black cursor-pointer hover:text-primary hover:scale-105"} />
      </Link>
      <Link
        href={"https://docs.piguesso.com"}
        className={"flex m-3 cursor-pointer"}
      >
        <HeartFilledIcon className={"w-5 h-5 text-black cursor-pointer hover:text-primary hover:scale-105"} />
      </Link>
    </div>
  )
}