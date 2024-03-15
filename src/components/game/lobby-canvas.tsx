"use client";

import { useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import ColorControls from "@/components/navigation/color-controls";
import { useWindowSize } from "@/hooks/useWindowSize";
import cv, { Mat } from "opencv-ts";
import { Navbar } from "@/components/navigation/nav-bar";

// TODO prio = 0
export default function LobbyCanvas() {
  let timeOfLastPoint = 0;
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const size = useWindowSize();

  const handleMouseUp = () => {
    setPoints([]);
  };

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
      let c = (points[i].x + points[i + 1].x) / 2,
        d = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
      ctx.quadraticCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      ),
        ctx.stroke();
    }
  }

  const handleSubmit = () => {
    console.log("OpenCV is ready");
    const src = cv.imread("inputCanvas");

    const dst: Mat = new cv.Mat(80, 80, cv.CV_8S, new cv.Scalar(255));
    console.log(dst.rows);
    cv.resize(src, dst, new cv.Size(80, 80), 0, 0, cv.INTER_AREA);
    console.log(dst);
    const numberDst: number[] = [];
    dst.data32S.forEach((x) => numberDst.push(x));
    const data = numberDst.map((x) => x === 0 ? 255 : 0);

    // reshape dst.data32S from 80 to 80x80x1
  };

  const handleClear = () => {
    clear();
  };

  return (
    <div className="w-full h-full justify-center items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={handleMouseUp}
        width={(size.height || 0) * 0.5}
        height={(size.height || 0) * 0.5}
        className={"bg-white shadow-2xl border-2 border-black rounded-md"}
        id={"inputCanvas"}
      />
    </div>
  );
}
