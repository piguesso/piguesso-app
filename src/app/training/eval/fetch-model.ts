"use server";

import { list } from "@vercel/blob";
import * as tf from "@tensorflow/tfjs";



export default async function fetchModel() {
  const response = await list();
  const modelDownloadUrl = response.blobs.find((item) => item.pathname === "model/model.json")?.downloadUrl;
  if (!modelDownloadUrl) {
    return null;
  }
  return (await tf.loadLayersModel(modelDownloadUrl));
}