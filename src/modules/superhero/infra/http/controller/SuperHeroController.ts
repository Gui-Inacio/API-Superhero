import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateSuperHeroDTO } from '@/modules/superhero/dtos/CreateSuperHeroDTO';
import { CreateSuperHeroService } from '@/modules/superhero/services/superHeroServices/CreateSuperHeroService';

export default class SuperHeroController {
  public async create(req: Request, res: Response) {
    const requestValidated = new CreateSuperHeroDTO(req.body);
    const addSuperHeroService = container.resolve(CreateSuperHeroService);
    const createdSuperHero = await addSuperHeroService.execute(
      requestValidated.getAll(),
    );
    return res.status(200).json(createdSuperHero);
  }
}
