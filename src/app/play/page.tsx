import DynamicIsland from "@/components/navigation/nav-bar";
import { redirect } from "next/navigation";

export default function Page() {
  return redirect("/play/game_slug");
}
