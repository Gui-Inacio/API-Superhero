import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateSuperHeroDTO } from '@/modules/superhero/dtos/CreateSuperHeroDTO';
import { CreateSuperHeroService } from '@/modules/superhero/services/superHeroServices/CreateSuperHeroService';
import { ListAllSuperHeroService } from '@/modules/superhero/services/superHeroServices/ListAllSuperHeroService';
import { FindSuperHeroByIdService } from '@/modules/superhero/services/superHeroServices/FindSuperHeroByIdService';
import NotFound from '@/shared/errors/notFound';
import { DeleteSuperHeroService } from '@/modules/superhero/services/superHeroServices/DeleteSuperHeroService';

export default class SuperHeroController {
  public async create(req: Request, res: Response) {
    const requestValidated = new CreateSuperHeroDTO(req.body);
    const addSuperHeroService = container.resolve(CreateSuperHeroService);
    const createdSuperHero = await addSuperHeroService.execute(
      requestValidated.getAll(),
    );
    return res.status(200).json(createdSuperHero);
  }
  public async listAll(req: Request, res: Response) {
    const listAllService = container.resolve(ListAllSuperHeroService);
    const superHero = await listAllService.execute();
    return res.status(200).json(superHero);
  }
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findById = container.resolve(FindSuperHeroByIdService);
    const superhero = await findById.execute(id);
    if (!superhero) {
      throw new NotFound('Superhero not found!');
    }
    return res.status(200).json(superhero);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteSuperHeroService = container.resolve(DeleteSuperHeroService);
    await deleteSuperHeroService.execute(id);
    return res.status(200).json({ message: 'Superhero succesfully removed' });
  }
}
