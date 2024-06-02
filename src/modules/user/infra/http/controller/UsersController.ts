import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { container } from '../../../../../shared/container/providers/transaction-menager/ContainerResolveTransaction';
export default class UsersController {
  public async createUser(req: Request, res: Response) {
    const requestValidated = new CreateUserDTO(req.body);
    const addUserService = container.resolve(CreateUserService);
    const createdUser = await addUserService.execute(requestValidated.getAll());

    return res.status(201).json(createdUser);
  }
}
