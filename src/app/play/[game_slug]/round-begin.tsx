import { PlayerStats, Round } from "@/utils/interfaces";

export interface RoundBeginPageProps {
    playerId: string;
    gameId: number;
    roundNumber: number;
    currentRoundInfo: string;
    currentPlayerStats: string;
    maxRounds: number;
}

export default function RoundBeginPage(props: RoundBeginPageProps) {

    const roundInfo: Round = JSON.parse(props.currentRoundInfo);
    const playerStats: PlayerStats = JSON.parse(props.currentPlayerStats);

    return (
        <>
            <div className="">
                <h1>
                    {props.roundNumber === 0 ? "Start" : `Round ${props.roundNumber} / ${props.maxRounds}`}
                </h1>
            </div>
        </>
    );
}
