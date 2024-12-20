import { Request, Response } from 'express';

import { CreateHeroAttributeDTO } from '@/modules/superhero/dtos/CreateHeroAttributeDTO';
import { CreateHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/CreateHeroAttributeService';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { ListAllHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/ListAllHeroAttributeService';
import { FindHeroAttributeByIdService } from '@/modules/superhero/services/heroAttributeServices/FindHeroAttributeByIdService';
import NotFound from '@/shared/errors/notFound';
import { DeleteHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/DeleteHeroAttributeService';
import { UpdateHeroAttributeDTO } from '@/modules/superhero/dtos/UpdateHeroAttributeDTO';
import { UpdateHeroAttributeService } from '@/modules/superhero/services/heroAttributeServices/UpdateHeroAttributeService';

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
  public async findByID(req: Request, res: Response) {
    const { id } = req.params;
    const findHeroAttributesByIdService = container.resolve(
      FindHeroAttributeByIdService,
    );
    const heroAttribute = await findHeroAttributesByIdService.execute(id);
    if (!heroAttribute) {
      throw new NotFound('HeroAttribute not found!');
    }
    return res.status(200).json(heroAttribute);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteHeroAttributeService = container.resolve(
      DeleteHeroAttributeService,
    );
    await deleteHeroAttributeService.execute(id);
    return res
      .status(200)
      .json({ message: 'HeroAttribute excluido com sucesso' });
  }
  public async updateHeroAttribute(req: Request, res: Response) {
    const requestValidated = new UpdateHeroAttributeDTO({
      id: req.params.id,
      ...req.body,
    });

    const updateHeroAttributeService = container.resolve(
      UpdateHeroAttributeService,
    );
    const heroAttribute = await updateHeroAttributeService.execute(
      requestValidated.getAll(),
    );

    return res.json(heroAttribute);
  }
}
