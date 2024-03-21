"use client";

import Link from "next/link";
import textstyles from "@/utils/textstyles";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";
import {
  Crosshair2Icon,
  GitHubLogoIcon,
  HeartFilledIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { GithubIcon } from "lucide-react";
import { ReactNode } from "react";

interface LandingPageLinkProps {
  children: ReactNode,
  text: string,
  href: string
}

export default function LandingPageLink({text, children, href} : LandingPageLinkProps) {
  return (
    <Link href={href}>
        <Button
          variant="contained"
          className={"bg-primary rounded-xl w-full h-40 flex flex-col"}
        >
          {children}
          <span className={textstyles.H7}>{text}</span>
        </Button>
      </Link>
  );
}
