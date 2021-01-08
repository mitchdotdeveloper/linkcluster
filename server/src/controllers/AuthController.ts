import { Application, Router } from 'express';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
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

      const refreshToken = v4();
      const user = await this.userService.createUser(
        username,
        hashedPassword,
        salt,
        refreshToken
      );

      if (!user) return res.sendStatus(500);

      return res.status(201).send({ username: user.getUsername() });
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

      const jwt = sign(
        { username: user.getUsername() },
        process.env.JWT_SECRET!,
        {
          algorithm: 'HS256',
          // expiresIn: '1 day',
        }
      );
      res.setHeader('Authorization', `Bearer ${jwt}`);
      return res
        .cookie('refreshtoken', user.getRefreshToken(), {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 1440,
        })
        .status(200)
        .send(this.userService.scrub(user));
    });
  }
}
