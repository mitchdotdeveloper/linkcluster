import type { NextFunction, Request, Response } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session, sessionID } = req;

  if (!session || !sessionID || !session.loggedIn) return res.sendStatus(403);

  next();
};
