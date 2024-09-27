import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateRaceDTO } from '@/modules/superhero/dtos/CreateRaceDTO';
import { CreateRaceService } from '@/modules/superhero/services/raceServices/CreateRaceService';
import { FindRaceByIdService } from '@/modules/superhero/services/raceServices/FindRaceByIdService';
import NotFound from '@/shared/errors/notFound';
import { ListAllRaceService } from '@/modules/superhero/services/raceServices/ListAllRaceService';
import DeleteRaceService from '@/modules/superhero/services/raceServices/DeleteRaceService';
import { UpdateRaceDTO } from '@/modules/superhero/dtos/UpdateRaceDTO';
import { UpdateRaceService } from '@/modules/superhero/services/raceServices/UpdateRaceService';

export default class RaceController {
  public async createRace(req: Request, res: Response) {
    const requestValidated = new CreateRaceDTO(req.body);
    const addRaceService = container.resolve(CreateRaceService);
    const createdRace = await addRaceService.execute(requestValidated.getAll());

    return res.status(201).json(createdRace);
  }
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findRaceByIdService = container.resolve(FindRaceByIdService);
    try {
      const race = await findRaceByIdService.execute(id);
      return res.status(200).json(race);
    } catch (error) {
      if (error instanceof NotFound) {
        throw new NotFound('Race not found!');
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async listAll(req: Request, res: Response) {
    const listAllService = container.resolve(ListAllRaceService);
    const race = await listAllService.execute();
    return res.status(200).json(race);
  }
  public async update(req: Request, res: Response) {
    const requestValidated = new UpdateRaceDTO({
      id: req.params.id,
      ...req.body,
    });
    const updateRaceService = container.resolve(UpdateRaceService);
    const race = await updateRaceService.execute(requestValidated.getAll());
    return res.json(race);
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id;
    const deleteService = container.resolve(DeleteRaceService);
    await deleteService.execute(id);

    return res.status(200).json({ mensage: 'Race excluido com sucesso!' });
  }
}
