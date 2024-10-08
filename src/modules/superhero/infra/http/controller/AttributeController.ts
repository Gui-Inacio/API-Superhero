import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateAttributeDTO } from '@/modules/superhero/dtos/CreateAttributeDTO';
import { CreateAttributeService } from '@/modules/superhero/services/attributeServices/CreateAttributeService';
import { ListAllAttributeService } from '@/modules/superhero/services/attributeServices/ListAllAttributesService';
import { FindAttributeByIdService } from '@/modules/superhero/services/attributeServices/FindAttributeByIdService';
import NotFound from '@/shared/errors/notFound';
import { UpdateAttributeDTO } from '@/modules/superhero/dtos/UpdateAttributeDTO';
import { UpdateAttributeService } from '@/modules/superhero/services/attributeServices/UpdateAttributeService';
import { DeleteAttributeService } from '@/modules/superhero/services/attributeServices/DeleteAttributeService';
export default class AttributeController {
  public async createAttribute(req: Request, res: Response) {
    const requestValidated = new CreateAttributeDTO(req.body);
    const addAttributeService = container.resolve(CreateAttributeService);
    const createdAttribute = await addAttributeService.execute(
      requestValidated.getAll(),
    );
    return res.status(200).json(createdAttribute);
  }
  public async listAll(req: Request, res: Response) {
    const listAllAttributeService = container.resolve(ListAllAttributeService);
    const attribute = await listAllAttributeService.execute();
    return res.status(200).json(attribute);
  }
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findAttributeByIdService = container.resolve(
      FindAttributeByIdService,
    );
    const attribute = await findAttributeByIdService.execute(id);
    if (!attribute) {
      throw new NotFound('Attribute not found!');
    }
    return res.status(200).json(attribute);
  }
  public async updateAttribute(req: Request, res: Response) {
    const requestValidated = new UpdateAttributeDTO({
      id: req.params.id,
      ...req.body,
    });

    const updateAttributeService = container.resolve(UpdateAttributeService);
    const attribute = await updateAttributeService.execute(
      requestValidated.getAll(),
    );

    return res.json(attribute);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteAttributeService = container.resolve(DeleteAttributeService);

    await deleteAttributeService.execute(id);
    return res.status(200).json({ message: 'Attribute excluido com sucesso' });
  }
}
