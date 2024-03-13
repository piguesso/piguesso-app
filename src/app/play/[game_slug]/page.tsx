import { SignIn, currentUser } from "@clerk/nextjs";
import Game from "../../../components/game/game"

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
      <Game gameSlug={params.game_slug} currentUserAvatar={user.imageUrl} currentUserId={user.id} currentUserName={user.username ?? "Guest"} />
  );
}
