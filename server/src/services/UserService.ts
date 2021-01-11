import { injectable, inject } from 'inversify';
import { stripBlacklistedProperties } from '../utilities/filter';
import TYPES from '../inversifyTypes';
import { User } from '../models/UserModel';
import { UserDTO, UserRepository } from '../repositories/UserRepository';

export interface UserService {
  toUser(userDTO: UserDTO): User;
  toUserDTO(user: User): UserDTO;
  createUser(
    username: string,
    password: string,
    salt: string,
    refreshToken: string
  ): Promise<User | null>;
  getUser(username: string): Promise<User | null>;
  userExists(username: string): Promise<boolean>;
  updateUser(user: Partial<UserDTO>): Promise<User | null>;
  scrub(user: User): void;
}

@injectable()
export class UserServiceImpl implements UserService {
  @inject(TYPES.UserRepository)
  private userRepository!: UserRepository;

  public toUser(userDTO: UserDTO) {
    return new User(
      userDTO.userID,
      userDTO.username,
      userDTO.password,
      userDTO.salt,
      userDTO.refreshToken
    );
  }

  public toUserDTO(user: User) {
    return {
      userID: user.getUserID(),
      username: user.getUsername(),
      password: user.getPassword(),
      salt: user.getSalt(),
      refreshToken: user.getRefreshToken(),
    } as UserDTO;
  }

  public async createUser(
    username: string,
    password: string,
    salt: string,
    refreshToken: string
  ) {
    const userWasCreated = await this.userRepository.create(
      username,
      password,
      salt,
      refreshToken
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

  public async updateUser(user: Partial<UserDTO>) {
    if (!user.userID) return null;

    const userID = await this.userRepository.update(user);

    if (!userID) return null;

    return this.toUser({ userID } as UserDTO);
  }

  public scrub(
    user: User
  ): Omit<UserDTO, 'password' | 'salt' | 'refreshToken'> {
    return stripBlacklistedProperties(this.toUserDTO(user), [
      'password',
      'salt',
      'refreshToken',
    ]);
  }
}
