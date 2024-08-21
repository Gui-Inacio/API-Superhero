/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class ListAllColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute() {
    const colour = await this.colourRepository.listAll();

    if (!colour) {
      throw new Conflict('No colours registered yet!');
    }

    return colour;
  }
}
