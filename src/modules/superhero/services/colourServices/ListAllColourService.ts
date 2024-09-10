/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IColourRepository } from '../../repositories/IColourRepository';

@injectable()
export class ListAllColourService {
  constructor(
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
  ) {}

  async execute() {
    return await this.colourRepository.listAll();
  }
}
