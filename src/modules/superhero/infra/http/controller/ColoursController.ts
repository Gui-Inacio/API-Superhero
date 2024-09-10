import { Request, Response } from 'express';

import { CreateColourService } from '@/modules/superhero/services/colourServices/CreateColourService';
import { CreateColourDTO } from '@/modules/superhero/dtos/CreateColourDTO';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import { ListAllColourService } from '@/modules/superhero/services/colourServices/ListAllColourService';
import NotFound from '@/shared/errors/notFound';
import DeleteColourService from '@/modules/superhero/services/colourServices/DeleteColourService';
import { FindColourByIdService } from '@/modules/superhero/services/colourServices/FindColourByIdService';
import { UpdateColourDTO } from '@/modules/superhero/dtos/UpdateColourDTO';
//import BadRequest from '@/shared/errors/badRequest';
import { UpdateColourService } from '@/modules/superhero/services/colourServices/UpdateColourService';

export default class ColourController {
  public async createColour(req: Request, res: Response) {
    const requestValidated = new CreateColourDTO(req.body);
    const addColourService = container.resolve(CreateColourService);
    const createdColour = await addColourService.execute(
      requestValidated.getAll(),
    );

    return res.status(201).json(createdColour);
  }
  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllColourService = container.resolve(ListAllColourService);

    try {
      const colour = await listAllColourService.execute();
      return res.status(200).json(colour);
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findColourByIdService = container.resolve(FindColourByIdService);

    try {
      const colour = await findColourByIdService.execute(id);
      return res.status(200).json(colour);
    } catch (error) {
      if (error instanceof NotFound) {
        throw new NotFound('Cor não encontrada!');
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async updateColour(request: Request, response: Response) {
    const requestValidated = new UpdateColourDTO({
      id: request.params.id,
      ...request.body,
    });

    const updateColourService = container.resolve(UpdateColourService);

    const colour = await updateColourService.execute(requestValidated.getAll());

    return response.json(colour);
  }
  async delete(request: Request, response: Response) {
    // Validando a solicitação
    const id = request.params.id;
    const deleteColourService = container.resolve(DeleteColourService);

    // Executando o serviço de exclusão
    await deleteColourService.execute(id);

    // Retornando uma resposta de sucesso
    return response.status(200).json({ mensage: 'Cor excluida com sucesso' });
  }
}
