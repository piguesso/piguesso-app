"use client";

import { useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { useWindowSize } from "@/hooks/useWindowSize";
import cv from "opencv-ts";
import { reshape } from "mathjs";
import * as tf from "@tensorflow/tfjs";
import { loadModel } from "@/app/training/actions";
import { getCategoryFromNumber } from "@/utils/categories";
import toast from "react-hot-toast";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { Controls } from "@/components/canvas/controls";

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
    confidence: number,
  ) => Promise<never>;
}

export default function DemoCanvas({
  UserTag,
  UserImageUrl,
  UserClerkId,
  submit,
  term,
}: CanvasProps) {
  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [controls, setControls] = useState<boolean>(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  const currentRoute = usePathname();

  useEffect(() => {
    getModel();
  }, []);

  const getModel = async () => {
    // loading model
    loadModel().then((model) => {
      setModel(model);
    });
  };
  // ====================

  const size = useWindowSize();

  const handleMouseUp = () => {
    setPoints([]);
  };

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
        points[i + 1].y,
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
      return;
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
      const RELATIVE_PREDICTIONS = 10;
      const relevantPreds = arrcopy
        .sort((a, b) => b - a)
        .slice(0, RELATIVE_PREDICTIONS);
      let topIndices = [];
      for (let i = 0; i < RELATIVE_PREDICTIONS; i++) {
        topIndices.push(arr.indexOf(relevantPreds[i]));
      }
    }
  };

  const handleClear = () => {
    clear();
  };

  const switchControls = () => {
    setControls(!controls);
  };

  return (
    <div
      className={twMerge(
        "w-full h-full min-w-[300px] min-h-[300px] bg-surface overflow-hidden absolute",
        "canvas-wrapper",
      )}
    >
      <div className="w-full h-full absolute top-0 flex-col justify-center items-center bg-black">
        <div className={"w-full h-28 flex bg-primary items-center pl-16"}>
          <div className={twMerge(TextStyles.H5, "text-center")}>
            Challenge: {getCategoryFromNumber(term)}
          </div>
        </div>
        <div className={"w-full h-2 bg-surface"}></div>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={handleMouseUp}
          width={size.width || 600}
          height={size.height || 600}
          className={"bg-white shadow-2xl"}
          id={"inputCanvas"}
        />
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
