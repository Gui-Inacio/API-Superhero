import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';
import { UpdateGender } from '../../dtos/UpdateGenderDTO';

import { FindGenderByIdService } from './FindGenderByIdService';

@injectable()
export class UpdateGenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
    private readonly findByIdGenderService: FindGenderByIdService,
  ) {}

  async execute(data: UpdateGender) {
    const gender = await this.findByIdGenderService.execute(data.id);

    await this.genderRepository.update({
      id: gender.id,
      gender: data.gender,
    });
    return await this.genderRepository.findById(gender.id);
  }
}
