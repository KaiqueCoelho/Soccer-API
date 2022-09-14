import { Request, Response } from 'express';
import throwCustomError from '../services/utils';
import MatchesService from '../services/matchesService';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const response = await MatchesService.getAll();
    return res.status(200).json(response);
  }

  static async add(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return throwCustomError(
        'unauthorizedError',
        'It is not possible to create a match with two equal teams',
      );
    }
    const checkHome = await TeamsService.getById(homeTeam);
    const checkAway = await TeamsService.getById(awayTeam);
    if (!checkAway || !checkHome) {
      return throwCustomError('notFoundError', 'There is no team with such id!');
    }
    const response = await MatchesService.add(req.body);
    return res.status(201).json(response);
  }

  static async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.endMatch(id);
    return res.status(200).json({ message: 'Finished' });
  }

  static async updateScore(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.updateScore(id, req.body);
    return res.status(200).json({ message: 'Scores have been updated!' });
  }
}
