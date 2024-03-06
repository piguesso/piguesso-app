import { SignIn, currentUser } from "@clerk/nextjs";
import { Sign } from "crypto";
import { redirect } from "next/navigation";
import Canvas from "./canvas";

export default async function Page() {
    const user = await currentUser();
    if (!user) {
        return <SignIn />;
    } else {
        return <Canvas UserImageUrl={user.imageUrl} UserTag={user.username ?? ""} />;
    }
}