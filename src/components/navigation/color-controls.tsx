"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ColorControlsProps {
  setColor: (color: string) => void;
  erease: () => void; //TODO Welcher Typ muss das sein: 
  clear: () => void;
}

const colors = ["secondary", "black", "primary"];

export default function ColorControls({ setColor, clear, erease }: ColorControlsProps) {
  const pathname = usePathname();
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedTool, setSelectedTool] = useState("pen");

  if (!pathname.includes("/draw")) {
    return null;
  }

  setColor(
    selectedColor === "black"
      ? "#000"
      : selectedColor == "primary"
        ? "#AE6DF5"
        : "#00C896",
  );

  return (
    <div className="h-full flex">
      <div className="flex flex-row w-full h-full justify-evenly items-center">
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
        <div
          className={twMerge(
            "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-full flex items-center justify-center cursor-pointer",
            selectedTool === "eraser" && "rounded-md",
          )}
          onClick={erease}
        >
          <i className="fa-solid fa-eraser"></i>
        </div>
        {colors.map((color) => (
          <div
            key={color}
            className={twMerge(
              "w-8 h-8 mx-2 bg-primary bg-secondary bg-black",
              `bg-${color}`,
              selectedColor === color ? "rounded-md" : "rounded-full",
              "cursor-pointer",
              "animate-circle-to-rounded",
            )}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div className="h-[80%] w-[1px] bg-gray-300 my-auto mx-2" />
    </div>
  );
}
