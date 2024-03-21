"use client";

import { useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { useWindowSize } from "@/hooks/useWindowSize";
import cv from "opencv-ts";
import { reshape } from "mathjs";
import * as tf from "@tensorflow/tfjs";
import { loadModel } from "@/app/training/actions";
import { categories, getCategoryFromNumber } from "@/utils/categories";
import toast from "react-hot-toast";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { Controls } from "@/components/canvas/controls";
import DemoSheet from "@/app/demo/demo-sheet";
import EndSheet from "@/app/demo/end-sheet";
import { useDrawPhone } from "@/hooks/useDrawPhone";

interface CanvasProps {
  UserTag: string;
  UserImageUrl: string;
  UserClerkId: string;
  term: number;
  submit: (
    drawing: number[][][],
    clerkId: string,
    term: number,
    guess: number,
    confidence: number
  ) => Promise<never>;
}


export class Timer {
  constructor(public counter = 15, setSeconds: (s: number) => void) {
    let intervalId = setInterval(() => {
      const c = this.counter - 1;
      this.counter = this.counter - 1;
      setSeconds(c);
      if (this.counter === 0) clearInterval(intervalId);
    }, 1000);
  }
}

export default function DemoCanvas({
                                     UserTag,
                                     UserImageUrl,
                                     UserClerkId,
                                     submit,
                                     term
                                   }: CanvasProps) {
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [controls, setControls] = useState<boolean>(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [open, setOpen] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(15);
  const [openEnd, setOpenEnd] = useState<boolean>(true);
  const [timer, setTimer] = useState<Timer>();
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const { canvasRefPhone, onTouchStart, clearPhone } =
    useDrawPhone(drawLinePhone);
  const currentRoute = usePathname();
  const size = useWindowSize();

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /Mobile/.test(userAgent);

    if (isMobile) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
    getModel();
  }, []);
  const getModel = async () => {
    // loading model
    loadModel().then((model) => {
      setModel(model);
    });
  };

  const handleMouseUp = () => {
    setPoints([]);
  };


  const handleClear = () => {
    clearPhone();
    clear();
  };

  const switchControls = () => {
    setControls(!controls);
  };


  const handleSubmit = () => {
    const [guess, termConfidence, dataReshaped] = predict();
    if (!guess || !termConfidence || !dataReshaped || typeof guess !== "number" || typeof termConfidence !== "number") {
      toast.error("Piguesso did not make it to the session. Please refresh.");
      return;
    }
    toast.promise(
      submit(dataReshaped, UserClerkId, categories.yoga, guess, termConfidence), {
        success: "Demo round submitted",
        error: "Could not submit your drawing...",
        loading: "Submitting your drawing"
      }
    );
  };

  function drawLinePhone({ prevPoint, currentPoint, ctx }: DrawProps) {
    const lineColor = color;
    const lineWidth = 5;

    setPoints([...points, currentPoint]);

    if (points.length < 5) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);

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

  function drawLine({ prevPoint, currentPoint, ctx }: DrawProps) {
    const lineColor = color;
    const lineWidth = 5;

    setPoints([...points, currentPoint]);

    if (points.length < 5) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
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

  const predict = () => {
    let CANVAS_SRC;
    let dst;
    try {
      CANVAS_SRC = cv.imread("inputCanvas");
      dst = new cv.Mat(80, 80, cv.CV_8S);
    } catch (e) {
      toast.error("Please Refresh. Trainingssession has expired.");
      return [null, null, null];
    }
    cv.resize(CANVAS_SRC, dst, new cv.Size(80, 80), 0, 0, cv.INTER_AREA);
    const numberDst: number[] = [];
    dst.data32S.forEach((x) => numberDst.push(x));
    const data = numberDst.map((x) => (x === 0 ? 0.0 : 1.0));
    const dataReshaped: any = reshape(data as unknown as number[], [80, 80, 1]);
    if (model) {
      const pred = model.predict(tf.tensor([dataReshaped]));
      const arr = Array.from((pred as tf.Tensor2D).dataSync());
      const arrcopy = arr.slice();
      const relevantPreds = arrcopy
        .sort((a, b) => b - a)
        .slice(0, 1);
      const guess = arr.indexOf(relevantPreds[0]);
      const termConfidence = arr[categories.yoga];
      return [guess, termConfidence, dataReshaped];
    } else {
      toast.error("Piguesso did not make it to the session. Please refresh.");
      return [null, null, null];
    }
  };

  return (
    <div
      className={twMerge(
        "w-full h-full min-w-[300px] min-h-[300px] bg-surface overflow-hidden absolute",
        "canvas-wrapper"
      )}
    >
      <div className="w-full h-full absolute top-0 flex-col justify-center items-center bg-black">
        <div className={"w-full h-28 flex bg-primary items-center md:pl-16 mx-auto"}>
          <div className={"w-full md:w-1/2 flex flex-col md:flex-row md:justify-between items-center"}>
            <div className={twMerge(TextStyles.H5, "text-center")}>
              Challenge: {getCategoryFromNumber(categories.yoga)}
            </div>
            {seconds &&
              <div className={twMerge(TextStyles.H5, "text-center")}>
                Draw in {seconds} Seconds
              </div>
            }
          </div>
        </div>
        <div className={"w-full h-2 bg-surface"}></div>
        <canvas
          ref={deviceType === "mobile" ? canvasRefPhone : canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={handleMouseUp}
          width={size.width}
          height={size.height}
          className={"bg-white shadow-2xl"}
          id={"inputCanvas"}
        />
        <DemoSheet word={getCategoryFromNumber(categories.yoga) ?? ""} open={open} setOpen={setOpen}
                   setTimer={setTimer} setSeconds={setSeconds} />
        <EndSheet word={"yoga"} open={openEnd && seconds === 0} submit={handleSubmit} />
        <Controls
          UserTag={UserTag}
          controls={controls}
          UserImageUrl={UserImageUrl}
          currentWord={getCategoryFromNumber(term) ?? ""}
          switchControls={switchControls}
          handleClear={handleClear}
          setColor={setColor}
        />
      </div>
    </div>
  );
}
