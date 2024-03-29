"use client";
import NavLink from "./nav-link";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { HomeIcon, PlayIcon } from "@radix-ui/react-icons";

interface DynamicIslandProps {
  UserImageUrl: string;
  UserTag?: string;
}

export default function DynamicIsland(props: DynamicIslandProps) {
  return (
    <div
      className={
        "h-20 min-w-10 w-fit bg-surface absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
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
            <PlayIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center selection:border-1 border-primary min-w-[50px] w-1/3">
          <NavLink href={"/home"} lable={"Home"}>
            <HomeIcon />
          </NavLink>
        </li>
        <li className="mx-4 text-center selection:border-1 border-primary min-w-[50px] w-1/3">
          <NavLink
            href={props.UserImageUrl ? `/user/${props.UserTag}` : ""}
            lable={""}
          >
            {props.UserImageUrl && props.UserTag && (
              <SignedIn>
                <Image
                  className="rounded-full"
                  src={props.UserImageUrl}
                  width="48"
                  height="48"
                  alt="Profile"
                />
              </SignedIn>
            )}
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
