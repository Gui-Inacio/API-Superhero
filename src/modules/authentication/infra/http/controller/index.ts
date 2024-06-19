import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LoginService } from '@/modules/authentication/services/Login';
import { LoginDTO } from '@/modules/authentication/dtos/LoginDTO';

export class AuthenticationController {
  async login(request: Request, response: Response) {
    const { password, email } = new LoginDTO(request.body).getAll();

    const loginService = container.resolve(LoginService);

    const token = await loginService.execute({
      password,
      email,
    });

    return response.json(token);
  }
}
