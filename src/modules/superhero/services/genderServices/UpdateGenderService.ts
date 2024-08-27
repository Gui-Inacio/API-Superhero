import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';
import { UpdateGender } from '../../dtos/UpdateGenderDTO';

import { FindGenderByIdService } from './FindGenderByIdService';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class UpdateGenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
    private readonly findByIdGenderService: FindGenderByIdService,
  ) {}

  async execute(data: UpdateGender) {
    const gender = await this.findByIdGenderService.execute(data.id);
    if (!gender) {
      throw new NotFound('Gender not found');
    }

    await this.genderRepository.update({
      id: gender.id,
      gender: data.gender,
    });
  }
}
