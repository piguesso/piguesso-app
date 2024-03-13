import { currentUser, SignIn } from "@clerk/nextjs";
import Canvas from "@/app/training/canvas";
import { submit } from "@/app/training/submit";
import { db } from "@/db";
import { training } from "@/db/schema/training";
import { eq } from "drizzle-orm";
import Prediction from "@/app/training/eval/prediction";

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




  return (
    <div>
      <h1>Page</h1>
      <Prediction trainingData={trainingData.drawing.data}/>
    </div>
  );
}