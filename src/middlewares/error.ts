import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(505).json(err);
};

export default errorMiddleware;