/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import Conflict from '../../../shared/errors/conflict';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Conflict('User not found!.');
    }

    return omit(user, ['password']);
  }
}
