import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const response = await TeamsService.getAll();
    return res.status(200).json(response);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await TeamsService.getById(id);
    return res.status(200).json(response);
  }
}
