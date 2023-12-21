import { LiveScoreboard } from "../src/component/LiveScoreboard";

//Test Scenarios
const TEST_START_GAME = "Should start a new game";
const TEST_START_MULTIPLE_GAMES = "Should start multiple games with initial score";
const TEST_START_INVALID_TEAMS = "Should not start a game for invalid teams"
const TEST_START_INVALID_HOME_TEAM = "Should not start a game with an invalid home team";
const TEST_START_INVALID_AWAY_TEAM = "Should not start a game with an invalid away team";

const TEST_UPDATE_SCORE = "Should update the score";
const TEST_UPDATE_FOR_NON_EXIST_MATCH = "Should not update the score for non-exist match";
const TEST_UPDATE_FOR_NEGATIVE_MATCH_INDEX = "Should not update the score with a negative match index";
const TEST_UPDATE_FOR_OUT_MATCH_INDEX = "Should not update the score with an out-of-bounds match index";

const TESTS_OF_SCOREBOARD: string = "LiveScoreboard";

describe(TESTS_OF_SCOREBOARD, () => {
  let scoreboard: LiveScoreboard;

  beforeEach(() => {
    scoreboard = new LiveScoreboard();
  });

  //Tests for starting game

  it(TEST_START_GAME, () => {
    scoreboard.startGame("TeamA", "TeamB");
    const match = scoreboard.matches[0];
    expect(match).toBeDefined();
    expect(match.getSummary()).toBe("TeamA 0 - 0 TeamB");
  });

  it(TEST_START_MULTIPLE_GAMES, () => {
    scoreboard.startGame("TeamA", "TeamB");
    scoreboard.startGame("TeamC", "TeamD");

    const [match1, match2] = scoreboard.matches;

    expect(match1.getSummary()).toBe("TeamA 0 - 0 TeamB");
    expect(match2.getSummary()).toBe("TeamC 0 - 0 TeamD");
  });

  it(TEST_START_INVALID_HOME_TEAM, () => {
    scoreboard.startGame("", "TeamB");

    expect(scoreboard.matches).toHaveLength(0);
  });

  it(TEST_START_INVALID_AWAY_TEAM, () => {
    scoreboard.startGame("TeamA", "");

    expect(scoreboard.matches).toHaveLength(0);
  });

  it(TEST_START_INVALID_TEAMS, () => {
    scoreboard.startGame("", "");
    expect(scoreboard.matches).toHaveLength(0);
  });

  //Tests for updating score
  it(TEST_UPDATE_SCORE, () => {
    scoreboard.startGame("TeamA", "TeamB");
    scoreboard.updateScore(0, 2, 1);
    const match = scoreboard.matches[0];
    expect(match.getSummary()).toBe("TeamA 2 - 1 TeamB");
  });

  it(TEST_UPDATE_FOR_NON_EXIST_MATCH, () => {
    scoreboard.startGame("TeamA", "TeamB");
    scoreboard.updateScore(1, 2, 1);
    const [match] = scoreboard.matches;
    expect(match.getSummary()).toBe("TeamA 0 - 0 TeamB");
  });

  it(TEST_UPDATE_FOR_NEGATIVE_MATCH_INDEX, () => {
    scoreboard.startGame("TeamA", "TeamB");
    scoreboard.updateScore(-1, 2, 1);
    const [match] = scoreboard.matches;
    expect(match.getSummary()).toBe("TeamA 0 - 0 TeamB");
  });

  it(TEST_UPDATE_FOR_OUT_MATCH_INDEX, () => {
    scoreboard.startGame("TeamA", "TeamB");
    scoreboard.updateScore(2, 2, 1);
    const [match] = scoreboard.matches;
    expect(match.getSummary()).toBe("TeamA 0 - 0 TeamB");
  });

});
