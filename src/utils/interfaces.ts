export interface Round {
    id: number;
    gameId: number;
    roundNumber: number;
    topic: string;
    createdAt: Date;
}

export interface PlayerStats {
    gameId: number;
    playerId: string;
    score: number;
    position: number;
}