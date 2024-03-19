"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import WordSheet from "@/components/training/word-sheet";

interface ColorControlsProps {
  setColor: (color: string) => void;
  clear: () => void;
  generateNewWord: () => void;
  currentWord: string;
}

const colors = ["warning", "black", "primary"];

export default function ColorControls({
  setColor,
  clear,
  generateNewWord,
  currentWord,
}: ColorControlsProps) {
  const pathname = usePathname();
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedTool, setSelectedTool] = useState("pen");

  if (
    !pathname.includes("/train") &&
    !pathname.includes("/play") &&
    !pathname.includes("/demo")
  ) {
    return null;
  }

  setColor(
    selectedColor === "black"
      ? "#000"
      : selectedColor == "primary"
        ? "#AE6DF5"
        : "#EE814E",
  );

  return (
    <div className="h-full flex">
      <div className="flex flex-row w-full h-full justify-evenly items-center">
        {generateNewWord && (
          <WordSheet
            word={currentWord}
            description={"Draw this at your own pace. Its only training"}
          >
            <div
              className={twMerge(
                "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-full flex items-center justify-center cursor-pointer",
                selectedTool === "forward" && "rounded-md",
              )}
              onMouseDown={() => setSelectedTool("forward")}
              onMouseUp={() => setSelectedTool("pen")}
              onClick={() => {
                generateNewWord();
                clear();
              }}
            >
              <i className="fa-solid fa-forward"></i>
            </div>
          </WordSheet>
        )}
        <div
          className={twMerge(
            "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-full flex items-center justify-center cursor-pointer",
            selectedTool === "trash" && "rounded-md",
          )}
          onMouseDown={() => setSelectedTool("trash")}
          onMouseUp={() => setSelectedTool("pen")}
          onClick={clear}
        >
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div
          className={twMerge(
            "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-full flex items-center justify-center cursor-pointer",
            selectedTool === "pen" && "rounded-md",
          )}
          onClick={() => setSelectedTool("pen")}
        >
          <i className="fa-solid fa-pen"></i>
        </div>
        <div className={"hidden sm:flex"}>
          {colors.map((color) => (
            <div
              key={color}
              className={twMerge(
                "w-8 h-8 mx-2 bg-primary bg-warning bg-black",
                `bg-${color}`,
                selectedColor === color ? "rounded-md" : "rounded-full",
                "cursor-pointer",
                "animate-circle-to-rounded",
              )}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div
          className={twMerge(
            "block sm:hidden w-8 h-8 mx-2 bg-black",
            `bg-black`,
            selectedColor === "black" ? "rounded-md" : "rounded-full",
            "cursor-pointer",
            "animate-circle-to-rounded",
          )}
          onClick={() => setSelectedColor("black")}
        />
      </div>
      <div className="h-[80%] w-[1px] bg-gray-500 my-auto mx-2" />
    </div>
  );
}
