/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import Conflict from '../../../shared/errors/conflict';

@injectable()
export class FindUserByEmailService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Conflict("User not found! Email don't exists!.");
    }

    return omit(user, ['password']);
  }
}
