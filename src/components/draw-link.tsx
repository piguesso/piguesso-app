"use client";

import Link from "next/link";
import textstyles from "@/utils/textstyles";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

export default function DrawLink() {
  return (
    <div className={twMerge("flex flex-col items-center", textstyles.BigHint)}>
      <Link href="/drawing">
        <Button variant="contained" color="primary" size="large">
          Draw
        </Button>
      </Link>
    </div>
  );
}
