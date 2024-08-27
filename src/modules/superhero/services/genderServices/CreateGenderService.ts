/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';
import { CreateGender } from '../../dtos/CreateGenderDTO';

@injectable()
export class CreateGenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async execute(data: CreateGender) {
    return await this.genderRepository.create(data);
  }
}
