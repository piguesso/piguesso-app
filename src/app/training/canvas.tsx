"use client";

import { useEffect, useRef, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import Skribble from "@/utils/skribble";
import { Navbar } from "@/components/navigation/nav-bar";
import ColorControls from "@/components/navigation/color-controls";
import { useWindowSize } from "@/hooks/useWindowSize";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/backend";
import { redirect } from "next/navigation";
import { Button } from "@mui/material";

interface CanvasProps {
  UserId: string;
  UserImageUrl: string;

}

const skribble = new Skribble();

export default function Canvas({UserId, UserImageUrl}: CanvasProps) {
  let timeOfLastPoint = 0;
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const size = useWindowSize();

  const handleMouseUp = () => {
    setPoints([])
    skribble.setStroke(skribble.getStroke()+1)
  }

  function drawLine({ prevPoint, currentPoint, ctx }: DrawProps) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }

    const { x: currX, y: currY } = currentPoint;
    const newTime = Date.now();
    const lineColor = color;
    const lineWidth = 7;

    let startPoint = prevPoint ?? currentPoint;

    setPoints([...points, currentPoint]);

    if (points.length < 5) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
    // draw a bunch of quadratics, using the average of two points as the control point
    let i;
    for (i = 1; i < points.length - 2; i++) {
      var c = (points[i].x + points[i + 1].x) / 2,
        d = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
      ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y,
      ),
        ctx.stroke();
    }

    const currXInt = Math.trunc( currX );
    const currYInt = Math.trunc( currY );
    skribble.update(currXInt, currYInt);
  }

  const submit = () => {
    if (skribble.isValid()) {
      skribble.normalize();
      skribble.uniform_scale();
      skribble.print();
      skribble.resampleOnePixelSpacing();
      const path = skribble.simplify(2.0);
      console.log(path);
    }
  }

  const handleClear = () => {
    skribble.clear();
    clear();
  };

  return (
    <div className="w-full h-full bg-white flex justify-center items-center overflow-clip" >
      <div className="flex flex-col gap-10 pr-10"></div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={handleMouseUp}
        width={(size.width || 0) * 0.8}
        height={(size.height || 0) * 0.8}
        className="border border-black rounded-md"
      />
      <Button onClick={submit}>
        Submit
      </Button>
      <div
        className={
          "w-full h-20 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-none sm:rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
        }
      >
        <div className="max-w-fit h-full flex">
          <ColorControls setColor={setColor} clear={handleClear} />
          <Navbar UserImageUrl={UserImageUrl}/>
        </div>
      </div>
    </div>
  );
}
