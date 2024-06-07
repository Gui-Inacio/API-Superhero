import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { container } from '../../../../../shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { FindUserByIdService } from '../../../services/FindByIdService';
import { FindUserByEmailService } from '../../../services/FindByEmail';
import { ListAllUserService } from '../../../services/ListAllService';
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
  public async findByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const findUserByEmailService = container.resolve(FindUserByEmailService);
    console.log(email);

    try {
      const user = await findUserByEmailService.execute(email);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllUserService = container.resolve(ListAllUserService);

    try {
      const user = await listAllUserService.execute();
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
