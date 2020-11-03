import { Application, Router } from 'express';
import type { RegistrableController } from '../controllers/RegistrableController';
import { injectable, inject } from 'inversify';
import TYPES from '../inversifyTypes';
import type { UserService } from 'services/UserService';
import type { UserDTO } from 'repositories/UserRepository';
import { stripSensitiveProperties } from '../utilities/filter';
import { authenticate } from '../middlewares/authenticate';

@injectable()
export class UserController implements RegistrableController {
  @inject(TYPES.UserService)
  private userService!: UserService;

  public register(app: Application) {
    const userRouter = Router();

    app.use('/user', userRouter);

    userRouter.get('/', authenticate, async (req, res) => {
      const { username } = req.query as Pick<UserDTO, 'username'>;

      if (!username) return res.sendStatus(400);

      const user = await this.userService.getUser(username);

      if (!user) return res.sendStatus(404);

      return res.status(200).send(stripSensitiveProperties(user));
    });
  }
}
