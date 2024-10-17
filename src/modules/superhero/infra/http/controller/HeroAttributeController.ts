import { Request, Response } from 'express';

import { CreateHeroAttributeDTO } from '@/modules/superhero/dtos/CreateHeroAttributeDTO';
import { CreateHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/CreateHeroAttributeService';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { ListAllHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/ListAllHeroAttributeService';

export default class HeroAttributeController {
  public async createHeroAttribute(req: Request, res: Response) {
    const requestValidated = new CreateHeroAttributeDTO(req.body);
    const addHeroAttributeService = container.resolve(
      CreateHeroAttributeService,
    );
    const createdHeroAttribute = await addHeroAttributeService.execute(
      requestValidated.getAll(),
    );
    return res.status(201).json(createdHeroAttribute);
  }
  public async listAll(req: Request, res: Response) {
    const listAllHeroAttributeService = container.resolve(
      ListAllHeroAttributeService,
    );
    const heroAttribute = await listAllHeroAttributeService.execute();
    return res.status(200).json(heroAttribute);
  }
}
