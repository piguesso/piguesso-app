"use client";

import { Button } from "@rmwc/button";
import Link from "next/link";

export default function DrawLink() {
  return (
    <div className="flex flex-col items-center text-white">
      <Link href="/drawing">
        <Button raised>Draw</Button>
      </Link>
    </div>
  );
}
