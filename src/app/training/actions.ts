import * as tf from "@tensorflow/tfjs";

export async function loadModel() {
  const model = await tf.loadLayersModel("/model340/model.json");
  if (!model) {
    return null;
  }
  return model;
}

