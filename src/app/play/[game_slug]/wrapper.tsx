"use client";

import { useState } from "react";
import Lobby from "@/components/game/lobby";
import GameCanvas from "@/components/game/game-canvas";
import RoundBeginPage from "./round-begin";
import { State } from "@/utils/enums";

export interface UserProps {
    clerkId: string;
    name: string;
    avatar: string;
    userAuthToken: string;
}

export interface GameProps {
    gameId: number;
    gameSlug: string;
}

export type WrapperProps = UserProps & GameProps;

export default function Wrapper(props: WrapperProps) {
    //TODO connect to websocket and listen to messages using a hook

    const [state, setState] = useState<State>(State.WAITING);
    const [roundNumber, setRoundNumber] = useState<number>(0);
    // Round object should be stored as string, so changes can be detected
    const [currentRound, setCurrentRound] = useState<string>("");
    // Player Stats object should be stored as string, so changes can be detected
    const [currentPlayerStats, setCurrentPlayerStats] = useState<string>("");
    const [maxRounds, setMaxRounds] = useState<number>(3);

    const handleSubmit = () => { }

    return (
        <>
            {state === State.WAITING && <Lobby gameSlug={props.gameSlug} currentUserName={props.name} gameId={props.gameId} />}
            {state === State.START &&
                <RoundBeginPage
                    gameId={props.gameId}
                    playerId={props.clerkId}
                    roundNumber={roundNumber}
                    currentPlayerStats={currentPlayerStats}
                    currentRoundInfo={currentRound}
                    maxRounds={maxRounds}
                />
            }
            {state === State.DRAWING &&
                <GameCanvas
                    gameId={props.gameId}
                    UserTag={props.name}
                    UserClerkId={props.clerkId}
                    submit={handleSubmit}
                    UserImageUrl={props.avatar}
                />
            }
            {state === State.ROUND_TRANSITION &&
                <RoundBeginPage
                    gameId={props.gameId}
                    playerId={props.clerkId}
                    roundNumber={roundNumber}
                    currentPlayerStats={currentPlayerStats}
                    currentRoundInfo={currentRound}
                    maxRounds={maxRounds}
                />
            }
            {state === State.END && <div>Game Over</div>}
        </>
    );
}
