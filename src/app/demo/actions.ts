"use server"

import { db } from "@/db";
import { games } from "@/db/schema/game";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { demo } from "@/db/schema/demo";
import { Mat } from "opencv-ts";

async function startGame() {
  await db.update(games).set({
    status: "playing"
  }).where(eq(games.id, 42069))
  return redirect("/demo")
}

interface Drawing {
  data: Mat
}
async function submitDemo(drawing: Mat, clerkId:string, term:number, guess:number, confidence:number) {
  const d: Drawing = {
    data: drawing,
  }
  await db.update(demo).set({
    drawing: d,
    term: term,
    guess: guess,
    termConfidence: confidence,
  }).where(eq(demo.clerkId, clerkId))
  return redirect("/demo/wrapped")
}

export {startGame, submitDemo}


