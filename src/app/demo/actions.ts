"use server"

import { db } from "@/db";
import { games } from "@/db/schema/game";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

async function startGame() {
  await db.update(games).set({
    status: "playing"
  }).where(eq(games.id, 42069))
  return redirect("/demo")
}

export {startGame}