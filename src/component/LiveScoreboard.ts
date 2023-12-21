import { LiveMatch } from "../model/LiveMatch";
import { isValidMatchIndex, isValidTeamName } from "../util/ValidationUtils";

export class LiveScoreboard {
  public matches: LiveMatch[] = [];

  startGame(homeTeam: string, awayTeam: string): void {
    if (isValidTeamName(homeTeam) && isValidTeamName(awayTeam)) {
      const match = new LiveMatch(homeTeam, awayTeam);
      this.matches.push(match);
    } else {
      console.error("Please provide non-empty names for both home and away teams");
    }
  }

  updateScore(matchIndex: number, homeScore: number, awayScore: number): void {
    if (isValidMatchIndex(matchIndex, this.matches.length)) {
      this.matches[matchIndex].updateScore(homeScore, awayScore);
    }
  }

  finishGame(matchIndex: number): void {
    if (isValidMatchIndex(matchIndex, this.matches.length)) {
      this.matches.splice(matchIndex, 1);
    }
  }

  getSummary(): string[] {
    const sortedMatches = this.matches.sort((a, b) => {
      const totalScoreDiff = b.getTotalScore() - a.getTotalScore();
      if (totalScoreDiff !== 0) {
        return totalScoreDiff;
      }
      return this.matches.indexOf(b) - this.matches.indexOf(a);
    });
    return sortedMatches.map(match => match.getSummary());
  }
}
