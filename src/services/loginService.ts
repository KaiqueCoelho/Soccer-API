import { verify } from 'jsonwebtoken';
import Validate from '../interfaces/validateInterface';
import Users from '../database/models/Users.model';
import throwCustomError from './utils';

export default class LoginService {
  static async login(email: string) {
    const user = await Users.findOne({ where: { email }, raw: true });
    return user;
  }

  static async validate(data: string, secret: string) {
    try {
      const { email } = verify(data, secret) as Validate;
      const user = await Users.findOne({ where: { email }, raw: true });
      if (!user) return throwCustomError('notFoundError', 'user not found');
      return user.role;
    } catch (error) {
      return throwCustomError('unauthorizedError', 'invalid token');
    }
  }
}
