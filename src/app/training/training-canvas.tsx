"use client";

import { useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { useWindowSize } from "@/hooks/useWindowSize";
import cv from "opencv-ts";
import { reshape } from "mathjs";
import * as tf from "@tensorflow/tfjs";
import { loadModel } from "@/app/training/actions";
import { getCategoryFromNumber, getRandomCategory } from "@/utils/categories";
import toast from "react-hot-toast";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import { MixIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { usePathname } from "next/navigation";
import { Controls } from "@/components/canvas/controls";
import { useDrawPhone } from "@/hooks/useDrawPhone";

interface CanvasProps {
  UserTag: string;
  UserImageUrl: string;
  UserClerkId: string;
}

export default function TrainingCanvas({
                                         UserTag,
                                         UserImageUrl,
                                         UserClerkId
                                       }: CanvasProps) {
  const [color, setColor] = useState<string>("handleMouseUp#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [controls, setControls] = useState<boolean>(true);
  const currentRoute = usePathname();
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
    getFirstWord();
    toast.promise(getModel(), {
      loading: "Loading Model...",
      success: <b>Model Loaded!</b>,
      error: <b>Could not load the model.</b>
    });
  }, []);

  const getFirstWord = () => {
    const word = getRandomCategory();
    setCurrentWord(word);
  };

  const getModel = async () => {
    loadModel().then((model) => {
      setModel(model);
    });
  };
  // ====================

  const size = useWindowSize();

  const handleMouseUp = () => {
    setPoints([]);
    predict();
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
        points[i + 1].y
      );
      ctx.stroke();
    }
    setPoints([points[points.length - 1]]);
  }

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
    let topCats: (string | null)[] = [];
    if (model) {
      const pred = model.predict(tf.tensor([dataReshaped]));
      const arr = Array.from((pred as tf.Tensor2D).dataSync());
      const arrcopy = arr.slice();
      const RELATIVE_PREDICTIONS = 20;
      const relevantPreds = arrcopy
        .sort((a, b) => b - a)
        .slice(0, RELATIVE_PREDICTIONS);
      let topIndices = [];
      for (let i = 0; i < RELATIVE_PREDICTIONS; i++) {
        topIndices.push(arr.indexOf(relevantPreds[i]));
      }
      topCats = topIndices.map((index) => {
        return getCategoryFromNumber(index);
      });
    }
    if (topCats.includes(currentWord)) {
      setCurrentGuess(currentWord);
      toast.success("Correct! Piguesso guessed the word!");
      setCurrentGuess("");
      getFirstWord();
      handleClear();
    } else {
      setCurrentGuess(topCats[0]);
    }
  };

  const handleClear = () => {
    clearPhone();
    clear();
  };

  const switchControls = () => {
    setControls(!controls);
  };

  return (
    <div
      className={twMerge(
        "w-full h-dvh min-w-[300px] min-h-[300px] bg-surface overflow-hidden touch-none"
      )}
    >
      <div className="w-full absolute top-0 flex-col justify-center items-center bg-black">
        <div className={"w-full h-20 flex bg-primary items-center pl-16"}>
          <div className={twMerge(TextStyles.H5, "text-center")}>
            Challenge: {currentWord}
          </div>
        </div>
        <div className={"w-full h-2 bg-surface"}></div>
      </div>
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
      <div className={"w-full absolute bottom-0"}>
        <Alert
          className={
            "w-[80%] md:w-1/3 mx-auto z-20 bottom-24 md:bottom-36 flex items-center relative"
          }
        >
          <MixIcon className="h-4 w-4" />
          <AlertTitle className={TextStyles.RobotoBigText}>
            I am guessing that is a{" "}
            <span className={TextStyles.H7}>
                  {currentGuess?.replace("_", " ").toUpperCase()}
                </span>
          </AlertTitle>
        </Alert>
        <Controls
          UserTag={UserTag}
          controls={controls}
          UserImageUrl={UserImageUrl}
          currentWord={currentWord}
          getFirstWord={getFirstWord}
          switchControls={switchControls}
          handleClear={handleClear}
          setColor={setColor}
        />
      </div>
    </div>
  );
}
