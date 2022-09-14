import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import throwCustomError from '../services/utils';

const secret = process.env.JWT_SECRET || 'randomsecret';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  try {
    verify(token, secret);
  } catch (error) {
    throwCustomError('unauthorizedError', 'Token must be a valid token');
  }
  next();
};

export default tokenValidation;
