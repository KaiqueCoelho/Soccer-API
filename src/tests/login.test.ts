import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import IUser from  '../interfaces/IUser'
import { app } from '../app';
import Users from '../database/models/Users.model';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'nome-aleatório',
  role: 'qualquer-role',
  email: 'email@email.com',
  password: 'senha',
}

describe('Testa a rota Login', () => {
  describe('Testa o endpoint /login', () => {
    it('Deve retornar status 200 com o token se as informações forem passadas corretamente', async () => {
      const loginBody = {  
        email: 'admin@admin.com',
        password: 'secret_admin'
      }
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(Users, 'findOne').resolves(userMock as Users)
      const response = await chai.request(app).post('/login').send(loginBody)
      expect(response.status).to.be.eq(200);
      expect(response.body).to.have.property('token')
      sinon.restore();
    });
    it('Deve retornar status 400 se a senha não for informada', async () => {
      const loginBody = {  
        email: 'admin@admin.com',
        password: ''
      }
      const response = await chai.request(app).post('/login').send(loginBody)
      expect(response.status).to.be.eq(400);
      sinon.restore();
    });
    it('Deve retornar status 401 se o usuário não existir', async () => {
      const loginBody = {  
        email: 'admin@admin.com',
        password: '123456'
      }
      sinon.stub(Users, 'findOne').resolves(undefined)
      const response = await chai.request(app).post('/login').send(loginBody)
      expect(response.status).to.be.eq(401);
      sinon.restore();
    });
    it('Deve retornar status 401 se o usuário for informado incorretamente', async () => {
      const loginBody = {  
        email: 'admin@admin.com',
        password: '123456'
      }
      sinon.stub(Users, 'findOne').resolves(userMock as Users)
      sinon.stub(bcrypt, 'compare').resolves(false);
      const response = await chai.request(app).post('/login').send(loginBody)
      expect(response.status).to.be.eq(401);
      sinon.restore();
    });
  });
  describe('Testa o endpoint /login/validate', () => {
    it('Deve retornar status 200 com a role se as informações forem passadas corretamente', async () => {
      const loginBody = {  
        email: 'admin@admin.com',
        password: '123456'
      }
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(Users, 'findOne').resolves(userMock as Users)
      const token = await (await chai.request(app).post('/login').send(loginBody)).body.token
      const response = await chai.request(app).get('/login/validate').auth(token, { type: 'bearer' })     
      expect(response.status).to.be.eq(200);
      expect(response.body).to.have.property('role');
      sinon.restore();
    });
    it('Deve retornar status 401 se o header não conter o token', async () => {
      sinon.stub(Users, 'findOne').resolves(userMock as Users)
      const response = await chai.request(app).get('/login/validate');     
      expect(response.status).to.be.eq(401);
      sinon.restore();
    });
  })
});
