"use client";
// client wrapper component

// State

import Lobby from "@/app/play/[game_slug]/lobby";
import GameCanvas from "@/app/play/[game_slug]/game-canvas";
import submit from "@/app/play/[game_slug]/submit";
import { currentUser } from "@clerk/nextjs";

interface GameProps {
  gameSlug: string
  currentUserName: string
  currentUserAvatar: string
  currentUserId: string
}

export default function game(props: GameProps) {
  return (
    // <Lobby gameSlug={props.gameSlug}/>
    <GameCanvas gameSlug={props.gameSlug} UserTag={props.currentUserName} UserClerkId={props.currentUserId} submit={submit} UserImageUrl={props.currentUserAvatar} />
  )
}