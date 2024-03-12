"use server";

import { db } from "@/db";
import { games } from "@/db/schema/game";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createGame = async () => {
  "use server";

  // generate random slug
  const slug = Math.random().toString(36).substring(7);

  db.insert(games).values({
  });
}

export const joinGame = (slug: number) => {
  "use server";
  db.query.games.findFirst({
    where: eq(games.id, slug)
  });
  // join game
  redirect("/play/")
}