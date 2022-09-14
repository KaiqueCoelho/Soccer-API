import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Matches;
