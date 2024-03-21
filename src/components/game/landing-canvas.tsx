"use client";

import { useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { useWindowSize } from "@/hooks/useWindowSize";

// TODO prio = 0

export default function LandingCanvas() {
  let timeOfLastPoint = 0;
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  let colors = [
                          "#EE814E",
                          "#60A5FA",
                          "#AE6DF5",
                          "#151515",
                          "#17A34A",
                          "#DB2877"
                        ];

  const size = useWindowSize();

  function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215.
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    const numString = randomNumber.toString(16);
    let randColor = numString.padStart(6);
    return `#${randColor.toUpperCase()}`;
  }

  const handleMouseUp = () => {
    setPoints([]);
  };

  function drawLine({ prevPoint, currentPoint, ctx }: DrawProps) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }

    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 7;

    setPoints([...points, currentPoint]);

    if (points.length < 5) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    for (let i = 1; i < points.length - 1; i++) {
      ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      );
      ctx.stroke();
    }
    setPoints([points[points.length - 1]]);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={handleMouseUp}
        width={size.width || 0}
        height={size.height || 0}
        className={"absolute bg-transparent"}
        id={"inputCanvas"}
      />
      <div className={"hidden md:block"}>
        <div
          className={"w-40 h-40 rounded-full absolute bg-warning top-[10%] 2xl:left-[20%] xl:left-[10%] lg:left-[5%] left-0"} onClick={clear} onMouseOver={() => setColor(colors[0])}></div>
        <div
          className={"w-40 h-40 rounded-full absolute bg-pink-600 bottom-[70%] 2xl:right-[20%] xl:right-[10%] lg:right-[5%] right-0"} onClick={clear} onMouseOver={() => setColor(colors[5])}></div>
        <div className={"w-52 h-52 rounded-full absolute bg-primary top-[80%] left-[23%]"} onClick={clear} onMouseOver={() => setColor(colors[2])}></div>
        <div className={"w-52 h-52 rounded-full absolute bg-green-600 top-[55%] right-[20%]"} onClick={clear} onMouseOver={() => setColor(colors[4])}></div>
        <div className={"w-32 h-32 rounded-full absolute bg-blue-400 bottom-1/3 left-[20%]"} onClick={clear} onMouseOver={() => setColor(colors[1])}></div>
        <div className={"w-32 h-32 rounded-full absolute bg-black bottom-[10%] left-1/2"} onClick={clear} onMouseOver={() => setColor(colors[3])}></div>
      </div>
    </>
  );
}
