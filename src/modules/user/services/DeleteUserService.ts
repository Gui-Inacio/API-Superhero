/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}

export default DeleteUserService;
