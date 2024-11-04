import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperPowerDTO } from '@/modules/superhero/dtos/CreateSuperPowerDTO';
import { CreateSuperPowerService } from '@/modules/superhero/services/superPowerServices/CreateSuperPowerService';
import { ListAllSuperPowerService } from '@/modules/superhero/services/superPowerServices/ListAllSuperPowerService';
import { FindSuperPowerByIdService } from '@/modules/superhero/services/superPowerServices/FindSuperPowerByIdService';
import NotFound from '@/shared/errors/notFound';

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
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findSuperPowerByIdService = container.resolve(
      FindSuperPowerByIdService,
    );
    const superPower = await findSuperPowerByIdService.execute(id);
    if (!superPower) {
      throw new NotFound('Superpower not found!');
    }
    return res.status(200).json(superPower);
  }
}
