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
import * as tf from "@tensorflow/tfjs";
import { getCategoryFromNumber, getRandomCategory } from "@/utils/categories";
import { loadModel } from "@/app/training/actions";
import toast from "react-hot-toast";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { MixIcon } from "@radix-ui/react-icons";

interface CanvasProps {
  UserTag: string;
  UserImageUrl: string;
  UserClerkId: string;
  gameId: number;
  submit: (drawing: number[][][], clerkId: string) => void;
}

const skribble = new Skribble();

export default function GameCanvas({ UserTag, UserImageUrl, UserClerkId, submit }: CanvasProps) {
  useEffect(() => {
    //get Word and game info from API
  }, []);


  const [color, setColor] = useState<string>("#000000");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);
  const [controls, setControls] = useState<boolean>(false);
  // PREDICTION AND MODEL
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    getModel();
    getFirstWord();
  }, []);

  const getFirstWord = () => {
    const word = getRandomCategory();
    setCurrentWord(word);
  };

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


  const predict = () => {
    let CANVAS_SRC;
    let dst;
    try {
      CANVAS_SRC = cv.imread("inputCanvas");
      dst = new cv.Mat(80, 80, cv.CV_8S);
    } catch (e) {
      toast.error("Please Refresh. Trainingssession has expired.")
      return
    }
    cv.resize(CANVAS_SRC, dst, new cv.Size(80, 80), 0, 0, cv.INTER_AREA);
    const numberDst: number[] = [];
    dst.data32S.forEach((x) => numberDst.push(x));
    const data = numberDst.map((x) => x === 0 ? 0.0 : 1.0);
    const dataReshaped: any = reshape(data as unknown as number[], [80, 80, 1]);
    let topCats: (string | null)[] = [];
    if (model) {
      const pred = model.predict(tf.tensor([dataReshaped]));
      const arr = Array.from((pred as tf.Tensor2D).dataSync());
      const arrcopy = arr.slice();
      const RELATIVE_PREDICTIONS = 20;
      const relevantPreds = arrcopy.sort((a, b) => b - a).slice(0, RELATIVE_PREDICTIONS);
      let topIndices = [];
      for (let i = 0; i < RELATIVE_PREDICTIONS; i++) {
        topIndices.push(arr.indexOf(relevantPreds[i]));
      }
      topCats = topIndices.map((index) => {
        return getCategoryFromNumber(index);
      });
      console.log(topCats);
    }
    if (topCats.includes(currentWord)) {
      setCurrentGuess(currentWord);
      toast.success("Correct! You guessed the word!");
      setTimeout(() => {
        setCurrentGuess(null);
        getFirstWord();
        clear();
      }, 2000);
    } else {
      setCurrentGuess(topCats[0]);
    }
    // submit(dataReshaped, UserClerkId);
  };

  const handleClear = () => {
    clear();
  };

  const switchControls = () => {
    setControls(!controls);
  }

  return (
    <div
      className={twMerge("w-full h-full min-w-[300px] min-h-[300px] bg-surface overflow-hidden absolute", "canvas-wrapper")}>
      <div className="w-full h-full absolute top-0 flex-col justify-center items-center bg-black">
        <div className={"w-full h-28 flex bg-primary items-center pl-16"}>
          <div className={twMerge(TextStyles.H5, "text-center")}>Challenge: {currentWord}</div>
        </div>
        <div className={"w-full h-2 bg-surface"}></div>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseUp={handleMouseUp}
          width={(size.width || 600)}
          height={(size.height || 600)}
          className={"bg-white shadow-2xl"}
          id={"inputCanvas"}
        />
        <Alert className={"w-[80%] md:w-1/3 mx-auto z-20 bottom-1/3 flex items-center"}>
          <MixIcon className="h-4 w-4" />
          <AlertTitle className={TextStyles.RobotoBigText}>I am guessing that is a <span className={TextStyles.H7}>{currentGuess?.replace("_"," ").toUpperCase()}</span></AlertTitle>
        </Alert>
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
              <div className="h-[80%] w-[1px] bg-gray-500 my-auto mx-2" />
              {controls ?
                <ColorControls setColor={setColor} clear={handleClear} generateNewWord={getFirstWord} currentWord={currentWord}/>
                :
                <>
                  <Navbar UserImageUrl={UserImageUrl} UserTag={UserTag} />
                  <div className="h-[80%] w-[1px] bg-gray-500 my-auto mx-2" />
                </>
              }
            </div>
        </div>
      </div>
    </div>
  );
}
