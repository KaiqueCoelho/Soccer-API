import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import HomeLeaderboardService from '../services/homeLeaderboardService';
import AwayLeaderboardService from '../services/awayLeaderboardService';

export default class TeamsController {
  static async getLeaderboard(req: Request, res: Response) {
    const response = await LeaderboardService.getLeaderboard();
    const sort = response.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
    return res.status(200).json(sort);
  }

  static async getHomeLeaderboard(req: Request, res: Response) {
    const response = await HomeLeaderboardService.getHomeLeaderboard();
    const sort = response.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
    return res.status(200).json(sort);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const response = await AwayLeaderboardService.getAwayLeaderboard();
    const sort = response.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
    return res.status(200).json(sort);
  }
}
