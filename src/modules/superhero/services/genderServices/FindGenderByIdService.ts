import { inject, injectable } from 'tsyringe';

import { IGenderRepository } from '../../repositories/IGenderRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindGenderByIdService {
  constructor(
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
  ) {}
  async execute(id: string) {
    const gender = await this.genderRepository.findById(id);
    if (!gender) {
      throw new NotFound('Gender not found');
    }
    return gender;
  }
}
