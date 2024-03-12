"use server";


// code to submit a drawing
import { db } from "@/db";
import { training } from "@/db/schema/training";
import { redirect } from "next/navigation";

type Drawing = {
  data: number[][][];
}

export default async function submit(drawing: number[][][], game_slug: string) {
  const d: Drawing = {
    data: drawing,
  }
  // await db.insert(...)
  //   .values({
  //     clerkId,
  //     drawing: d,
  //   })
  //   .onConflictDoUpdate({
  //     target: training.clerkId,
  //     set: {
  //       drawing: d,
  //     },
  //   })
  return redirect("/play/[game_slug]/")
}