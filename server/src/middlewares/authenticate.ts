import { NextFunction, Request, Response } from 'express';
import { UserService } from 'services/UserService';
import container from '../inversify.config';
import TYPES from '../inversifyTypes';

export const authenticate = async (
  req: Request & { username: string },
  res: Response,
  next: NextFunction
) => {
  const { session, sessionID, username } = req;
  if (session && sessionID && username) {
    const userService: UserService = container.get<UserService>(
      TYPES.UserService
    );

    const userExists = await userService.userExists(username);

    if (userExists) {
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
