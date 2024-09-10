import { Request, Response } from 'express';

import { CreateGenderService } from '@/modules/superhero/services/genderServices/CreateGenderService';
import { CreateGenderDTO } from '@/modules/superhero/dtos/CreateGenderDTO';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import NotFound from '@/shared/errors/notFound';
import { ListAllGenderService } from '@/modules/superhero/services/genderServices/ListAllGenderService';
import DeleteGenderService from '@/modules/superhero/services/genderServices/DeleteGenderService';
import { UpdateGenderDTO } from '@/modules/superhero/dtos/UpdateGenderDTO';
import { UpdateGenderService } from '@/modules/superhero/services/genderServices/UpdateGenderService';
import { FindGenderByIdService } from '@/modules/superhero/services/genderServices/FindGenderByIdService';
//import BadRequest from '@/shared/errors/badRequest';

export default class GenderController {
  public async createGender(req: Request, res: Response) {
    const requestValidated = new CreateGenderDTO(req.body);
    const addGenderService = container.resolve(CreateGenderService);
    const createdGender = await addGenderService.execute(
      requestValidated.getAll(),
    );

    return res.status(201).json(createdGender);
  }
  public async listAll(req: Request, res: Response) {
    const listAllGenderService = container.resolve(ListAllGenderService);
    const gender = await listAllGenderService.execute();
    return res.status(200).json(gender);
  }
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findGenderByIdService = container.resolve(FindGenderByIdService);
    try {
      const gender = await findGenderByIdService.execute(id);
      return res.status(200).json(gender);
    } catch (error) {
      if (error instanceof NotFound) {
        throw new NotFound('Genero não encontrado!');
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async updateGender(request: Request, response: Response) {
    const requestValidated = new UpdateGenderDTO({
      id: request.params.id,
      ...request.body,
    });

    const updateGenderService = container.resolve(UpdateGenderService);

    const gender = await updateGenderService.execute(requestValidated.getAll());

    return response.json(gender);
  }
  async delete(request: Request, response: Response) {
    // Validando a solicitação
    const id = request.params.id;
    const deleteGenderService = container.resolve(DeleteGenderService);

    // Executando o serviço de exclusão
    await deleteGenderService.execute(id);

    // Retornando uma resposta de sucesso
    return response
      .status(200)
      .json({ mensage: 'Genero excluido com sucesso' });
  }
}
