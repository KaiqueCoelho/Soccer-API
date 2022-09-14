import AddMatch from '../interfaces/AddMatch';
import Matches from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';
import UpdateScore from '../interfaces/UpdateScore';

export default class MatchesService {
  static async getAll() {
    const teams = await Matches.findAll({ raw: true });
    const teamNames = await Promise.all(teams.map(async (team) => {
      const homeTeam = await Teams.findByPk(team.homeTeam);
      const awayTeam = await Teams.findByPk(team.awayTeam);
      const obj = {
        ...team,
        teamHome: {
          teamName: homeTeam?.teamName,
        },
        teamAway: {
          teamName: awayTeam?.teamName,
        },
      };
      return obj;
    }));
    return teamNames;
  }

  static async add(body: AddMatch) {
    const match = await Matches.create({ ...body, inProgress: true });
    return match;
  }

  static async endMatch(id: string) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }

  static async updateScore(id: string, body: UpdateScore) {
    await Matches.update(body, { where: { id } });
  }
}
