/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
import { omit } from '../../../shared/util/Omit';
import Conflict from '../../../shared/errors/conflict';

@injectable()
export class ListAllUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute() {
    const user = await this.userRepository.listAll();

    if (!user) {
      throw new Conflict("No Users registered yet!");
    }

    if (Array.isArray(user)) {
      return user.map(u => omit(u, ['password']));
    } else {
      return omit(user, ['password']);
    }

  }
}
