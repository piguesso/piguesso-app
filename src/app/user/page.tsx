import DynamicIsland from "@/components/navigation/nav-bar";
import { redirect } from "next/navigation";
import { currentUser, SignIn } from "@clerk/nextjs";

export default async function Page() {
  const User = await currentUser();
  if (!User) {
    return <SignIn />;
  } else {
    return redirect("/user/" + User.username);
  }
}
