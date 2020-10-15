import { UserController } from './controllers/UserController';
import { RegistrableController } from './controllers/RegistrableController';
import { Container } from 'inversify';
import TYPES from './inversifyTypes';
import {
  UserRepository,
  UserRepositoryImpl,
} from './repositories/UserRepository';
import { UserService, UserServiceImpl } from './services/UserService';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

export default container;
