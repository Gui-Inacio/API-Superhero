import { Request, Response } from 'express';

import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { resolve } from 'path';
// export const createUser = (req: Request, res: Response) => {
//   console.log(req.body);

//   return res.send('rota ta indo!');
// };

export default class UsersController {
  public async createUser(req: Request, res: Response) {
    const requestValidated = new CreateUserDTO(req.body);
    const addUserService = new AddUserService();
    );
    // const addUserService = container.resolve(CreateUserService)
  }
}
