"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GameStart from "@/components/game/game-start";

interface TimedRedirectAfterScreenProps {
  children: React.ReactNode;
  time: number;
  href: string;
}

const TimedRedirectAfterScreen = ({
  children,
  time,
  href,
}: TimedRedirectAfterScreenProps) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(href);
    }, time);
    return () => clearTimeout(time);
  }, [router, time, href]);

  return children;
};

export default TimedRedirectAfterScreen;
