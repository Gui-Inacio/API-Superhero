/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

@injectable()
export class DeleteColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const colour = await this.colourRepository.findById(id);

    if (!colour) {
      throw new Error('Colour not found');
    }

    await this.colourRepository.delete(id);
  }
}
