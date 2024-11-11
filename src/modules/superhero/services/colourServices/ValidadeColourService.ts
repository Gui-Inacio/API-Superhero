import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class ValidateColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute(eyeColour: string, hairColour: string, skinColour: string) {
    const colourIds = [eyeColour, hairColour, skinColour];

    const foundColours = await this.colourRepository.findByIds(colourIds);
    if (foundColours.length !== colourIds.length) {
      throw new NotFound('One or more colours are invalid or do not exist.');
    }
    return true;
  }
}
