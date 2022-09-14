import { Op } from 'sequelize';
import Teams from '../database/models/Teams.model';
import Matches from '../database/models/Matches.model';

export default class HomeLeaderboardService {
  static async getHomeLeaderboard() {
    const teams = await Teams.findAll();
    const leaderboard = await Promise.all(teams.map(async (team) => {
      const teamMatches = await Matches.findAll({ where: {
        [Op.and]: [{ homeTeam: team.id },
          { inProgress: false }] } });
      return {
        name: team.teamName,
        totalPoints: this.handlePoints(teamMatches),
        totalGames: teamMatches.length,
        totalVictories: this.handleVictories(teamMatches),
        totalDraws: this.handleDraws(teamMatches),
        totalLosses: this.handleLosses(teamMatches),
        goalsFavor: this.handleGoalsFavor(teamMatches),
        goalsOwn: this.handleGoalsOwn(teamMatches),
        goalsBalance: this.handleGoalsBalance(teamMatches),
        efficiency: this.handleEfficiency(teamMatches) };
    }));
    return leaderboard;
  }

  static handlePoints(matches: Array<Matches>) {
    let points = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
    });
    return points;
  }

  static handleVictories(matches: Array<Matches>) {
    let victories = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) victories += 1;
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

  static handleLosses(matches: Array<Matches>) {
    let losses = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  static handleGoalsFavor(matches: Array<Matches>) {
    let goals = 0;
    matches.forEach((match) => {
      goals += match.homeTeamGoals;
    });
    return goals;
  }

  static handleGoalsOwn(matches: Array<Matches>) {
    let goals = 0;
    matches.forEach((match) => {
      goals += match.awayTeamGoals;
    });
    return goals;
  }

  static handleGoalsBalance(matches: Array<Matches>) {
    return this.handleGoalsFavor(matches) - this.handleGoalsOwn(matches);
  }

  static handleEfficiency(matches: Array<Matches>) {
    const points = this.handlePoints(matches);
    const efficiency = points / (matches.length * 3);
    const percentage = efficiency * 100;
    return percentage.toFixed(2);
  }
}
