import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LoginService } from '@/modules/authentication/services/Login';
import { LoginDTO } from '@/modules/authentication/dtos/LoginDTO';

const sessions: { [key: string]: boolean } = {};

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
  async logout(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return response
        .status(401)
        .json({ message: 'Authorization header is missing' });
    }

    const JwtToken = authHeader.split(' ')[1];
    console.log(JwtToken);
    if (!JwtToken) {
      return response.status(401).json({ message: 'Token is missing' });
    }

    // Invalida o token adicionando-o à lista de sessões (blacklist)
    sessions[JwtToken] = false;
    console.log(JwtToken);
    return response.status(204).send('Logout feito com sucesso!'); // No Content
  }
  async teste(request: Request, response: Response): Promise<Response> {
    //const authHeader = request.headers['authorization'];
    console.log('Deu certo');

    return response.status(204).send(); // No Content
  }
}
