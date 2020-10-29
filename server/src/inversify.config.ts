import { UserController } from './controllers/UserController';
import { RegistrableController } from './controllers/RegistrableController';
import { Container } from 'inversify';
import TYPES from './inversifyTypes';
import {
  UserRepository,
  UserRepositoryImpl,
} from './repositories/UserRepository';
import { UserService, UserServiceImpl } from './services/UserService';
import { AuthService, AuthServiceImpl } from './services/AuthService';
import { AuthController } from './controllers/AuthController';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

container.bind<RegistrableController>(TYPES.Controller).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);

export default container;
