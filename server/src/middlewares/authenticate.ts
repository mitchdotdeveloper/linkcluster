import type { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerAuthHeader = req.headers.authorization;

  if (!bearerAuthHeader?.startsWith('Bearer ')) return res.sendStatus(400);

  const token = bearerAuthHeader.slice(7);

  if (!token) return res.sendStatus(400);

  verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) return res.sendStatus(403);

    next();
  });
};

export const authenticateJWTRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerAuthHeader = req.headers.authorization;
  const refreshTokenCookie = req.headers.cookie;

  if (
    !bearerAuthHeader?.startsWith('Bearer ') ||
    !refreshTokenCookie?.startsWith('refreshtoken=')
  )
    return res.sendStatus(400);

  const token = bearerAuthHeader.slice(7);
  const refreshToken = refreshTokenCookie.slice(13);

  if (!token || !refreshToken) return res.sendStatus(400);

  verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if ((err && !(err instanceof TokenExpiredError)) || !decoded)
      return res.sendStatus(403);

    next();
  });
};
