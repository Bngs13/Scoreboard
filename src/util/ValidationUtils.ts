export function isValidTeamName(teamName: string): boolean {
    return teamName.trim() !== ""; // Simple validation: non-empty after trimming whitespace
  }
  
  export function isValidMatchIndex(matchIndex: number, matchesLength: number): boolean {
    return matchIndex >= 0 && matchIndex < matchesLength;
  }
  