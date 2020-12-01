import { Application, Router } from 'express';
import type { RegistrableController } from '../controllers/RegistrableController';
import { injectable, inject } from 'inversify';
import TYPES from '../inversifyTypes';
import type { UserService } from 'services/UserService';
import { authenticate } from '../middlewares/authenticate';

@injectable()
export class UserController implements RegistrableController {
  @inject(TYPES.UserService)
  private userService!: UserService;

  public register(app: Application) {
    const usersRouter = Router();

    app.use('/users', usersRouter);

    usersRouter.get('/:username', authenticate, async (req, res) => {
      const { username } = req.params;

      if (!username) return res.sendStatus(400);

      const user = await this.userService.getUser(username);

      if (!user) return res.sendStatus(404);

      return res.status(200).send(this.userService.scrub(user));
    });
  }
}
