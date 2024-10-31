import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperPowerDTO } from '@/modules/superhero/dtos/CreateSuperPowerDTO';
import { CreateSuperPowerService } from '@/modules/superhero/services/superPowerServices/CreateSuperPowerService';
import { ListAllSuperPowerService } from '@/modules/superhero/services/superPowerServices/ListAllSuperPowerService';

export default class SuperPowerController {
  public async createSuperPower(req: Request, res: Response) {
    const requestValidated = new CreateSuperPowerDTO(req.body);
    const addSuperPowerService = container.resolve(CreateSuperPowerService);
    const createdSuperPower = await addSuperPowerService.execute(
      requestValidated.getAll(),
    );

    return res.status(201).json(createdSuperPower);
  }
  public async listAll(req: Request, res: Response) {
    const listAllService = container.resolve(ListAllSuperPowerService);
    const superPower = await listAllService.execute();
    return res.status(200).json(superPower);
  }
}
