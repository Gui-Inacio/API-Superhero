/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import { CreateUser } from '../dtos/CreateUserDTO';
import Conflict from '../../../shared/errors/conflict';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUser) {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email,
    );
    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if (emailAlreadyExists || cpfAlreadyExists) {
      throw new Conflict(
        'O usuário ja existe. Email ou CPF já estão sendo utilizados!',
      );
    }
    const createdUser = await this.userRepository.create(data);
    return omit(createdUser, ['password']);
  }
}
