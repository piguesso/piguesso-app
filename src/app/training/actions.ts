import * as tf from "@tensorflow/tfjs";

// export async function loadModel() {
//   const strokeReadModel = tf.sequential();
// // Add BatchNormalization layer
//   strokeReadModel.add(tf.layers.batchNormalization({ inputShape: [null, 28, 28, 1] }));
// // Add Conv1D layers
//   strokeReadModel.add(tf.layers.conv1d({ filters: 48, kernelSize: 5 }));
//   strokeReadModel.add(tf.layers.dropout({ rate: 0.3 }));
//   strokeReadModel.add(tf.layers.conv1d({ filters: 64, kernelSize: 5 }));
//   strokeReadModel.add(tf.layers.dropout({ rate: 0.3 }));
//   strokeReadModel.add(tf.layers.conv1d({ filters: 96, kernelSize: 3 }));
//   strokeReadModel.add(tf.layers.dropout({ rate: 0.3 }));
//
// // Add LSTM layers
//   strokeReadModel.add(tf.layers.lstm({ units: 128, returnSequences: true }));
//   strokeReadModel.add(tf.layers.dropout({ rate: 0.3 }));
//   strokeReadModel.add(tf.layers.lstm({ units: 128, returnSequences: false }));
//   strokeReadModel.add(tf.layers.dropout({ rate: 0.3 }));
//
// // Add Dense layers
//   strokeReadModel.add(tf.layers.dense({ units: 256 }));
//   strokeReadModel.add(tf.layers.dense({ units: 345, activation: "softmax" }));
//
// // Compile the model
//   strokeReadModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["categoricalAccuracy"] });
//   await strokeReadModel.save("/model/model-1.json");
// // load model weights
//   const model = await tf.loadLayersModel("/model/model.json");
//   if (!model) {
//     return null;
//   }
//   return model;
// }

export async function loadModel() {
  const model = await tf.loadLayersModel("/model340/model.json");
  if (!model) {
    return null;
  }
  return model;
}

