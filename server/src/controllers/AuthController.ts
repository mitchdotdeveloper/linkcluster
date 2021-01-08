import { Application, Router } from 'express';
import { RegistrableController } from '../controllers/RegistrableController';
import { inject, injectable } from 'inversify';
import TYPES from '../inversifyTypes';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

@injectable()
export class AuthController implements RegistrableController {
  @inject(TYPES.AuthService)
  private authService!: AuthService;

  @inject(TYPES.UserService)
  private userService!: UserService;

  public register(app: Application) {
    const authRouter = Router();

    app.use('/auth', authRouter);

    authRouter.post('/signup', async (req, res) => {
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

      const refreshToken = this.authService.generateRefreshToken();

      const user = await this.userService.createUser(
        username,
        hashedPassword,
        salt,
        refreshToken
      );

      if (!user) return res.sendStatus(500);

      res.status(201);

      return res.send({ username: user.getUsername() });
    });

    authRouter.post('/login', async (req, res) => {
      const { body } = req;
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

      const jwt = this.authService.signJWT(user.getUsername());

      res.setHeader('Authorization', `Bearer ${jwt}`);
      res.cookie('refreshtoken', user.getRefreshToken(), {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 1440,
      });
      res.status(200);

      return res.send(this.userService.scrub(user));
    });
  }
}
