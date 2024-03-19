import DynamicIsland from "@/components/navigation/nav-bar";
import { SignIn, currentUser } from "@clerk/nextjs";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="w-full h-full bg-primary">
      <h1>Page</h1>
      <DynamicIsland
        UserImageUrl={user.imageUrl}
        UserTag={user.username ?? undefined}
      />
    </div>
  );
}
