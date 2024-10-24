import { inject, injectable } from 'tsyringe';

import { ISuperPowerRepository } from '../../repositories/ISuperPowerRepository';

import NotFound from '@/shared/errors/notFound';

@injectable()
export class FindSuperPowerByIdService {
  constructor(
    @inject('SuperPowerRepository')
    private readonly superPowerRepository: ISuperPowerRepository,
  ) {}

  async execute(id: string) {
    const superpower = await this.superPowerRepository.findById(id);
    if (!superpower) {
      throw new NotFound('SuperPower not found');
    }
    return superpower;
  }
}
