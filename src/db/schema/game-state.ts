import { pgEnum } from "drizzle-orm/pg-core";

const gameState = pgEnum("game_state", ["waiting", "playing", "finished"]);

export { gameState };