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

export function PlayLink() {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:transition-all ease-in-out",
        textstyles.BigHint,
      )}
    >
      <Link href="/play">
        <Button
          variant="contained"
          className={"bg-primary rounded-xl h-40 w-40 flex flex-col"}
        >
          <PlayIcon className={"w-5 h-5"} />
          <span className={textstyles.H7}>Play</span>
        </Button>
      </Link>
    </div>
  );
}

export function AboutLink() {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:transition-all ease-in-out",
        textstyles.BigHint,
      )}
    >
      <Link href="/about">
        <Button
          variant="contained"
          className={"bg-primary rounded-xl h-40 w-40 flex flex-col"}
        >
          <HeartFilledIcon className={"w-5 h-5"} />
          About
        </Button>
      </Link>
    </div>
  );
}

export function GithubLink() {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:transition-all ease-in-out",
        textstyles.BigHint,
      )}
    >
      <Link href="https://www.github.com/piguesso/piguesso-app">
        <Button
          variant="contained"
          className={"bg-primary rounded-xl h-40 w-40 flex flex-col"}
        >
          <GitHubLogoIcon className={"w-5 h-5"} />
          Github
        </Button>
      </Link>
    </div>
  );
}

export function TrainingLink() {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:transition-all ease-in-out",
        textstyles.BigHint,
      )}
    >
      <Link href="/training">
        <Button
          variant="contained"
          className={"bg-primary rounded-xl h-40 w-40 flex flex-col"}
        >
          <Crosshair2Icon className={"w-5 h-5"} />
          Training
        </Button>
      </Link>
    </div>
  );
}
