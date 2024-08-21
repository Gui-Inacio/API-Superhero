/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class FindColourByIdService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute(id: string) {
    const colour = await this.colourRepository.findById(id);

    if (!colour) {
      throw new Conflict('Colour not found!.');
    }

    return colour;
  }
}
