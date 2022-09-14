import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches.model';
import IMatches from '../interfaces/IMatches';
import Teams from '../database/models/Teams.model';
import ITeam from '../interfaces/ITeam'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota leaderboard', () => {
  describe('Testa o endpoint /leaderboard', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const matchMock: Array<IMatches> = [
        {
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 1,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: 0,
        }
      ];
      const teamMock: Array<ITeam> = [{
        id: 1,
        teamName: 'nome-qualquer'
      }];
      sinon.stub(Teams, 'findAll').resolves(teamMock as Array<Teams>)      
      sinon.stub(Matches, 'findAll').resolves(matchMock as unknown as Array<Matches>)
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
  describe('Testa o endpoint /leaderboard/home', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const matchMock: Array<IMatches> = [
        {
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 1,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: 0,
        }
      ];
      const teamMock: Array<ITeam> = [{
        id: 1,
        teamName: 'nome-qualquer'
      }];
      sinon.stub(Teams, 'findAll').resolves(teamMock as Array<Teams>)      
      sinon.stub(Matches, 'findAll').resolves(matchMock as unknown as Array<Matches>)
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
  describe('Testa o endpoint /leaderboard/away', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const matchMock: Array<IMatches> = [
        {
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 1,
          awayTeam: 2,
          awayTeamGoals: 1,
          inProgress: 0,
        }
      ];
      const teamMock: Array<ITeam> = [{
        id: 1,
        teamName: 'nome-qualquer'
      }];
      sinon.stub(Teams, 'findAll').resolves(teamMock as Array<Teams>)      
      sinon.stub(Matches, 'findAll').resolves(matchMock as unknown as Array<Matches>)
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
});

