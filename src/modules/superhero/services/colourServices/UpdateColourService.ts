import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';
import { UpdateColour } from '../../dtos/UpdateColourDTO';

import { FindColourByIdService } from './FindColourByIdService';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class UpdateColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
    private readonly findByIdColourService: FindColourByIdService,
  ) {}

  async execute(data: UpdateColour) {
    const colour = await this.findByIdColourService.execute(data.id);
    if (!colour) {
      throw new NotFound('Colour not found');
    }

    await this.colourRepository.update({
      id: colour.id,
      colour: data.colour,
    });
    return await this.colourRepository.findById(colour.id);
  }
}
