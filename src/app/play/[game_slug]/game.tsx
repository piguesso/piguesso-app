"use client";
// client wrapper component

// State

import Lobby from "@/app/play/[game_slug]/lobby";

interface GameProps {
  gameSlug: string
}

export default function game(props: GameProps) {
  return <Lobby gameSlug={props.gameSlug}/>
}