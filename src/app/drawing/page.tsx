"use client";

import { FC, SetStateAction, useState } from "react";
import { useDraw } from "../../../hooks/useDraw";
import { ChromePicker } from "react-color";
import Skribble from "@/types/skribble";

interface pageProps {}

const skribble = new Skribble();

const Page: FC<pageProps> = ({}) => {
  let timeOfLastPoint = 0;

  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }
    const { x: currX, y: currY } = currentPoint;
    const newTime = Date.now();
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    skribble.update(currX, currY, newTime);
    timeOfLastPoint = newTime;
  }

  const handleClear = () => {
    skribble.clear();
    clear();
  };

  return (
    <div className="w-full h-full bg-white flex justify-center items-center overflow-clip">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker
          color={color}
          onChange={(e: { hex: SetStateAction<string> }) => setColor(e.hex)}
        />
        <button
          type="button"
          className="p-2 rounded-md border border-black text-black"
          onClick={handleClear}
        >
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
};

export default Page;
