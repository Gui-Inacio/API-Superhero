import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { container } from '../../../../../shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { FindUserByIdService } from '../../../services/FindByIdService';
import NotFound from '../../../../../shared/errors/notFound';
export default class UsersController {
  public async createUser(req: Request, res: Response) {
    const requestValidated = new CreateUserDTO(req.body);
    const addUserService = container.resolve(CreateUserService);
    const createdUser = await addUserService.execute(requestValidated.getAll());

    return res.status(201).json(createdUser);
  }
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findUserByIdService = container.resolve(FindUserByIdService);

    try {
      const user = await findUserByIdService.execute(id);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
