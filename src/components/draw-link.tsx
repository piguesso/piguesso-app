"use client";

import Link from "next/link";
import textstyles from "@/utils/textstyles";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

export function PlayLink() {
  return (
    <div className={twMerge("flex flex-col items-center", textstyles.BigHint)}>
      <Link href="/play">
        <Button variant="contained" className={"bg-primary rounded-3xl h-14 w-32"}>
          Play
        </Button>
      </Link>
    </div>
  );
}

export function AboutLink() {
  return (
    <div className={twMerge("flex flex-col items-center", textstyles.BigHint)}>
      <Link href="/about">
        <Button variant="contained" className={"bg-primary rounded-3xl h-14 w-32"}>
          About
        </Button>
      </Link>
    </div>
  );
}

export function GithubLink() {
  return (
    <div className={twMerge("flex flex-col items-center", textstyles.BigHint)}>
      <Link href="https://www.github.com/piguesso">
        <Button variant="contained" className={"bg-primary rounded-3xl h-14 w-32"}>
          Github
        </Button>
      </Link>
    </div>
  );
}

export function TrainingLink() {
  return (
    <div className={twMerge("flex flex-col items-center", textstyles.BigHint)}>
      <Link href="/training">
        <Button variant="contained" className={"bg-primary rounded-3xl h-14 w-32"}>
          Training
        </Button>
      </Link>
    </div>
  );
}
