import { Request, Response } from 'express';

import { CreateGenderService } from '@/modules/superhero/services/genderServices/CreateGenderService';
import { CreateGenderDTO } from '@/modules/superhero/dtos/CreateGenderDTO';
import { container } from '@/shared/container/providers/transaction-menager/ContainerResolveTransaction';
import NotFound from '@/shared/errors/notFound';
import { ListAllGenderService } from '@/modules/superhero/services/genderServices/ListAllGenderService';
import { UpdateGenderDTO } from '@/modules/superhero/dtos/UpdateGenderDTO';
import { UpdateGenderService } from '@/modules/superhero/services/genderServices/UpdateGenderService';
import { FindGenderByIdService } from '@/modules/superhero/services/genderServices/FindGenderByIdService';
import { DeleteGenderService } from '@/modules/superhero/services/genderServices/DeleteGenderService';

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

    const gender = await findGenderByIdService.execute(id);
    if (!gender) {
      throw new NotFound('Gender not found!');
    }
    return res.status(200).json(gender);
  }
  public async updateGender(request: Request, response: Response) {
    const requestValidated = new UpdateGenderDTO({
      id: request.params.id,
      ...request.body,
    });

    const updateGenderService = container.resolve(UpdateGenderService);

    const gender = await updateGenderService.execute(requestValidated.getAll());

    return response.json(gender);
  }
  public async delete(request: Request, response: Response) {
    // Validando a solicitação
    const id = request.params.id;
    const deleteGenderService = container.resolve(DeleteGenderService);

    // Executando o serviço de exclusão
    await deleteGenderService.execute(id);

    // Retornando uma resposta de sucesso
    return response
      .status(200)
      .json({ message: 'Genero excluido com sucesso' });
  }
}
