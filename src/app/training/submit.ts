"use server";

import { db } from "@/db";
import { training } from "@/db/schema/training";
import { redirect } from "next/navigation";


type Drawing = {
  data: number[][][];
}
async function submit(drawing: number[][][], clerkId: string) {
  const d: Drawing = {
    data: drawing,
  }
  await db.insert(training)
    .values({
    clerkId,
    drawing: d,
  })
    .onConflictDoUpdate({
      target: training.clerkId,
      set: {
        drawing: d,
      },
    })
  return redirect("/training/eval")
}

export { submit };