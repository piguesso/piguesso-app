"use client";

import { useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import Skribble from "@/utils/skribble";
import { Navbar } from "@/components/navigation/nav-bar";
import ColorControls from "@/components/navigation/color-controls";
import { useWindowSize } from "@/hooks/useWindowSize";
import cv, { Mat } from "opencv-ts";
import { reshape } from "mathjs";
import { twMerge } from "tailwind-merge";
import TextStyles from "@/utils/textstyles";

interface CanvasProps {
  UserTag: string;
  UserImageUrl: string;
  UserClerkId: string;
  gameSlug: string;
  submit: (drawing: number[][][], clerkId: string) => void;
}

const skribble = new Skribble();

export default function GameCanvas({ UserTag, UserImageUrl, UserClerkId, submit }: CanvasProps) {
  useEffect(() => {
    //get Word and game info from API
  }, []);


  const [currentWord, setCurrentWord] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const size = useWindowSize();

  const handleMouseUp = () => {
    skribble.fillStroke(points);
    setPoints([]);
    skribble.setStroke(skribble.getStroke() + 1);
  };

  function drawLine({ prevPoint, currentPoint, ctx }: DrawProps) {
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

    const currXInt = Math.trunc(currX);
    const currYInt = Math.trunc(currY);
    skribble.update(currXInt, currYInt);
  }

  const handleSubmit = () => {
    const src = cv.imread("inputGameCanvas");
    const dst: Mat = new cv.Mat(80, 80, cv.CV_8S, new cv.Scalar(255));
    console.log(dst.rows);
    cv.resize(src, dst, new cv.Size(80, 80), 0, 0, cv.INTER_AREA);
    console.log(dst);
    const numberDst: number[] = [];
    dst.data32S.forEach((x) => numberDst.push(x));
    const data = numberDst.map((x) => x === 0 ? 255 : 0);

    // reshape dst.data32S from 80 to 80x80x1
    const dataReshaped: any = reshape(data as unknown as number[], [80, 80, 1]);
    if (skribble.isValid()) {
      submit(dataReshaped, UserClerkId);
    }
  };

  const handleClear = () => {
    skribble.clear();
    clear();
  };

  const mobile = size.width && size.width < 640;

  const [controls, setControls] = useState<boolean>(true);
  const switchControls = () => {
    setControls(!controls);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-primary">
      <div className={twMerge(TextStyles.H4, "pb-10")}>
        Draw: {currentWord} As Fast As You Can
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={handleMouseUp}
        width={mobile ? size.width : (size.width || 0) * 0.8}
        height={(size.height || 0) * 0.8}
        className={"bg-white shadow-2xl border-2 border-black rounded-md"}
        id={"inputGameCanvas"}
      />
      <div
        className={
          "w-full h-20 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
        }
      >
        <div className="max-w-fit h-full flex items-center">
          <div
            className={twMerge(
              "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-md flex items-center justify-center cursor-pointer"
            )}
            onClick={switchControls}
          >
            <i className="fa-solid fa-repeat"></i>
          </div>
          <div className="h-[80%] w-[1px] bg-gray-300 my-auto mx-2" />
          {controls ?
            <ColorControls setColor={setColor} clear={handleClear} />
            :
            <>
              <Navbar UserImageUrl={UserImageUrl} UserTag={UserTag} />
              <div className="h-[80%] w-[1px] bg-gray-300 my-auto mx-2" />
            </>
          }
          <div
            className={twMerge(
              "w-8 h-8 mx-2 bg-lightgrey/50 border-white border-2 rounded-md flex items-center justify-center cursor-pointer"
            )}
            onClick={handleSubmit}
          >
            <i className="fa-solid fa-square-check"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
