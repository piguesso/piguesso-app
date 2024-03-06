"use client";
import NavLink from "./nav-link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface DynamicIslandProps {
  UserImageUrl: string;
  UserTag?: string;
}

export default function DynamicIsland(props: DynamicIslandProps) {
  return (
    <div
      className={
        "h-20 min-w-10 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-none sm:rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
      }
    >
      <div className="max-w-fit h-full flex">
        <Navbar UserImageUrl={props.UserImageUrl} UserTag={props.UserTag} />
      </div>
    </div>
  );
}

interface NavbarProps {
  UserImageUrl: string;
  UserTag?: string;
}

export function Navbar(props: NavbarProps) {
  return (
    <div className="h-full">
      <ul className="flex w-full h-full justify-evenly items-center">
        <li className="mx-4 text-center selection:border-1 border-primary min-w-[50px] w-1/3">
          <NavLink href={"/play"} lable={"Play"}>
            <PlayArrowOutlinedIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center w-1/3 min-w-[50px]">
          <NavLink href={"/browse"} lable={"Browse"}>
            <SearchOutlinedIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center w-1/3 min-w-[50px] flex">
          <NavLink href={props.UserImageUrl ? `/user/${props.UserTag}` : ""} lable={"Profile"}>
            {props.UserImageUrl && props.UserTag &&
              <SignedIn>
                <Image
                  className="rounded-full"
                  src={props.UserImageUrl}
                  width="28"
                  height="28"
                  alt="Profile"
                />
              </SignedIn>
            }
            <SignedOut>
              <SignInButton afterSignUpUrl="/join">
                <LoginOutlinedIcon className="mx-auto" />
              </SignInButton>
            </SignedOut>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
