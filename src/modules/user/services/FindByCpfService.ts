/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import Conflict from '../../../shared/errors/conflict';

@injectable()
export class FindUserByCpfService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(cpf: string) {
    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      throw new Conflict("User not found! Cpf don't exists!.");
    }

    return omit(user, ['password']);
  }
}
