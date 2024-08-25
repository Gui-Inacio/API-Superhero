/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindColourByIdService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute(id: string) {
    const colour = await this.colourRepository.findById(id);

    if (!colour) {
      throw new NotFound('Colour not found!.');
    }

    return colour;
  }
}
