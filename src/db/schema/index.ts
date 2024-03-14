import * as friends from "./friends";
import * as users from "./user";
import * as scoring from "./scoring";
import * as games from "./game";
import * as training from "./training";
import * as players from "./players";
import * as playerScoring from "./scoring";
import * as rounds from "./rounds";
import * as playerScoringRound from "./player-scoring-round";

const schema = {
  ...friends,
  ...users,
  ...scoring,
  ...games,
  ...training,
  ...players,
  ...playerScoring,
  ...rounds,
  ...playerScoringRound,
};

export default schema;
