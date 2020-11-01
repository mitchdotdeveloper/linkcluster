import { Container } from 'inversify';
import TYPES from './inversifyTypes';
import { RegistrableController } from './controllers/RegistrableController';
import { AuthController } from './controllers/AuthController';
import { AuthService, AuthServiceImpl } from './services/AuthService';
import { UserController } from './controllers/UserController';
import {
  UserRepository,
  UserRepositoryImpl,
} from './repositories/UserRepository';
import { UserService, UserServiceImpl } from './services/UserService';
import { LinkController } from './controllers/LinkController';
import {
  LinkRepository,
  LinkRepositoryImpl,
} from './repositories/LinkRepository';
import { LinkService, LinkServiceImpl } from './services/LinkService';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);

container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

container.bind<RegistrableController>(TYPES.Controller).to(LinkController);
container.bind<LinkService>(TYPES.LinkService).to(LinkServiceImpl);
container.bind<LinkRepository>(TYPES.LinkRepository).to(LinkRepositoryImpl);

export default container;
