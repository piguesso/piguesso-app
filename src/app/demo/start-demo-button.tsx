"use client";

import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface StartDemoButtonProps {
  startGame: () => Promise<void>
}

export default function StartDemoButton({startGame}:StartDemoButtonProps) {

  const handleClick = () => {
    startGame()
  }
  return (
    <Button variant="contained" className={"bg-primary rounded-xl flex flex-col"} onClick={handleClick}>
      Start Game
    </Button>
  )
}