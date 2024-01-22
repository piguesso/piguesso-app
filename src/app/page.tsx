import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import TextStyles from "@/utils/textstyles";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface homeProps {}

export default function Home() {
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
      <SignIn />
      <Link href="/drawing" className={TextStyles.Text}>
        LINK
      </Link>
    </main>
  );
}
