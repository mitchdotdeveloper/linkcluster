import type { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerAuthHeader = req.headers.authorization;

  if (!bearerAuthHeader?.startsWith('Bearer ')) return res.sendStatus(403);

  const token = bearerAuthHeader.slice(7);

  if (!token) return res.sendStatus(403);

  verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) return res.sendStatus(403);

    next();
  });
};
