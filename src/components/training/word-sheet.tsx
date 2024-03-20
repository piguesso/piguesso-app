import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";

interface WordSheetProps {
  word: string;
  description: string;
  children: React.ReactNode;
}

export default function WordSheet({
  word,
  description,
  children,
}: WordSheetProps) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
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
                At you own pace.
              </SheetTitle>
            </div>
            <SheetClose>
              <Button
                variant={"contained"}
                className={"rounded-full bg-black py-3 px-8 mx-auto"}
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
