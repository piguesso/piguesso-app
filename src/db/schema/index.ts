import * as friends from "./friends";
import * as users from "./user";
import * as scoring from "./scoring";
import * as games from "./game";

const schema = {
  ...friends,
  ...users,
  ...scoring,
  ...games,
};

export default schema;
