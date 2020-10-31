import { injectable, inject } from 'inversify';
import TYPES from '../inversifyTypes';
import { User } from '../models/UserModel';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export interface UserService {
  createUser(
    username: string,
    password: string,
    salt: string
  ): Promise<User | null>;
  getUser(username: string): Promise<User | null>;
  userExists(username: string): Promise<boolean>;
}

@injectable()
export class UserServiceImpl implements UserService {
  @inject(TYPES.UserRepository)
  private userRepository!: UserRepository;

  private toUser(userDTO: UserDTO) {
    return new User(
      userDTO.userID,
      userDTO.username,
      userDTO.password,
      userDTO.salt
    );
  }

  public async createUser(username: string, password: string, salt: string) {
    const userWasCreated = await this.userRepository.create(
      username,
      password,
      salt
    );

    if (!userWasCreated) return null;

    return this.toUser(userWasCreated as UserDTO);
  }

  public async getUser(username: string): Promise<User | null> {
    const userDTO = await this.userRepository.read(username);

    if (!userDTO) return null;

    return this.toUser(userDTO);
  }

  public async userExists(username: string) {
    return this.userRepository.exists(username);
  }
}
