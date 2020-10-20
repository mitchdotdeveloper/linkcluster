import { injectable, inject } from 'inversify';
import TYPES from '../inversifyTypes';
import { User, UserDTO } from '../models/UserModel';
import { UserRepository } from '../repositories/UserRepository';

export interface UserService {
  getUser(username: string): Promise<User | null>;
}

@injectable()
export class UserServiceImpl implements UserService {
  @inject(TYPES.UserRepository)
  private userRepository!: UserRepository;

  private toUser(userDTO: UserDTO): User {
    return new User(userDTO.username);
  }

  public async getUser(username: string): Promise<User | null> {
    const userDTO = await this.userRepository.read(username);

    if (!userDTO) return null;

    return this.toUser(userDTO);
  }
}
