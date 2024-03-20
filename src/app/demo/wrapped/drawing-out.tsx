"use client";

import cv, { Mat } from "opencv-ts";
import { reshape } from "mathjs";
import { Button } from "@mui/material";

interface DrawingOutProps {
  drawing?: Mat;
}

export default function DrawingOut({ drawing }: DrawingOutProps) {
  if (!drawing) return null;
  const dst = new cv.Mat(80, 80, cv.CV_8S);
  const dataReshaped = reshape(drawing as unknown as number[][], [80, 80]);
  const dataReshaped1 = reshape(dataReshaped as unknown as number[], [-1]);
  const show = () => {
    cv.imshow("out", dst);
  };
  return (
    <div className={"w-full h-full"}>
      <canvas id="out" width={1200} height={1200} />
      <Button variant={"contained"} onClick={show} />
    </div>
  );
}