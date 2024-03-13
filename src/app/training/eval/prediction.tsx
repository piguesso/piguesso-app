"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadModel } from "@/app/training/eval/actions";
import { getCategoryFromNumber } from "@/utils/categories";
import { twMerge } from "tailwind-merge";
import textstyles from "@/utils/textstyles";

interface PredictionProps {
  trainingData: number[][][];
}

export default function Prediction({trainingData} : PredictionProps) {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    // is model in localStorage?
    getModel()
  }, []);

  const getModel = async () => {
    // const modelFromStorage = localStorage.getItem("model")
    // if (!modelFromStorage) {
    //   const model = await loadModel();
    //   if (!model) return
    //   else {
    //     model.save("localstorage://model")
    //   }
    //   return model
    // } else {
    //   return await tf.loadLayersModel("localstorage://model")
    // }
    const model = await loadModel();
    if (!model) return
    else {
      setModel(model)
    }

  }

  let predCat

  if (model) {
    const pred = model.predict(tf.tensor([trainingData]));
    const arr = Array.from((pred as tf.Tensor2D).dataSync());
    // find index of max value
    const max = arr.indexOf(Math.max(...arr));
    predCat = getCategoryFromNumber(max)
  }
  // Use the predict function as needed in your component
  return (
    <div className={twMerge(textstyles.H4, "!text-primary")}>
      Did you draw a {predCat}?
    </div>
  );
}