"use client";

import { LayersModel } from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as core from "@tensorflow/tfjs-core";
import fetchModel from "@/app/training/eval/fetch-model";
import { Button } from "@mui/material";

interface PredictionProps {
  trainingData: number[][][];
}

export default function Prediction({ trainingData }: PredictionProps) {
  // const [model, setModel] = useState<LayersModel | null>(null);
  let model: LayersModel | null = null;

  const MODEL_URL = 'https://storage.googleapis.com/piguesso-classifier/model/model.json';

  const handleClick = async () => {
    model = await fetchModel();
    if (!model) {
      console.log('Model not found');
      return (
        <div>
          <h1>Model not found</h1>
        </div>
      )
    }
    try {
      await model.save('localstorage://model');
    } catch (error) {
      console.error('Error saving model:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>
        Load Model
      </Button>
    </div>
  );
}