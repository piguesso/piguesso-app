"use client";

import GameCanvas from "@/app/play/[game_slug]/game-canvas";
import submit from "@/app/play/[game_slug]/submit";

interface GameProps {
  gameId: number
  currentUserName: string
  currentUserAvatar: string
  currentUserId: string
}

export default function game(props: GameProps) {
  return (
<<<<<<< Updated upstream
    <Lobby gameSlug={props.gameSlug}/>
    // <GameCanvas gameSlug={props.gameSlug} UserTag={props.currentUserName} UserClerkId={props.currentUserId} submit={submit} UserImageUrl={props.currentUserAvatar} />
=======
    // <Lobby gameId={props.gameId}/>
    <GameCanvas gameId={props.gameId} UserTag={props.currentUserName} UserClerkId={props.currentUserId} submit={submit} UserImageUrl={props.currentUserAvatar} />
>>>>>>> Stashed changes
  )
}