"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { twMerge } from "tailwind-merge";
import { Button } from "@mui/material";
import TextStyles from "@/utils/textstyles";

interface EndSheetProps {
  open: boolean;
  word: string
  submit: () => void;
}

export default function EndSheet({ open, word, submit }: EndSheetProps) {
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
              <SheetTitle className={twMerge(TextStyles.H6)}>Thank you for playing.</SheetTitle>
              <SheetTitle className={twMerge(TextStyles.H6)}>
                Lets see how well you drew
              </SheetTitle>
              <SheetTitle className={twMerge(TextStyles.H3)}>{word}</SheetTitle>
            </div>
            <SheetClose>
              <Button
                variant={"contained"}
                className={"rounded-full bg-black py-3 px-8 mx-auto"}
                onClick={submit}
              >
                Got it!
              </Button>
            </SheetClose>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
}