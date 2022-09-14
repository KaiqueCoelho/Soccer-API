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

describe('Testa a rota matches', () => {
  describe('Testa o endpoint /matches', () => {
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
      const teamMock: ITeam = {
        id: 1,
        teamName: 'nome-qualquer'
      };
      sinon.stub(Teams, 'findOne').resolves(teamMock as Teams)      
      sinon.stub(Matches, 'findAll').resolves(matchMock as unknown as Array<Matches>)
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
  describe('Testa o endpoint patch /matches/:id', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const matchBody = {
        homeTeamGoals: 3,
        awayTeamGoals: 1
      }
      sinon.stub(Matches, 'update').resolves();
      const response = await chai.request(app).patch('/matches/1')
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
  describe('Testa o endpoint patch /matches/:id/finish', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const response = await chai.request(app).patch('/matches/1/finish')
      sinon.stub(Matches, 'update').resolves();
      expect(response.status).to.eq(200)
      sinon.restore()
    })
  });
  
});

