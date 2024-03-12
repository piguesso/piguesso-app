"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function ModelComponent() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      // const model = await tf.loadLayersModel('/model/model.json');
      // @ts-ignore
      setModel(model);
    }
    loadModel();
  }, []);

  // Use the predict function as needed in your component
  return (
    <div>
      Model loaded: {model ? 'Yes' : 'No'}
    </div>
  );
}