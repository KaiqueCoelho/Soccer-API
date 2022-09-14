import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import LoginService from '../services/loginService';
import throwCustomError from '../services/utils';

const secret = process.env.JWT_SECRET || 'randomsecret';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email: bodyEmail, password } = req.body;
    if (!bodyEmail || !password) {
      return throwCustomError('validationError', 'All fields must be filled');
    }
    const user = await LoginService.login(bodyEmail);
    if (!user) return throwCustomError('unauthorizedError', 'Incorrect email or password');
    const check = await bcrypt.compare(password, user.password);
    if (!check) return throwCustomError('unauthorizedError', 'Incorrect email or password');
    const { username, email, role, id } = user;
    const token = sign({ username, email, role, id }, secret);
    return res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const check = authorization?.split(' ')[0] === 'Bearer';
    const token = check ? authorization.split(' ')[1] : authorization as string;
    const role = await LoginService.validate(token, secret);
    return res.status(200).json({ role });
  }
}
