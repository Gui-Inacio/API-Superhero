import { Request, Response } from 'express';

import { CreateAlignmentDTO } from '@/modules/superhero/dtos/CreateAlignmentDTO';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { CreateAlignmentService } from '@/modules/superhero/services/alignmentServices/CreateAlignmentService';
import { ListAllAlignmentService } from '@/modules/superhero/services/alignmentServices/ListAllAlignmentService';
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
}
