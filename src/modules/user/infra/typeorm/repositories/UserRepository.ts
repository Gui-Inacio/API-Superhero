/* eslint-disable prettier/prettier */
import { injectable } from 'tsyringe';
import { Not } from 'typeorm';

import { User } from '../entities/User';
import {
  UserSaveImput,
  IUserRepository,
  UserUpdateInput,
  UserUpdate,
} from '../../../repositories/IUserRepository';

import { hashPassword } from '@/shared/util/Password';
import { AppDataSource } from '@/shared/infra/typeorm';
import { TransactionManager } from '@/shared/container/providers/transaction-menager/TransactionManager';
import { AbstractTransactionRepository } from '@/shared/container/providers/transaction-menager/AbstractTransactionRepository';

@injectable()
export class UserRepository
  extends AbstractTransactionRepository<User>
  implements IUserRepository
{
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

  async findByCpf(cpf: string) {
    return await this.userRepository.findOne({ where: { cpf } });
  }

  async listAll() {
    return await this.userRepository.find();
  }

  async updatePassword({ id, password }: UserUpdateInput) {
    await this.userRepository.update(
      { id },
      {
        password: hashPassword(password),
      },
    );
  }

  async update(data: UserUpdate) {
    await this.userRepository.update(
      { id: data.id },
      {
        ...data,
      },
    );
  }
  async findByEmailAndNotId(email: string, id: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        id: Not(id),
      },
    });
  }
  async findByCpfAndNotId(cpf: string, id: string) {
    return await this.userRepository.findOne({
      where: {
        cpf,
        id: Not(id),
      },
    });
  }
  async userLogin(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });
  }
  async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
