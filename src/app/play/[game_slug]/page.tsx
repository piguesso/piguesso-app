import { SignIn, currentUser } from "@clerk/nextjs";
import Wrapper from "./wrapper";

interface introProps {
  params: {
    game_slug: string;
  };
}

export default async function page({ params }: introProps) {

  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  return (
      <Wrapper clerkId={user.id} name={user.username ?? "Guest"} avatar={user.imageUrl} userAuthToken={user.username ?? ""} gameId={parseInt(params.game_slug)} />
  );
}
