"use client";

import { useEffect, useState } from "react";
interface ClientCoundownProps {
  time: number;
  className: string;
  text: string;
}

export default function ClientCountdown({
  time,
  className,
  text,
}: ClientCoundownProps) {
  const [countdown, setCountdown] = useState(time);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  return (
    <div className={className}>
      {text} {countdown / 1000}
    </div>
  );
}
