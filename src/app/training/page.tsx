import { currentUser, SignIn } from "@clerk/nextjs";
import TrainingCanvas from "./training-canvas";
import { submit } from "@/app/training/submit";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  } else {
    return (
      <TrainingCanvas
        UserImageUrl={user.imageUrl}
        UserTag={user.username ?? ""}
        UserClerkId={user.id}
      />
    );
  }
}
