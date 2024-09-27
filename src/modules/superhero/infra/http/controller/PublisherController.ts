import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreatePublisherDTO } from '@/modules/superhero/dtos/CreatePublisherDTO';
import { CreatePublisherService } from '@/modules/superhero/services/publisherServices/CreatePublisherService';
import { FindPublisherByIdService } from '@/modules/superhero/services/publisherServices/FindPublisherByIdService';
import NotFound from '@/shared/errors/notFound';
import { ListAllPublisherService } from '@/modules/superhero/services/publisherServices/ListAllPublisherService';
import { UpdatePublisherDTO } from '@/modules/superhero/dtos/UpdatePublisherDTO';
import { UpdatePublisherService } from '@/modules/superhero/services/publisherServices/UpdatePublisherService';
import DeletePublisherService from '@/modules/superhero/services/publisherServices/DeletePublisherService';

export default class PublisherController {
  public async createPublisher(req: Request, res: Response) {
    const requestValidated = new CreatePublisherDTO(req.body);
    const addPublisherService = container.resolve(CreatePublisherService);
    const createdPublisher = await addPublisherService.execute(
      requestValidated.getAll(),
    );
    return res.status(201).json(createdPublisher);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findPublisherByIdService = container.resolve(
      FindPublisherByIdService,
    );
    const publisher = await findPublisherByIdService.execute(id);
    if (!publisher) {
      throw new NotFound('Publisher not found!');
    }
    return res.status(200).json(publisher);
  }
  public async listAll(req: Request, res: Response) {
    const listAllPublisherService = container.resolve(ListAllPublisherService);
    const publisher = await listAllPublisherService.execute();
    return res.status(200).json(publisher);
  }
  public async update(req: Request, res: Response) {
    const requestValidated = new UpdatePublisherDTO({
      id: req.params.id,
      ...req.body,
    });
    const updatePublisherService = container.resolve(UpdatePublisherService);
    const publisher = await updatePublisherService.execute(
      requestValidated.getAll(),
    );
    return res.json(publisher);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteService = container.resolve(DeletePublisherService);
    await deleteService.execute(id);

    return res.status(200).json({ message: 'Publisher excluido com sucesso!' });
  }
}
