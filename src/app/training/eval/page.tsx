import { currentUser, SignIn } from "@clerk/nextjs";
import Canvas from "@/app/training/canvas";
import { submit } from "@/app/training/submit";
import { db } from "@/db";
import { training } from "@/db/schema/training";
import { eq } from "drizzle-orm";
import Prediction from "@/app/training/eval/prediction";
import { list } from "@vercel/blob"
import * as tf from "@tensorflow/tfjs";
import * as core from "@tensorflow/tfjs-core";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  const trainingData = await db.query.training.findFirst({
    where: eq(training.clerkId, user.id),
  });

  if (!trainingData) {
    return <Canvas UserImageUrl={user.imageUrl} UserTag={user.username ?? ""} UserClerkId={user.id} submit={submit}/>;
  }

  const response = await list();
  const modelDownloadUrl = response.blobs.find((item) => item.pathname === "model/model.json")?.downloadUrl;
  if (!modelDownloadUrl) {
    return null;
  }
  const model = await tf.loadLayersModel(modelDownloadUrl);
  if (!model) {
    return null;
  }

  const prediction = model.predict(core.tensor([trainingData.drawing.data]));
  const predArray = (prediction as core.Tensor2D).arraySync()[0] as number[];
  let max = predArray[0];
  let maxIndex = 0;
  for (let i = 1; i < predArray.length; i++) {
    if (predArray[i] > max) {
      maxIndex = i;
      max = predArray[i];
    }
  }

  console.log(maxIndex, max);


  return (
    <div>
      <h1>Page</h1>
      <Prediction trainingData={trainingData.drawing.data}/>
    </div>
  );
}