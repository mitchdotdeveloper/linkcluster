import { Application, Router } from 'express';
import { RegistrableController } from '../controllers/RegistrableController';
import { inject, injectable } from 'inversify';
import TYPES from '../inversifyTypes';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { stripSensitiveProperties } from '../utilities/filter';

@injectable()
export class AuthController implements RegistrableController {
  @inject(TYPES.AuthService)
  private authService!: AuthService;

  @inject(TYPES.UserService)
  private userService!: UserService;

  public register(app: Application) {
    const route = Router();

    app.use('/auth', route);

    route.post('/signup', async (req, res) => {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      if (!username || !password) return res.sendStatus(400);

      const userAlreadyExists = await this.userService.userExists(username);

      if (userAlreadyExists) return res.sendStatus(409);

      const {
        hashedPassword,
        salt,
      } = await this.authService.hashAndSaltPassword(password);

      const user = await this.userService.createUser(
        username,
        hashedPassword,
        salt
      );

      if (!user) return res.sendStatus(500);

      return res.status(201).send({ username: user.getUsername() });
    });

    route.post('/login', async (req, res) => {
      const { session, body } = req;
      const { username, password } = body as {
        username: string;
        password: string;
      };

      if (!username || !password) return res.sendStatus(400);

      const user = await this.userService.getUser(username);

      if (!user) return res.sendStatus(404);

      const { hashedPassword } = await this.authService.hashAndSaltPassword(
        password,
        user.getSalt()
      );

      if (hashedPassword !== user.getPassword()) return res.sendStatus(403);

      if (session) session.loggedIn = true;
      return res.status(200).send(stripSensitiveProperties(user));
    });

    route.delete('/logout', async (req, res) => {
      const { session, sessionID } = req;
      if (!session || !sessionID) return res.sendStatus(400);

      session.loggedIn = false;
      session.destroy((err) => {
        if (err) return res.sendStatus(500);

        res.clearCookie('sessionId');
        res.sendStatus(200);
      });
    });
  }
}
