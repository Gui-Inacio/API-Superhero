/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';

@injectable()
class DeleteGenderService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const gender = await this.genderRepository.findById(id);

    if (!gender) {
      throw new Error('Gender not found');
    }

    await this.genderRepository.delete(id);
  }
}

export default DeleteGenderService;
