"use client";

import { SetStateAction, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { ChromePicker } from "react-color";
import Skribble from "@/utils/skribble";
import { Navbar } from "@/components/navigation/nav-bar";
import ColorControls from "@/components/navigation/color-controls";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect } from "react";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";

interface pageProps {}

const skribble = new Skribble();

export default function Page(props: pageProps) {
  let timeOfLastPoint = 0;
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [deviceType, setDeviceType] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    const isMobile = /Mobile/.test(userAgent);

    if (isMobile) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  const size = useWindowSize();

  function removeLine({ prevPoint, currentPoint, ctx }: DrawProps) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }

    points.forEach(function (value) {
      console.log(value);
    });
  }

  function drawLine({ prevPoint, currentPoint, ctx }: DrawProps) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }

    const { x: currX, y: currY } = currentPoint;
    const newTime = Date.now();
    const lineColor = color;
    const lineWidth = 7;

    console.log(prevPoint, currentPoint);

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
        points[i + 1].y
      ),
        ctx.stroke();
    }

    // ctx.moveTo(startPoint.x, startPoint.y);
    // ctx.lineTo(currX, currY);
    // ctx.stroke();

    // ctx.fillStyle = lineColor;
    // ctx.beginPath();
    // ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    // ctx.fill();

    skribble.update(currX, currY, newTime);
    timeOfLastPoint = newTime;
  }

  const handleClear = () => {
    skribble.clear();
    clear();
  };

  return (
    <div className="h-full w-full">
      {deviceType === "desktop" && (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center overflow-clip">
          <h3 className={twMerge(TextStyles.H4, "text-background")}>Heading</h3>
          <div className="flex flex-col gap-10 pr-10"></div>
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseUp={() => setPoints([])}
            width={(size.width || 0) * 0.8}
            height={(size.height || 0) * 0.8}
            className="border border-black rounded-md"
          />
          <div
            className={
              "w-full h-20 sm:w-fit bg-surface fixed sm:absolute bottom-0 sm:bottom-10 mx-auto left-0 right-0 rounded-none sm:rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] px-12"
            }
          >
            <div className="max-w-fit h-full flex">
              <ColorControls
                erease={handleClear}
                setColor={setColor}
                clear={handleClear}
              />
              <Navbar />
            </div>
          </div>
        </div>
      )}
      {deviceType === "mobile" && (
        <div className="w-full h-full bg-white flex justify-center items-center overflow-clip">
          <div className="flex flex-col gap-10 w-full items-center pr-1 pl-1 pt-1">
            <canvas
              ref={canvasRef}
              onTouchEnd={() => setPoints([])}
              width="full"
              height={(size.height || 0) * 0.55}
              className="w-full border border-border  rounded-md"
            />
            <div>
              <div className="max-w-fit h-full flex p-3 rounded-xl flex-col gap-y-4 bg-surface">
                <ColorControls
                  setColor={setColor}
                  erease={handleClear}
                  clear={handleClear}
                />
                <Navbar />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
