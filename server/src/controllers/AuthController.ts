import { Application, Request, Router } from 'express';
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
    const route = Router();

    app.use('/auth', route);

    route.post('/signup', async (req: Request, res) => {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      if (username && password) {
        const userExists = await this.userService.userExists(username);
        console.log(userExists);
        if (!userExists) {
          const {
            hashedPassword,
            salt,
          } = await this.authService.hashAndSaltPassword(password);

          console.log(hashedPassword, salt);

          const user = await this.userService.createUser(
            username,
            hashedPassword,
            salt
          );

          console.log('AuthController: ', user);

          if (user) {
            res.status(201).send({ username: user.getUsername() });
          } else {
            res.sendStatus(500);
          }
        } else {
          res.sendStatus(409);
        }
      } else {
        res.sendStatus(400);
      }
    });
  }
}
