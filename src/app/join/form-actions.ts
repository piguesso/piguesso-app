"use server";

import { z } from "zod";
import { joinSchema } from "@/zod/join-schema";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

type FormData = z.infer<typeof joinSchema>;

async function submit(formData: FormData, redirectUrl: string) {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  await db.update(users)
    .set({ biography: formData.biography })
    .where(eq(users.clerkId, user.id))

  return redirect(redirectUrl)
}

export { submit };