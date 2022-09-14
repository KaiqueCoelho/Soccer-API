import { Response, Request, NextFunction } from 'express';

const errors: { [errorName: string]: number } = {
  validationError: 400,
  unauthorizedError: 401,
  notFoundError: 404,
  unprocessableEntityError: 422,
};

const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[error.name];
  return res.status(status).json({ message: error.message });
};

export default errorHandlerMiddleware;
