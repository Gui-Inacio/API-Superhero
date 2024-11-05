import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSuperPowerDTO } from '@/modules/superhero/dtos/CreateSuperPowerDTO';
import { CreateSuperPowerService } from '@/modules/superhero/services/superPowerServices/CreateSuperPowerService';
import { ListAllSuperPowerService } from '@/modules/superhero/services/superPowerServices/ListAllSuperPowerService';
import { FindSuperPowerByIdService } from '@/modules/superhero/services/superPowerServices/FindSuperPowerByIdService';
import NotFound from '@/shared/errors/notFound';
import { DeleteSuperPowerService } from '@/modules/superhero/services/superPowerServices/DeleteSuperPowerService';
import { UpdateSuperPowerDTO } from '@/modules/superhero/dtos/UpdateSuperPowerDTO';
import { UpdateSuperPowerService } from '@/modules/superhero/services/superPowerServices/UpdateSuperPowerService';

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
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteSuperPowerService = container.resolve(DeleteSuperPowerService);
    await deleteSuperPowerService.execute(id);
    return res
      .status(200)
      .json({ message: 'SuperPower excluido com sucesso!' });
  }
  public async update(req: Request, res: Response) {
    const requestValidated = new UpdateSuperPowerDTO({
      id: req.params.id,
      ...req.body,
    });
    const updateSuperPowerService = container.resolve(UpdateSuperPowerService);
    const superpower = await updateSuperPowerService.execute(
      requestValidated.getAll(),
    );
    return res.json(superpower);
  }
}
