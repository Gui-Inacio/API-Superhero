import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import { User } from '../entities/User';
import {
  UserSaveImput,
  IUserRepository,
  UserUpdateInput,
} from '../../../repositories/IUserRepository';

import { hashPassword } from '@/shared/util/Password';
import { AppDataSource } from '@/shared/infra/typeorm';

@injectable()
export class UserRepository {
  private readonly userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async create(data: UserSaveImput) {
    const user = this.userRepository.create({
      ...data,
      password: hashPassword(data.password),
    });
    return await this.userRepository.save(user);
  }
}
