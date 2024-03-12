import * as tf from "@tensorflow/tfjs";
import * as tfn from "@tensorflow/tfjs-node";

export default async function fetchModel() {
  const tfndreq = require("@tensorflow/tfjs-node")
  const tfreq = require("@tensorflow/tfjs")
  const modelLoadHandler = tfndreq.io.fileSystem("../../../model/model.json");
  const model = await tfreq.loadLayersModel(modelLoadHandler)
  return model
}