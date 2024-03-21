"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { twMerge } from "tailwind-merge";
import { Button } from "@mui/material";
import TextStyles from "@/utils/textstyles";
import { Timer } from "@/app/demo/demoCanvas";

interface DemoSheet {
  word: string;
  open: boolean;
  setOpen: (b: boolean) => void;
  setTimer: (t: Timer) => void;
  setSeconds: (s: number) => void;
}

export default function DemoSheet({word, open, setOpen, setTimer, setSeconds} : DemoSheet) {
  return (
    <Sheet open={open}>
      <SheetContent side={"bottom"} className="w-screen h-screen bg-primary">
        <div className={"w-full h-full bg-primary"}>
          <SheetHeader
            className={
              "bg-primary h-full text-center flex flex-col items-center justify-center gap-6"
            }
          >
            <div className={"flex flex-col gap-3"}>
              <SheetTitle className={twMerge(TextStyles.H6)}>Draw</SheetTitle>
              <SheetTitle className={twMerge(TextStyles.H3)}>{word}</SheetTitle>
              <SheetTitle className={twMerge(TextStyles.H6)}>
                In 15 Seconds.
              </SheetTitle>
            </div>
            <SheetClose>
              <Button
                variant={"contained"}
                className={"rounded-full bg-black py-3 px-8 mx-auto"}
                onClick={() => {
                  setOpen(false)
                  setTimer(new Timer(15, setSeconds))
                }}
              >
                Got it!
              </Button>
            </SheetClose>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  )
}