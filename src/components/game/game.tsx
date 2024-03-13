"use client";

import submit from "@/app/play/[game_slug]/submit";
import { currentUser } from "@clerk/nextjs";
import GameCanvas from "@/components/game/game-canvas";

interface GameProps {
  gameId: number
  currentUserName: string
  currentUserAvatar: string
  currentUserId: string
}

export default function game(props: GameProps) {
  return (
    <GameCanvas gameId={props.gameId} UserTag={props.currentUserName} UserClerkId={props.currentUserId} submit={submit} UserImageUrl={props.currentUserAvatar} />
  )
}