import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserDTO } from '@/modules/authentication/dtos/UpdateUserDTO';
import { UpdateUserService } from '@/modules/user/services/UpdateUserService';
import { LoginService } from '@/modules/authentication/services/Login';
import { LoginDTO } from '@/modules/authentication/dtos/LoginDTO';
import { ResetPasswordDTO } from '@/modules/authentication/dtos/ResetPasswordDTO';
import { ResetPasswordService } from '@/modules/authentication/services/resetPassword';
import BadRequest from '@/shared/errors/badRequest';
import DeleteUserService from '@/modules/user/services/DeleteUserService';

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

    if (!JwtToken) {
      return response.status(401).json({ message: 'Token is missing' });
    }

    // Invalida o token adicionando-o à lista de sessões (blacklist)
    sessions[JwtToken] = false;

    return response.status(204).send('Logout feito com sucesso!'); // No Content
  }

  async resetPassword(request: Request, response: Response) {
    const requestValidated = new ResetPasswordDTO({
      ...request.body,
      ...response.locals,
    });

    const resetPasswordService = container.resolve(ResetPasswordService);

    const mensagem = await resetPasswordService.execute(
      requestValidated.getAll(),
    );

    return response.json(mensagem);
  }

  async teste(request: Request, response: Response): Promise<Response> {
    //const authHeader = request.headers['authorization'];
    console.log('Deu certo');

    return response.status(204).send(); // No Content
  }

  async updateUser(request: Request, response: Response) {
    const requestValidated = new UpdateUserDTO({
      id: request.params.id,
      ...request.body,
    });

    const { UserId } = response.locals;
    if (UserId) {
      throw new BadRequest('Id nao existe!');
    }
    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute(requestValidated.getAll());

    return response.json(user);
  }
  async delete(request: Request, response: Response) {
    // Validando a solicitação
    const id = request.params.id;
    const deleteUserService = container.resolve(DeleteUserService);

    // Executando o serviço de exclusão
    await deleteUserService.execute(id);

    // Retornando uma resposta de sucesso
    return response
      .status(200)
      .json({ mensage: 'Usuário excluido com sucesso' });
  }
}
