import { Application, Router } from 'express';
import { RegistrableController } from '../controllers/RegistrableController';
import { injectable, inject } from 'inversify';
import TYPES from '../inversifyTypes';
import { UserService } from 'services/UserService';
import { UserDTO } from 'models/UserModel';

@injectable()
export class UserController implements RegistrableController {
  @inject(TYPES.UserService)
  private userService!: UserService;

  public register(app: Application) {
    const route = Router();

    app.use('/user', route);

    route.get('/', async (req) => {
      const { username } = req.query as Partial<UserDTO>;

      if (username)
        console.log('controller: ', await this.userService.getUser(username));
    });
  }
}
