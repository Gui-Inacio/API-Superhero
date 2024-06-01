/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import { CreateUser } from '../dtos/CreateUserDTO';
import Conflict from '../../../shared/dtos/errors/conflict';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(data: CreateUser) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Conflict('O usuário ja existe.');
    }
    const createdUser = await this.userRepository.create(data);
    return omit(createdUser, ['password']);
  }
}
