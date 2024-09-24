import { Request, Response } from 'express';

import { CreateAlignmentDTO } from '@/modules/superhero/dtos/CreateAlignmentDTO';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { CreateAlignmentService } from '@/modules/superhero/services/alignmentServices/CreateAlignmentService';
import { ListAllAlignmentService } from '@/modules/superhero/services/alignmentServices/ListAllAlignmentService';
import { FindAlignmentByIdService } from '@/modules/superhero/services/alignmentServices/FindAlignmentByIdService';
import NotFound from '@/shared/errors/notFound';
import { updateAlignmentDTO } from '@/modules/superhero/dtos/UpdateAlignmentDTO';
import { UpdateAlignmentService } from '@/modules/superhero/services/alignmentServices/UpdateAlignmentService';
import { DeleteAlignmentService } from '@/modules/superhero/services/alignmentServices/DeleteAlignmentService';
export default class AlignmentController {
  public async createAlignment(req: Request, res: Response) {
    const requestValidated = new CreateAlignmentDTO(req.body);
    const addAlignmentService = container.resolve(CreateAlignmentService);
    const createdAlignment = await addAlignmentService.execute(
      requestValidated.getAll(),
    );

    return res.status(201).json(createdAlignment);
  }
  public async listAll(req: Request, res: Response) {
    const listAllAlignmentService = container.resolve(ListAllAlignmentService);
    const alignment = await listAllAlignmentService.execute();
    return res.status(200).json(alignment);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findAlignmentByIdService = container.resolve(
      FindAlignmentByIdService,
    );
    const alignment = await findAlignmentByIdService.execute(id);
    if (!alignment) {
      throw new NotFound('Alignment not found!');
    }
    return res.status(200).json(alignment);
  }
  public async updateAlignment(req: Request, res: Response) {
    const requestValidated = new updateAlignmentDTO({
      id: req.params.id,
      ...req.body,
    });

    const updateAlignmentService = container.resolve(UpdateAlignmentService);

    const alignment = await updateAlignmentService.execute(
      requestValidated.getAll(),
    );
    return res.json(alignment);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteAlignmentService = container.resolve(DeleteAlignmentService);

    await deleteAlignmentService.execute(id);
    return res.status(200).json({ message: 'Alignment excluido com sucesso' });
  }
}
