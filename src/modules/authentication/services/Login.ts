/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { createToken } from './menageToken';

import type { LoginData } from '@/modules/authentication/dtos/LoginDTO';
import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import BadRequest from '@/shared/errors/badRequest';
import { comparePassword } from '@/shared/util/Password';

@injectable()
export class LoginService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute({ email, password }: LoginData) {
    const user = await this.userRepository.userLogin(email);
    if (!user) {
      throw new BadRequest('Email ou senha incorreto.');
    }
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new BadRequest('Email ou senha incorreto.');
    }

    const token = createToken({
      email: user.email,
      name: user.name,
      sub: user.id,
    });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
        userId: user.id,
      },
    };
  }
}
