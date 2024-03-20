import { db } from "@/db";
import DrawingOut from "@/app/demo/wrapped/drawing-out";
import cv from "opencv-ts";

export default async function Page() {
  const results = await db.query.demo.findMany();
  return (
    <div>
      {results?.length > 0 &&
        <DrawingOut drawing={results[1]?.drawing?.data} />
      }
    </div>
  )
}