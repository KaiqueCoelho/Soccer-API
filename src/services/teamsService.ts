import Teams from '../database/models/Teams.model';

export default class TeamsService {
  static async getAll() {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getById(id: string) {
    const team = await Teams.findByPk(id);
    return team;
  }
}
