import { db } from "@/db";
import { playerScoring } from "@/db/schema/scoring";
import { eq } from "drizzle-orm";

type ScoreItem = {
  key: string;
  value: number | null;
};

export default async function StatisticsTab({ userId }: { userId: string }) {
  const [stats, ..._] = await db
    .select()
    .from(playerScoring)
    .where(eq(playerScoring.playerId, userId))
    .execute();

  const scoreItems: ScoreItem[] = [
    { key: "Games Won", value: stats.gamesWon },
    { key: "Games Lost", value: stats.gamesLost },
    { key: "Games Played", value: stats.gamesPlayed },
    { key: "Top 3 Player", value: stats.gamesTop3 },
    { key: "Bottom 3 Player", value: stats.gamesBottom3 },
    { key: "Highest Score Game", value: stats.highestScoreGame },
    { key: "Highest Score Round", value: stats.highestScoreRound },
    { key: "Total XP", value: stats.totalXP },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 w-full">
        <div className="bg-success p-2.5 rounded-md w-full">
          <h1 className="text-xl font-semibold">{stats.gamesWon}</h1>
          <h2 className="font-bold">Games Won</h2>
        </div>
        <div className="bg-destructive p-2.5 rounded-md w-full">
          <h1 className="text-xl font-semibold">{stats.gamesLost}</h1>
          <h2 className="font-bold">Games Lost</h2>
        </div>
      </div>
      <div className="bg-primary p-2.5 w-full rounded-md">
        {scoreItems.map((item) => (
          <p key={item.key} className="font-semibold">
            {item.value ?? 0} {item.key}
          </p>
        ))}
      </div>
    </div>
  );
}
