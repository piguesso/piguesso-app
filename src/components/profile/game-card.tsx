import { Card } from "@mui/material";

export type GameCardProps = {
  id: number;
  status: string;
};

export default function GameCard({ id, status }: GameCardProps) {
  const getStatus = () => {
    if (status === "in-progress") {
      return (
        <p className="text-primary">
          <b>In Progress</b>
        </p>
      );
    } else if (status === "completed") {
      return (
        <p className="text-success">
          <b>Completed</b>
        </p>
      );
    } else {
      return (
        <p className="text-destructive">
          <b>Waiting for players</b>
        </p>
      );
    }
  };

  return (
    <Card>
      <div className="flex flex-row gap-4">
        <div className="flex justify-center items-center rounded-full w-[48px] h-[48px] bg-primary overflow-hidden">
          <p className="font-bold">#{id}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Game #{id}</h2>
          {getStatus()}
        </div>
      </div>
    </Card>
  );
}
