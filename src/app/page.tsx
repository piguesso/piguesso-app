import Image from "next/image";
// import { SignIn, SignInButton } from "@clerk/nextjs";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import DrawLink from "@/components/draw-link";
import DynamicIsland from "@/components/navigation/nav-bar";
import { SignIn, currentUser } from "@clerk/nextjs";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

interface homeProps {}
export default async function Home() {

  const user = await currentUser();
  if (!user) {
    return <SignIn />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <div className={TextStyles.H2}>Welcome to </div>
      <div
        className={twMerge(
          TextStyles.H2Gradient,
          "bg-gradient-to-r from-purple-400 to-yellow-400 pb-6",
        )}
      >
        Piguesso
      </div>
      <DrawLink />
      <DynamicIsland UserImageUrl={user.imageUrl} UserTag={user.username ?? undefined} />
    </main>
  );
}
