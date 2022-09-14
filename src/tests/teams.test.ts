import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams.model';
import ITeam from '../interfaces/ITeam'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota teams', () => {
  describe('Testa o endpoint /teams', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      sinon.stub(Teams, 'findAll').resolves([])
      const response = await chai.request(app).get('/teams')
      expect(response.status).to.eq(200)
      sinon.restore();
    })
  });
  describe('Testa o endpoint /teams/:id', () => {
    it('Deve retornar o status 200 se tudo ocorrer corretamente', async () => {
      const teamMock: ITeam = {
        id: 1,
        teamName: 'nome-qualquer'
      };
      sinon.stub(Teams, 'findByPk').resolves(teamMock as Teams)
      const response = await chai.request(app).get('/teams/1')
      expect(response.status).to.eq(200)
      sinon.restore();
    })    
  })
});

