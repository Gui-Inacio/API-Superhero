/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../repositories/IUserRepository';
//import { omit } from '../../../shared/util/Omit';
import Conflict from '../../../shared/errors/conflict';

import { FindUserByIdService } from './FindByIdService';

import { UpdateUser } from '@/modules/authentication/dtos/UpdateUserDTO';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly findByIdUserService: FindUserByIdService,
  ) {}

  async execute(data: UpdateUser) {
    const user = await this.findByIdUserService.execute(data.id);
    if (!user) {
      throw new Error('User not found');
    }

    const checkEmailExists = await this.userRepository.findByEmailAndNotId(
      data.email,
      user.id,
    );
    if (checkEmailExists) {
      throw new Conflict('Email já existe');
    }
    const checkCpfExists = await this.userRepository.findByCpfAndNotId(
      data.cpf,
      user.id,
    );
    if (checkCpfExists) {
      throw new Conflict('Cpf já existe');
    }

    await this.userRepository.update({
      id: user.id,
      name: data.name,
      cpf: data.cpf,
      email: data.email,
    });
    const updatedUser = await this.findByIdUserService.execute(user.id);
    return updatedUser;
  }
}
