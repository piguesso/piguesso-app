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
import { useDrawPhone } from "@/hooks/useDrawPhone";

interface pageProps {}

const skribble = new Skribble();

export default function Page(props: pageProps) {
  let timeOfLastPoint = 0;
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const { canvasRefPhone, onTouchStart, clearPhone } =
    useDrawPhone(drawLinePhone);
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

  function drawLinePhone({ prevPoint, currentPoint, ctx }: DrawProps) {
    if (timeOfLastPoint === 0) {
      timeOfLastPoint = Date.now();
    }

    const { x: currX, y: currY } = currentPoint;
    const newTime = Date.now();
    const lineColor = color;
    const lineWidth = 7;

    let startPoint = prevPoint ?? currentPoint;

    // points.push(currentPoint);
    setPoints([...points, currentPoint]);

    if (points.length < 5) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);

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
      );
      ctx.stroke();
    }

    skribble.update(currX, currY, newTime);
    timeOfLastPoint = newTime;
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
        points[i + 1].y
      ),
        ctx.stroke();
    }

    skribble.update(currX, currY, newTime);
    timeOfLastPoint = newTime;
  }

  const handleClear = () => {
    skribble.clear();
    clear();
  };

  const handleClearPhone = () => {
    skribble.clear();
    clearPhone();
  };

  return (
    <div className="h-full w-full">
      {deviceType === "desktop" && (
        <div className="w-full h-full bg-white flex flex-col justify-center gap-y-5 items-center overflow-clip">
          {/* <h3 className={twMerge(TextStyles.H3Gradient, "text-black")}>
            Draw a <i>Skull</i>
          </h3> */}
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
          <div className="flex flex-col gap-y-3 w-full items-center pr-1 pl-1 pt-1">
            {/* <h3 className={twMerge(TextStyles.H3Gradient, "text-background")}>
              Draw a <i>Skull</i>
            </h3> */}
            <canvas
              ref={canvasRefPhone}
              onTouchStart={onTouchStart}
              onTouchEnd={() => setPoints([])}
              width="full"
              height={(size.height || 0) * 0.55}
              className="w-full border border-border  rounded-md"
            />
            <div>
              <div className="max-w-fit h-full flex p-3 rounded-xl flex-col gap-y-4 bg-surface">
                <ColorControls
                  setColor={setColor}
                  erease={handleClearPhone}
                  clear={handleClearPhone}
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
