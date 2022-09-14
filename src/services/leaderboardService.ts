import { Op } from 'sequelize';
import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';

export default class LeaderboardService {
  static async getLeaderboard() {
    const teams = await Teams.findAll();
    const leaderboard = await Promise.all(teams.map(async (team) => {
      const teamMatches = await Matches.findAll({ where: {
        [Op.and]: [{ [Op.or]: [{ homeTeam: team.id }, { awayTeam: team.id }] },
          { inProgress: false }] } });
      return {
        name: team.teamName,
        totalPoints: this.handlePoints(teamMatches, team.id),
        totalGames: teamMatches.length,
        totalVictories: this.handleVictories(teamMatches, team.id),
        totalDraws: this.handleDraws(teamMatches),
        totalLosses: this.handleLosses(teamMatches, team.id),
        goalsFavor: this.handleGoalsFavor(teamMatches, team.id),
        goalsOwn: this.handleGoalsOwn(teamMatches, team.id),
        goalsBalance: this.handleGoalsBalance(teamMatches, team.id),
        efficiency: this.handleEfficiency(teamMatches, team.id) };
    }));
    return leaderboard;
  }

  static handlePoints(matches: Array<Matches>, id: number) {
    let points = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) points += 3;
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) points += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
    });
    return points;
  }

  static handleVictories(matches: Array<Matches>, id: number) {
    let victories = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) victories += 1;
      if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) victories += 1;
    });
    return victories;
  }

  static handleDraws(matches: Array<Matches>) {
    let draws = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    });
    return draws;
  }

  static handleLosses(matches: Array<Matches>, id: number) {
    let losses = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) losses += 1;
      if (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals) losses += 1;
    });
    return losses;
  }

  static handleGoalsFavor(matches: Array<Matches>, id: number) {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goals += match.homeTeamGoals;
      if (match.awayTeam === id) goals += match.awayTeamGoals;
    });
    return goals;
  }

  static handleGoalsOwn(matches: Array<Matches>, id: number) {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeam === id) goals += match.awayTeamGoals;
      if (match.awayTeam === id) goals += match.homeTeamGoals;
    });
    return goals;
  }

  static handleGoalsBalance(matches: Array<Matches>, id: number) {
    return this.handleGoalsFavor(matches, id) - this.handleGoalsOwn(matches, id);
  }

  static handleEfficiency(matches: Array<Matches>, id: number) {
    const points = this.handlePoints(matches, id);
    const efficiency = points / (matches.length * 3);
    const percentage = efficiency * 100;
    return percentage.toFixed(2);
  }
}
