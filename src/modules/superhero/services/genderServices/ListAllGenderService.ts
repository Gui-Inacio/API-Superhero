/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';

import Conflict from '@/shared/errors/conflict';

@injectable()
export class ListAllGenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async execute() {
    const gender = await this.genderRepository.listAll();

    if (!gender) {
      throw new Conflict('No genders registered yet!');
    }

    return gender;
  }
}
