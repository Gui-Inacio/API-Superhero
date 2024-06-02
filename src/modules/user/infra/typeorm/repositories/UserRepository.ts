/* eslint-disable prettier/prettier */
import { injectable } from 'tsyringe';

import { User } from '../entities/User';
import {
  UserSaveImput,
  IUserRepository,
  UserUpdateInput,
} from '../../../repositories/IUserRepository';

import { hashPassword } from '@/shared/util/Password';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';

@injectable()
export class UserRepository
  extends AbstractTransactionRepository<User>
  implements IUserRepository {
  constructor(protected transaction: TransactionManager) {
    super(transaction, User);
  }
  private readonly userRepository = AppDataSource.getRepository(User);

  async create(data: UserSaveImput) {
    const user = this.userRepository.create({
      ...data,
      password: hashPassword(data.password),
    });
    return await this.userRepository.save(user);
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updatePassword({ id, password }: UserUpdateInput) {
    await this.userRepository.update(
      { id },
      {
        password: hashPassword(password),
      },
    );
  }

  async userLogin(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });
  }
}
//comentario
